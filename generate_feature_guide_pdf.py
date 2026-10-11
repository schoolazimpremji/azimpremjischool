import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable, Image as RLImage
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas

# ----------------------------------------------------------------------
# Numbered Canvas for Two-Pass Page Numbering ("Page X of Y")
# ----------------------------------------------------------------------
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            # Skip running headers and footers on cover page
            return

        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))

        # Running Header
        self.drawString(40, A4[1] - 28, "Azim Premji School Campus Biodiversity Portal — Comprehensive System & Feature Guide")
        self.drawRightString(A4[0] - 40, A4[1] - 28, "Document Version 2.0 • Living Field Guide")
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.75)
        self.line(40, A4[1] - 32, A4[0] - 40, A4[1] - 32)

        # Running Footer
        self.line(40, 36, A4[0] - 40, 36)
        self.drawString(40, 24, "Azim Premji School • Campus Flora & Fauna Natural Heritage System")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(A4[0] - 40, 24, page_text)
        self.restoreState()

# ----------------------------------------------------------------------
# Helper to create styled callout boxes
# ----------------------------------------------------------------------
def make_callout(text, width, bg_color=colors.HexColor("#E8F5E9"), border_color=colors.HexColor("#2D6A4F"), title=None):
    base_styles = getSampleStyleSheet()
    callout_text = ParagraphStyle(
        'CalloutText',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#1E293B")
    )
    flowables = []
    if title:
        c_title = ParagraphStyle('CTitle', parent=callout_text, fontName='Helvetica-Bold', fontSize=9, leading=12.5, textColor=border_color)
        flowables.append(Paragraph(f"<b>{title}</b>", c_title))
        flowables.append(Spacer(1, 3))
    flowables.append(Paragraph(text, callout_text))
    t = Table([[flowables]], colWidths=[width])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_color),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('PADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    return t

# ----------------------------------------------------------------------
# Main Generator
# ----------------------------------------------------------------------
def generate_pdf(output_filename="Azim_Premji_School_Biodiversity_Portal_Feature_Guide.pdf"):
    margin = 36  # 0.5 in margins
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=A4,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=42,
        bottomMargin=42
    )

    content_width = A4[0] - (2 * margin) # 523.27 pt

    # Color Palette
    c_primary = colors.HexColor("#1B4332")      # Forest Deep Green
    c_secondary = colors.HexColor("#2D6A4F")    # Vibrant Emerald
    c_accent = colors.HexColor("#B45309")       # Rich Ochre / Amber
    c_mint = colors.HexColor("#E8F5E9")         # Soft Green Background
    c_amber_light = colors.HexColor("#FEF3C7")  # Amber Warning Callout
    c_dark = colors.HexColor("#0F172A")         # Dark Slate
    c_text = colors.HexColor("#334155")         # Body Charcoal
    c_muted = colors.HexColor("#64748B")        # Slate Muted
    c_border = colors.HexColor("#CBD5E1")       # Border Line
    c_light_bg = colors.HexColor("#F8FAFC")     # Card Shading
    c_header_bg = colors.HexColor("#1B4332")

    # Typography
    base_styles = getSampleStyleSheet()

    cover_tag = ParagraphStyle(
        'CoverTag',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=c_accent
    )

    cover_title = ParagraphStyle(
        'CoverTitle',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=29,
        textColor=c_primary
    )

    cover_subtitle = ParagraphStyle(
        'CoverSubtitle',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=c_secondary
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=c_primary,
        spaceBefore=8,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=c_secondary,
        spaceBefore=7,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=12.6,
        textColor=c_text,
        alignment=TA_JUSTIFY,
        spaceAfter=5
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.2,
        textColor=c_text,
        leftIndent=12,
        spaceAfter=3
    )

    table_cell = ParagraphStyle(
        'TableCell',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=c_dark
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=table_cell,
        fontName='Helvetica-Bold'
    )

    table_header = ParagraphStyle(
        'TableHeader',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=colors.white
    )

    caption_style = ParagraphStyle(
        'CaptionStyle',
        parent=base_styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=7.5,
        leading=9.5,
        textColor=c_muted,
        alignment=TA_CENTER
    )

    story = []

    # ==================================================================
    # PAGE 1: COVER & EXECUTIVE INTRODUCTION
    # ==================================================================
    story.append(Spacer(1, 12))
    story.append(Paragraph("AZIM PREMJI SCHOOL • CAMPUS BIODIVERSITY INITIATIVE", cover_tag))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Campus Flora &amp; Fauna Portal", cover_title))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Comprehensive System Architecture, Pedagogical Framework &amp; Complete Feature Guide", cover_subtitle))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=2.5, color=c_primary, spaceBefore=2, spaceAfter=10))

    intro_text = (
        "<b>Welcome to the Azim Premji School Campus Biodiversity Portal.</b> This document is designed for "
        "stakeholders, school evaluators, educators, and community members who have <b>no prior context</b> "
        "of this platform.<br/><br/>"
        "The portal is an interactive, public digital natural history registry and field guide documenting the "
        "living heritage of the school campus. It establishes equal, first-class parity between botanical "
        "<b>Flora</b> (trees, shrubs, herbs, climbers, palms, ferns, and succulents) and zoological <b>Fauna</b> "
        "(resident birds, mammals, butterflies, reptiles, amphibians, and beneficial insects). "
        "Beyond a field guide, it connects student inquiry with faculty curation through a secure <b>Curator &amp; "
        "Administrator Management Portal</b> backed by Supabase cloud database, authentication, and image storage."
    )
    story.append(make_callout(intro_text, content_width, bg_color=c_mint, border_color=c_secondary, title="EXECUTIVE SYSTEM INTRODUCTION"))
    story.append(Spacer(1, 10))

    # Meta Table
    meta_rows = [
        [
            Paragraph("<b>Document Purpose:</b>", table_cell_bold),
            Paragraph("End-to-end feature specification, architecture overview, and user guide.", table_cell),
            Paragraph("<b>Target Audience:</b>", table_cell_bold),
            Paragraph("School Leadership, Evaluators, Parents, Naturalists", table_cell),
        ],
        [
            Paragraph("<b>Technology Stack:</b>", table_cell_bold),
            Paragraph("Next.js 14 App Router, TypeScript, Supabase PostgreSQL, Storage, RLS", table_cell),
            Paragraph("<b>Deployment Host:</b>", table_cell_bold),
            Paragraph("Vercel Edge Cloud + Supabase Managed DB", table_cell),
        ],
        [
            Paragraph("<b>Release Version:</b>", table_cell_bold),
            Paragraph("v2.0 (Dual Parity Flora &amp; Fauna Release)", table_cell),
            Paragraph("<b>Verification Status:</b>", table_cell_bold),
            Paragraph("<font color='#1B4332'><b>100% Operational (All 15 Routes Verified)</b></font>", table_cell),
        ],
    ]
    t_meta = Table(meta_rows, colWidths=[95, 170, 95, 163])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_light_bg),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 10))

    story.append(Paragraph("System Navigation Gateways at a Glance", h2_style))
    gateways_data = [
        [
            Paragraph("<b>Gateway Route</b>", table_header),
            Paragraph("<b>Primary Audience</b>", table_header),
            Paragraph("<b>Core Capability &amp; Scope</b>", table_header),
            Paragraph("<b>Health</b>", table_header),
        ],
        [
            Paragraph("<b>/ (Home)</b>", table_cell_bold),
            Paragraph("Public / Students", table_cell),
            Paragraph("Dual-portal gateway, featured flora &amp; fauna showcases, methodology pillars.", table_cell),
            Paragraph("<font color='#1B4332'><b>Active</b></font>", table_cell),
        ],
        [
            Paragraph("<b>/explore &amp; /flora</b>", table_cell_bold),
            Paragraph("Public / Botanists", table_cell),
            Paragraph("Botanical directory: 10+ growth habit filters, vernacular search, comprehensive plant dossiers.", table_cell),
            Paragraph("<font color='#1B4332'><b>Active</b></font>", table_cell),
        ],
        [
            Paragraph("<b>/fauna</b>", table_cell_bold),
            Paragraph("Public / Naturalists", table_cell),
            Paragraph("Wildlife field guide: 8 taxonomic groups, activity patterns, campus wildlife dossiers.", table_cell),
            Paragraph("<font color='#1B4332'><b>Active</b></font>", table_cell),
        ],
        [
            Paragraph("<b>/about</b>", table_cell_bold),
            Paragraph("All Visitors", table_cell),
            Paragraph("4-Stage verification protocol, plant-animal interdependence, observational safety charter.", table_cell),
            Paragraph("<font color='#1B4332'><b>Active</b></font>", table_cell),
        ],
        [
            Paragraph("<b>/admin</b>", table_cell_bold),
            Paragraph("Curator / Staff", table_cell),
            Paragraph("Secure dashboard with real-time Flora/Fauna KPIs, publication pipeline feeds.", table_cell),
            Paragraph("<font color='#1B4332'><b>Active</b></font>", table_cell),
        ],
        [
            Paragraph("<b>/admin/plants</b>", table_cell_bold),
            Paragraph("Curator / Admin", table_cell),
            Paragraph("Botanical record management: creation wizard, editing, multi-photo storage, citations.", table_cell),
            Paragraph("<font color='#1B4332'><b>Active</b></font>", table_cell),
        ],
        [
            Paragraph("<b>/admin/fauna</b>", table_cell_bold),
            Paragraph("Curator / Admin", table_cell),
            Paragraph("Wildlife record management: biological data inputs, photo sync, ethics verification.", table_cell),
            Paragraph("<font color='#1B4332'><b>Active</b></font>", table_cell),
        ],
    ]
    t_gateways = Table(gateways_data, colWidths=[90, 85, 290, 58])
    t_gateways.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_header_bg),
        ('BOX', (0,0), (-1,-1), 1, c_header_bg),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_gateways)

    story.append(PageBreak())

    # ==================================================================
    # PAGE 2: HOME PORTAL & FLORA DIRECTORY
    # ==================================================================
    story.append(Paragraph("1. Dual Biodiversity Portal (Home Page — /)", h1_style))
    story.append(Paragraph(
        "The homepage anchors the visitor experience with an elegant, natural-journal aesthetic. "
        "It communicates that the Azim Premji School campus is not merely a collection of classrooms, "
        "but a thriving ecological sanctuary where students learn through hands-on discovery.",
        body_style
    ))

    home_bullets = [
        "<b>Brand Identity &amp; Global Header:</b> Displays school insignia, quick navigation links (Home, Flora, Fauna, About, Curator Portal), and responsive mobile drawer for smartphones and tablets.",
        "<b>Hero Section &amp; Action Triggers:</b> Features the headline <i>'The Living Heritage of Our Campus: Flora &amp; Fauna'</i> with direct one-click exploration buttons.",
        "<b>Twin Gateway Portals:</b> Two prominent visual cards side-by-side: <i>Explore Campus Flora (Botanical Field Guide)</i> and <i>Explore Campus Fauna (Wildlife Field Guide)</i>, highlighting live specimen counts.",
        "<b>Live Specimen Carousels:</b> Synchronous spotlights showing signature trees (Neem, Gulmohar) and resident creatures (Red-vented Bulbul, Palm Squirrel) with scientific binomials and verification badges.",
        "<b>Educational Inquiry Pillars:</b> Highlights the three core tenets: (1) Hands-On Field Observation, (2) Scientific Rigour &amp; Taxonomy, and (3) Compassionate Campus Conservation.",
        "<b>Global Naturalist Footer:</b> Fast links to specific categories (e.g. Birds, Butterflies, Trees) and explicit reminders on ethical observational codes."
    ]
    for b in home_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))

    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=c_border, spaceBefore=4, spaceAfter=6))

    story.append(Paragraph("2. Campus Flora Directory &amp; Field Guide (/explore &amp; /flora)", h1_style))
    story.append(Paragraph(
        "The Flora directory functions as a digital herbarium cataloging every verified botanical specimen. "
        "It allows students and researchers to quickly locate plants through multi-faceted search and filter tools.",
        body_style
    ))

    flora_bullets = [
        "<b>Botanical Growth Habit Filter Pills:</b> Filter instantly across 10+ botanical categories: <i>Trees, Shrubs, Herbs, Climbers, Creepers, Flowering Plants, Grasses, Ferns, Succulents, Palms, Aquatics</i>.",
        "<b>Vernacular &amp; Binomial Search:</b> Search query matches botanical names (<i>Delonix regia</i>), common names (Royal Poinciana), Hindi names (Gulmohar), Kannada vernaculars, or families (Fabaceae).",
        "<b>Scientific Verification Confidence Filter:</b> View specimens categorized by confidence: <i>Confirmed Specimen</i> (voucher verified), <i>Probable Identification</i>, or <i>Pending Inquiry</i>.",
        "<b>Interactive Plant Cards:</b> High-resolution photo, common name, italicized botanical binomial, family pill, campus microhabitat location, and seasonal flowering indicators."
    ]
    for fb in flora_bullets:
        story.append(Paragraph(f"• {fb}", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("Signature Campus Botanical Specimens Documented:", h2_style))

    # Flora Image Grid
    g_img = "public/images/plants/gulmohar.png"
    n_img = "public/images/plants/neem.png"
    s_img = "public/images/plants/sadabahar.png"

    img_w, img_h = 160, 110
    flora_img_cells = []
    if os.path.exists(g_img) and os.path.exists(n_img) and os.path.exists(s_img):
        flora_img_cells = [
            [
                RLImage(g_img, width=img_w, height=img_h),
                RLImage(n_img, width=img_w, height=img_h),
                RLImage(s_img, width=img_w, height=img_h),
            ],
            [
                Paragraph("<b>Gulmohar</b> (<i>Delonix regia</i>)<br/>Fabaceae • Senior Wing Courtyard", caption_style),
                Paragraph("<b>Neem</b> (<i>Azadirachta indica</i>)<br/>Meliaceae • Library Pathway Border", caption_style),
                Paragraph("<b>Sadabahar</b> (<i>Catharanthus roseus</i>)<br/>Apocynaceae • Science Block Herb Bed", caption_style),
            ]
        ]
        t_flora_img = Table(flora_img_cells, colWidths=[174, 174, 175])
        t_flora_img.setStyle(TableStyle([
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('PADDING', (0,0), (-1,-1), 2),
        ]))
        story.append(t_flora_img)

    story.append(PageBreak())

    # ==================================================================
    # PAGE 3: BOTANICAL DOSSIER ANATOMY
    # ==================================================================
    story.append(Paragraph("Botanical Specimen Dossier Breakdown (/explore/[slug])", h1_style))
    story.append(Paragraph(
        "Each plant on campus has a comprehensive, peer-reviewed profile page providing structured scientific "
        "and ethnobotanical information. Below is the detailed breakdown of every section included on each plant's page:",
        body_style
    ))

    dossier_anatomy = [
        [
            Paragraph("<b>Profile Section</b>", table_header),
            Paragraph("<b>Information Captured</b>", table_header),
            Paragraph("<b>Educational &amp; Research Value</b>", table_header),
        ],
        [
            Paragraph("<b>Taxonomic Profile</b>", table_cell_bold),
            Paragraph("Kingdom, Order, Family, Genus, Species, Botanical Authority, Common Name, Hindi &amp; Kannada vernaculars.", table_cell),
            Paragraph("Teaches Linnaean classification, binomial rules, and local cultural language connections.", table_cell),
        ],
        [
            Paragraph("<b>Morphological Traits</b>", table_cell_bold),
            Paragraph("Bark texture &amp; color, leaf arrangement (pinnate, alternate), flower morphology, fruit type, seed dispersal mechanism.", table_cell),
            Paragraph("Trains students to identify plants based on leaf venation, bark fissures, and flower structures across seasons.", table_cell),
        ],
        [
            Paragraph("<b>Phenology &amp; Seasons</b>", table_cell_bold),
            Paragraph("Flowering months, fruiting months, leaf-fall period, and seasonal growth cycles.", table_cell),
            Paragraph("Enables longitudinal phenology tracking; connects seasonal climate changes to plant reproduction.", table_cell),
        ],
        [
            Paragraph("<b>Microhabitat &amp; Mapping</b>", table_cell_bold),
            Paragraph("Specific campus zone (e.g. Courtyard, Sports Ground Hedges, Orchard), soil preference, sun/shade conditions.", table_cell),
            Paragraph("Maps campus microclimates and serves as a guide for outdoor student botany field walks.", table_cell),
        ],
        [
            Paragraph("<b>Ecological Importance</b>", table_cell_bold),
            Paragraph("Pollinators attracted (bees, sunbirds, butterflies), caterpillars hosted, bird roosting value, soil enrichment.", table_cell),
            Paragraph("Reveals how each tree anchors a mini-ecosystem supporting dozens of dependent organisms.", table_cell),
        ],
        [
            Paragraph("<b>Ethnobotany &amp; Cultural Lore</b>", table_cell_bold),
            Paragraph("Traditional Ayurvedic/Unani medicinal usages, cultural folklore, woodwork utility, sacred associations.", table_cell),
            Paragraph("Connects biological science with Indian cultural heritage and traditional knowledge systems.", table_cell),
        ],
        [
            Paragraph("<b>Safety &amp; Toxicity Warning</b>", table_cell_bold),
            Paragraph("Explicit warnings regarding toxic sap (e.g. Euphorbias), poisonous seeds, dermatitis risks, and ingestion rules.", table_cell),
            Paragraph("<b>Paramount Safety Principle:</b> Establishes strict rules prohibiting tasting wild seeds or rubbing sap.", table_cell),
        ],
        [
            Paragraph("<b>Multi-Angle Photo Archive</b>", table_cell_bold),
            Paragraph("High-resolution primary and supplementary photos (canopy, bark close-up, flower macro, fruit/seed).", table_cell),
            Paragraph("Provides clear visual voucher evidence for remote verification and study.", table_cell),
        ],
        [
            Paragraph("<b>Academic References</b>", table_cell_bold),
            Paragraph("Authoritative sources cited (Flora of British India, Kew Royal Botanic Gardens, regional botanical bulletins).", table_cell),
            Paragraph("Teaches students academic citation standards and reliance on verified literature.", table_cell),
        ],
    ]
    t_dossier = Table(dossier_anatomy, colWidths=[95, 220, 208])
    t_dossier.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_header_bg),
        ('BOX', (0,0), (-1,-1), 1, c_header_bg),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_dossier)
    story.append(Spacer(1, 10))

    bot_safety = (
        "<b>Botanical Safety Rule for Campus Explorers:</b><br/>"
        "Students are guided by the cardinal rule: <i>'Look, examine, sketch, photograph — but never ingest.'</i> "
        "The portal explicitly highlights safety warnings for any species containing milky latex, cardiac glycosides, "
        "or contact irritants. Field excursions always require teacher supervision."
    )
    story.append(make_callout(bot_safety, content_width, bg_color=c_amber_light, border_color=c_accent, title="CAMPUS BOTANICAL SAFETY ADVISORY"))

    story.append(PageBreak())

    # ==================================================================
    # PAGE 4: FAUNA DIRECTORY & WILDLIFE GUIDE
    # ==================================================================
    story.append(Paragraph("3. Campus Fauna Directory &amp; Wildlife Field Guide (/fauna)", h1_style))
    story.append(Paragraph(
        "The Fauna section brings equal status to campus wildlife. It documents resident songbirds, mammals, "
        "butterflies, reptiles, amphibians, and invertebrates observed on school grounds through rigorous student "
        "field monitoring, voucher photography, and naturalist mentorship.",
        body_style
    ))

    fauna_bullets = [
        "<b>Taxonomic Class Filter Pills:</b> Instant 1-click sorting across 8 taxonomic groupings: <i>Birds (Aves), Mammals, Butterflies &amp; Moths (Lepidoptera), Reptiles, Amphibians, Other Insects, Spiders &amp; Arachnids, Other Invertebrates</i>.",
        "<b>Universal Search Engine:</b> Search by common name (e.g. Red-vented Bulbul), scientific binomial (<i>Pycnonotus cafer</i>), family (Agamidae), or campus hotspot (Perimeter Hedge).",
        "<b>Activity Pattern Indicators:</b> Badges designate each creature as <b>Diurnal</b> (active during sunlight), <b>Nocturnal</b> (active at night), or <b>Crepuscular</b> (active at twilight/dawn).",
        "<b>Observational Code of Conduct:</b> A permanent banner reinforces the ethics of respectful wildlife watching: safe distances, zero handling, and no nest disturbance.",
        "<b>Interactive Wildlife Cards:</b> Features crisp naturalist photography, common and scientific names, dietary classifications (frugivore, insectivore, omnivore), habitat notes, and verification badges."
    ]
    for fb in fauna_bullets:
        story.append(Paragraph(f"• {fb}", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("Authentic Campus Wildlife Photography Documented in Portal:", h2_style))

    # Fauna Image Grid (4 items)
    b_img = "public/images/fauna/bulbul.jpg"
    sq_img = "public/images/fauna/squirrel.jpg"
    m_img = "public/images/fauna/common_mormon.jpg"
    l_img = "public/images/fauna/garden_lizard.jpg"

    f_w, f_h = 122, 90
    if os.path.exists(b_img) and os.path.exists(sq_img) and os.path.exists(m_img) and os.path.exists(l_img):
        fauna_img_cells = [
            [
                RLImage(b_img, width=f_w, height=f_h),
                RLImage(sq_img, width=f_w, height=f_h),
                RLImage(m_img, width=f_w, height=f_h),
                RLImage(l_img, width=f_w, height=f_h),
            ],
            [
                Paragraph("<b>Red-vented Bulbul</b><br/><i>Pycnonotus cafer</i><br/>Birds • Orchard", caption_style),
                Paragraph("<b>Three-striped Squirrel</b><br/><i>Funambulus palmarum</i><br/>Mammals • Courtyard", caption_style),
                Paragraph("<b>Common Mormon</b><br/><i>Papilio polytes</i><br/>Lepidoptera • Garden", caption_style),
                Paragraph("<b>Garden Lizard</b><br/><i>Calotes versicolor</i><br/>Reptiles • Perimeter", caption_style),
            ]
        ]
        t_fauna_img = Table(fauna_img_cells, colWidths=[130, 130, 130, 133])
        t_fauna_img.setStyle(TableStyle([
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('PADDING', (0,0), (-1,-1), 2),
        ]))
        story.append(t_fauna_img)

    story.append(Spacer(1, 6))
    story.append(Paragraph("Initial Fauna Species Baseline Data:", h2_style))

    fauna_table_rows = [
        [
            Paragraph("<b>Common / Scientific Name</b>", table_header),
            Paragraph("<b>Class &amp; Family</b>", table_header),
            Paragraph("<b>Campus Niche &amp; Foraging Habitat</b>", table_header),
            Paragraph("<b>Ecological Role &amp; Diet</b>", table_header),
        ],
        [
            Paragraph("<b>Red-vented Bulbul</b><br/><i>Pycnonotus cafer</i>", table_cell_bold),
            Paragraph("Aves<br/>Pycnonotidae", table_cell),
            Paragraph("Fruit Tree Orchard &amp; Junior Wing Lawn. Diurnal resident songbird.", table_cell),
            Paragraph("Omnivorous seed disperser; controls insect pests; sips Gulmohar nectar.", table_cell),
        ],
        [
            Paragraph("<b>Three-striped Palm Squirrel</b><br/><i>Funambulus palmarum</i>", table_cell_bold),
            Paragraph("Mammalia<br/>Sciuridae", table_cell),
            Paragraph("Main Courtyard &amp; Library Periphery canopy. Diurnal arboreal forager.", table_cell),
            Paragraph("Herbivore; buries seeds that sprout into campus trees; sentinel alarm caller.", table_cell),
        ],
        [
            Paragraph("<b>Common Mormon</b><br/><i>Papilio polytes</i>", table_cell_bold),
            Paragraph("Insecta<br/>Papilionidae", table_cell),
            Paragraph("Botanical Garden &amp; Greenhouses. Mud-puddling on moist garden soil.", table_cell),
            Paragraph("Vital flower pollinator; larvae feed on Curry Leaf &amp; Citrus bushes.", table_cell),
        ],
        [
            Paragraph("<b>Oriental Garden Lizard</b><br/><i>Calotes versicolor</i>", table_cell_bold),
            Paragraph("Reptilia<br/>Agamidae", table_cell),
            Paragraph("Perimeter Boundary Wall &amp; sports hedges. Morning sun basking.", table_cell),
            Paragraph("Insect predator (beetles, grasshoppers); shifts head color during courtship.", table_cell),
        ],
    ]
    t_fauna_data = Table(fauna_table_rows, colWidths=[110, 85, 160, 168])
    t_fauna_data.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_header_bg),
        ('BOX', (0,0), (-1,-1), 1, c_header_bg),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_fauna_data)

    story.append(PageBreak())

    # ==================================================================
    # PAGE 5: ZOOLOGICAL DOSSIER ANATOMY & INTERDEPENDENCE
    # ==================================================================
    story.append(Paragraph("Zoological Specimen Dossier Breakdown (/fauna/[slug])", h1_style))
    story.append(Paragraph(
        "Each wildlife profile provides an in-depth dossier formatted specifically for field naturalists. "
        "A standout feature of this system is that it explicitly documents <b>Plant-Animal Ecological "
        "Interdependence</b>, linking wildlife directly to campus trees.",
        body_style
    ))

    fauna_dossier_anatomy = [
        [
            Paragraph("<b>Dossier Section</b>", table_header),
            Paragraph("<b>Attributes &amp; Information Recorded</b>", table_header),
            Paragraph("<b>Educational &amp; Field Significance</b>", table_header),
        ],
        [
            Paragraph("<b>Taxonomic Hierarchy</b>", table_cell_bold),
            Paragraph("Order, Family, Genus, Species, Authority, English names, Hindi/regional names, IUCN Red List status.", table_cell),
            Paragraph("Introduces international conservation ratings (e.g. Least Concern, Vulnerable) and global taxonomy.", table_cell),
        ],
        [
            Paragraph("<b>Field Diagnostic Marks</b>", table_cell_bold),
            Paragraph("Key diagnostic visual keys: crest shape, undertail colors, plumage patterns, scale keels, sexual dimorphism.", table_cell),
            Paragraph("Teaches students how field naturalists separate species with precision using binoculars.", table_cell),
        ],
        [
            Paragraph("<b>Foraging Biology &amp; Diet</b>", table_cell_bold),
            Paragraph("Nutritional classification (frugivorous, insectivorous, granivorous), favorite food items, hunting behaviors.", table_cell),
            Paragraph("Illustrates food web dynamics and predator-prey relationships occurring right on campus.", table_cell),
        ],
        [
            Paragraph("<b>Behaviour &amp; Life Cycle</b>", table_cell_bold),
            Paragraph("Nesting architecture, territorial displays, vocalization alarms, mating seasons, clutch/litter sizes, metamorphosis.", table_cell),
            Paragraph("Tracks animal life stages from egg/kit to mature adult across annual school terms.", table_cell),
        ],
        [
            Paragraph("<b>Plant-Animal Interdependence</b>", table_cell_bold),
            Paragraph("Specific campus flora mutualisms (e.g. bulbuls pollinating Gulmohar, Common Mormon caterpillars hosting on Curry Leaf).", table_cell),
            Paragraph("<b>Core Educational Value:</b> Shows students that flora and fauna form an unbroken web of mutual survival.", table_cell),
        ],
        [
            Paragraph("<b>Campus Observation Safety Guide</b>", table_cell_bold),
            Paragraph("Prescribed observation distances (e.g. 3–5m for birds, 2–4m for squirrels), nesting guidelines, quiet protocols.", table_cell),
            Paragraph("Instills compassionate field ethics: observe without causing stress or nest abandonment.", table_cell),
        ],
        [
            Paragraph("<b>Naturalist Discovery Notes</b>", table_cell_bold),
            Paragraph("Direct notes from campus field walks: mud-puddling locations, sentinel warning calls, seasonal arrival dates.", table_cell),
            Paragraph("Encourages students to see themselves as contributing contributors to real citizen science.", table_cell),
        ],
    ]
    t_fauna_dossier = Table(fauna_dossier_anatomy, colWidths=[100, 215, 208])
    t_fauna_dossier.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_header_bg),
        ('BOX', (0,0), (-1,-1), 1, c_header_bg),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_fauna_dossier)
    story.append(Spacer(1, 10))

    fauna_ethics_box = (
        "<b>Campus Wildlife Observational Code of Conduct:</b><br/>"
        "• <b>Respect Distance:</b> Maintain a quiet viewing distance of at least 3 to 5 metres for birds and 2 to 4 metres for small mammals.<br/>"
        "• <b>Zero Physical Handling:</b> Never catch, corner, trap, or touch wild creatures on campus. Reptiles and rodents can bite when startled.<br/>"
        "• <b>Nest Protection:</b> Never touch bird nests, fledglings on the ground, or butterfly pupae. Human scent can attract feral predators.<br/>"
        "• <b>No Unnatural Feeding:</b> Never feed wildlife processed cafeteria snacks or bread; wild animals must maintain their natural foraging instincts."
    )
    story.append(make_callout(fauna_ethics_box, content_width, bg_color=colors.HexColor("#EFF6FF"), border_color=colors.HexColor("#2563EB"), title="WILDLIFE OBSERVATIONAL ETHICS CHARTER"))

    story.append(PageBreak())

    # ==================================================================
    # PAGE 6: METHODOLOGY & ABOUT PROJECT
    # ==================================================================
    story.append(Paragraph("4. Scientific Methodology &amp; Educational Ethics (/about)", h1_style))
    story.append(Paragraph(
        "The /about page articulates the pedagogical mission of the project, explaining why Flora and "
        "Fauna are documented as an interconnected whole, and outlining the verification pipeline that "
        "ensures research-grade scientific integrity.",
        body_style
    ))

    story.append(Paragraph("Why We Document Flora &amp; Fauna Together:", h2_style))
    story.append(Paragraph(
        "Plants and animals do not live in isolation. On the Azim Premji School campus, a Gulmohar tree is "
        "not just a botanical specimen; it provides nectar to Sunbirds and Bulbuls, shelter to Palm Squirrels, "
        "and canopy shade for ground lizards. Conversely, butterflies pollinate garden herbs, while frugivorous birds "
        "disperse seeds across school lawns. Documenting them in a single portal teaches students to view the campus "
        "as a living, self-sustaining ecosystem.",
        body_style
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("The 4-Stage Scientific Verification Protocol:", h2_style))

    pipeline_steps = [
        [
            Paragraph("<b>Stage 1: Student Field Observation</b>", table_cell_bold),
            Paragraph("Students observe an organism during outdoor science walks or after-school nature clubs. They record exact date/time, campus coordinates, and capture voucher photographs using classroom tablets.", table_cell),
        ],
        [
            Paragraph("<b>Stage 2: Morphological Inquiries</b>", table_cell_bold),
            Paragraph("Working in study groups, students compare their field observations with botanical keys and field guides, assigning an initial confidence level (Confirmed, Probable, or Uncertain).", table_cell),
        ],
        [
            Paragraph("<b>Stage 3: Curator Review &amp; Verification</b>", table_cell_bold),
            Paragraph("Faculty mentors and visiting botanists review the submission in the Administrator Portal, checking diagnostic characteristics against herbaria records before approving the record to 'Published' status.", table_cell),
        ],
        [
            Paragraph("<b>Stage 4: Phenology &amp; Behavioral Updates</b>", table_cell_bold),
            Paragraph("Over succeeding seasons, student cohorts update the record with new phenological observations: first bloom, fruit drop, arrival of migratory birds, and caterpillar emergence cycles.", table_cell),
        ],
    ]
    t_pipeline = Table(pipeline_steps, colWidths=[150, 373])
    t_pipeline.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,-1), c_mint),
        ('BOX', (0,0), (-1,-1), 1, c_secondary),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_pipeline)

    story.append(Spacer(1, 10))
    story.append(Paragraph("Curriculum &amp; Classroom Alignment:", h2_style))
    curr_bullets = [
        "<b>Middle School Science (Grades 6–8):</b> Linnaean taxonomy, leaf morphology, flower anatomy, animal classification, and food web interconnectedness.",
        "<b>High School Environmental Studies (Grades 9–10):</b> Ecosystem services, urban biodiversity conservation, phenology as an indicator of climate change, and habitat loss.",
        "<b>Visual Arts &amp; Botanical Illustration:</b> Field sketching, scientific illustration, and nature photography emphasizing diagnostic angles and scale."
    ]
    for cb in curr_bullets:
        story.append(Paragraph(f"• {cb}", bullet_style))

    story.append(PageBreak())

    # ==================================================================
    # PAGE 7: CURATOR & ADMIN PORTAL
    # ==================================================================
    story.append(Paragraph("5. Curator &amp; Administrator Management Portal (/admin)", h1_style))
    story.append(Paragraph(
        "The administrative back-office gives teachers and scientific curators complete control over "
        "the portal's database. It is protected by Supabase authentication and strict Row-Level Security, "
        "ensuring that only authorized staff can add, edit, or publish records.",
        body_style
    ))

    admin_tools = [
        "<b>Role-Based Authentication (/login):</b> Secure sign-in verifying curators against an explicit admin_users table via PostgreSQL Security Definer helper functions. Unauthorized users are barred from making edits.",
        "<b>Executive KPI Analytics Dashboard (/admin):</b> Real-time statistics tracking: Total Documented Flora, Total Documented Fauna, Published Records, and Items Pending Review.",
        "<b>Botanical Inventory Manager (/admin/plants):</b> Searchable table of all plant records with quick status toggles, category filtering, and direct links to Edit or Archive.",
        "<b>Botanical Creation &amp; Edit Wizard (/admin/plants/new &amp; .../edit):</b> Comprehensive forms covering all biological parameters, multi-photo uploads to Supabase Storage, and literature references.",
        "<b>Wildlife Inventory Manager (/admin/fauna):</b> Management suite for campus animal records with filter by taxonomic group, verification status, and quick deletion protection.",
        "<b>Fauna Creation &amp; Edit Wizard (/admin/fauna/new &amp; .../edit):</b> Guided form capturing animal morphology, diurnal/nocturnal habits, plant mutualisms, observation distances, and multiple photographic vouchers.",
        "<b>Supabase Storage Multi-Bucket Pipeline:</b> Uploaded images are stored in public cloud buckets (plant-photos and fauna-photos) with automated URL linking and storage RLS protection."
    ]
    for at in admin_tools:
        story.append(Paragraph(f"• {at}", bullet_style))

    story.append(Spacer(1, 8))
    story.append(Paragraph("Administrative Permission &amp; Security Matrix:", h2_style))

    perm_data = [
        [
            Paragraph("<b>Operation</b>", table_header),
            Paragraph("<b>Public / Student Visitor</b>", table_header),
            Paragraph("<b>Authenticated Curator / Admin</b>", table_header),
        ],
        [
            Paragraph("<b>View Published Flora &amp; Fauna</b>", table_cell_bold),
            Paragraph("<font color='#1B4332'><b>Allowed (Full Access)</b></font>", table_cell),
            Paragraph("<font color='#1B4332'><b>Allowed (Full Access)</b></font>", table_cell),
        ],
        [
            Paragraph("<b>View Draft / Under Review Records</b>", table_cell_bold),
            Paragraph("<font color='#DC2626'><b>Blocked by RLS</b></font>", table_cell),
            Paragraph("<font color='#1B4332'><b>Allowed (Admin View)</b></font>", table_cell),
        ],
        [
            Paragraph("<b>Create New Species Records</b>", table_cell_bold),
            Paragraph("<font color='#DC2626'><b>Blocked (No Access)</b></font>", table_cell),
            Paragraph("<font color='#1B4332'><b>Allowed via Form Wizard</b></font>", table_cell),
        ],
        [
            Paragraph("<b>Upload Photos to Storage</b>", table_cell_bold),
            Paragraph("<font color='#DC2626'><b>Blocked (Read Only)</b></font>", table_cell),
            Paragraph("<font color='#1B4332'><b>Allowed (plant-photos &amp; fauna-photos)</b></font>", table_cell),
        ],
        [
            Paragraph("<b>Modify / Archive / Delete Records</b>", table_cell_bold),
            Paragraph("<font color='#DC2626'><b>Blocked (Zero Mutation)</b></font>", table_cell),
            Paragraph("<font color='#1B4332'><b>Allowed (Protected by is_admin())</b></font>", table_cell),
        ],
    ]
    t_perm = Table(perm_data, colWidths=[160, 180, 183])
    t_perm.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_header_bg),
        ('BOX', (0,0), (-1,-1), 1, c_header_bg),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_perm)

    story.append(PageBreak())

    # ==================================================================
    # PAGE 8: TECHNICAL ARCHITECTURE & PRODUCTION STATUS
    # ==================================================================
    story.append(Paragraph("6. Technical Architecture &amp; Production Verification", h1_style))
    story.append(Paragraph(
        "The platform is built on modern web standards to ensure high reliability, fast page loads, "
        "and zero downtime during campus demonstrations.",
        body_style
    ))

    tech_data = [
        [
            Paragraph("<b>System Layer</b>", table_header),
            Paragraph("<b>Technology</b>", table_header),
            Paragraph("<b>Engineering Implementation Details</b>", table_header),
        ],
        [
            Paragraph("<b>Frontend Core</b>", table_cell_bold),
            Paragraph("Next.js 14 App Router, TypeScript, React Server Components", table_cell),
            Paragraph("Optimized production bundle with static page generation (SSG) and fast dynamic routes.", table_cell),
        ],
        [
            Paragraph("<b>Design &amp; Styling</b>", table_cell_bold),
            Paragraph("Vanilla CSS Design System, Custom Tokens", table_cell),
            Paragraph("Handcrafted nature journal aesthetic with responsive CSS Grid; zero Tailwind bloat.", table_cell),
        ],
        [
            Paragraph("<b>Database</b>", table_cell_bold),
            Paragraph("Supabase PostgreSQL", table_cell),
            Paragraph("Dedicated relational schemas (plants, plant_photos, fauna, fauna_photos, admin_users).", table_cell),
        ],
        [
            Paragraph("<b>Security Model</b>", table_cell_bold),
            Paragraph("Row Level Security (RLS) + Security Definer", table_cell),
            Paragraph("public.is_admin() helper validates administrative sessions at the database engine level.", table_cell),
        ],
        [
            Paragraph("<b>Storage Buckets</b>", table_cell_bold),
            Paragraph("Supabase Storage (plant-photos, fauna-photos)", table_cell),
            Paragraph("High-performance public image CDN with upload restrictions limited to authenticated staff.", table_cell),
        ],
        [
            Paragraph("<b>Resilient Data Layer</b>", table_cell_bold),
            Paragraph("Dual-Mode Repository (floraRepo.ts, faunaRepo.ts)", table_cell),
            Paragraph("Syncs with live Supabase database with local fallback so pages never crash if offline.", table_cell),
        ],
    ]
    t_tech = Table(tech_data, colWidths=[100, 150, 273])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_header_bg),
        ('BOX', (0,0), (-1,-1), 1, c_header_bg),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_tech)

    story.append(Spacer(1, 8))
    story.append(Paragraph("Automated Build &amp; Route Verification Audit:", h2_style))

    # Audit Results
    audit_data = [
        [
            Paragraph("<b>Route / Component Tested</b>", table_header),
            Paragraph("<b>HTTP Status</b>", table_header),
            Paragraph("<b>Build / Test Result</b>", table_header),
        ],
        [
            Paragraph("/ (Home Portal)", table_cell_bold),
            Paragraph("<b>200 OK</b>", table_cell),
            Paragraph("Static generation passed; dual banners and featured flora/fauna active.", table_cell),
        ],
        [
            Paragraph("/explore &amp; /flora (Botanical Directory)", table_cell_bold),
            Paragraph("<b>200 OK</b>", table_cell),
            Paragraph("Search, category pills, confidence filters functional.", table_cell),
        ],
        [
            Paragraph("/explore/[slug] (Plant Detail Page)", table_cell_bold),
            Paragraph("<b>200 OK</b>", table_cell),
            Paragraph("Verified on <i>Delonix regia</i>; taxonomy, morphology, and warning boxes rendered.", table_cell),
        ],
        [
            Paragraph("/fauna (Wildlife Directory)", table_cell_bold),
            Paragraph("<b>200 OK</b>", table_cell),
            Paragraph("Verified on 4 species; taxonomic pills, search, and activity badges functional.", table_cell),
        ],
        [
            Paragraph("/fauna/[slug] (Wildlife Detail Page)", table_cell_bold),
            Paragraph("<b>200 OK</b>", table_cell),
            Paragraph("Verified on Bulbul, Squirrel, Butterfly, Lizard; field marks and safety guide active.", table_cell),
        ],
        [
            Paragraph("/about (Methodology &amp; Safety)", table_cell_bold),
            Paragraph("<b>200 OK</b>", table_cell),
            Paragraph("Dual safety charters, verification stages, and curriculum integration active.", table_cell),
        ],
        [
            Paragraph("/admin, /admin/plants, /admin/fauna", table_cell_bold),
            Paragraph("<b>200 OK</b>", table_cell),
            Paragraph("Admin layout, KPI counters, and creation wizards compiled with 0 errors.", table_cell),
        ],
    ]
    t_audit = Table(audit_data, colWidths=[180, 75, 268])
    t_audit.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_header_bg),
        ('BOX', (0,0), (-1,-1), 1, c_header_bg),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_light_bg]),
        ('PADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_audit)

    story.append(Spacer(1, 8))
    conclusion_box = (
        "<b>Summary &amp; Sharing Guidance:</b><br/>"
        "This portal is production-ready, deployed to Vercel, and synchronized with GitHub. "
        "Anyone with no prior knowledge can immediately navigate between Flora and Fauna, discover species "
        "living on the Azim Premji School grounds, and appreciate the scientific care embedded in its curation. "
        "For administrative onboarding or SQL database execution, refer to supabase/fauna_schema.sql."
    )
    story.append(make_callout(conclusion_box, content_width, bg_color=c_mint, border_color=c_primary, title="FINAL CONCLUSION"))

    # Build
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Publication-quality PDF generated: {output_filename}")
    print(f"File size: {os.path.getsize(output_filename)} bytes")

if __name__ == "__main__":
    generate_pdf()
