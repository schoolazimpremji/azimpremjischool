import { Plant } from '@/types/plant';

export const SAMPLE_PLANTS: Plant[] = [
  {
    id: 'sample-1',
    slug: 'gulmohar-delonix-regia',
    common_name: 'Gulmohar',
    other_common_names: ['Royal Poinciana', 'Flamboyant', 'Krishnachura', 'Flame Tree'],
    scientific_name: 'Delonix regia',
    family: 'Fabaceae (Legume family)',
    category: 'tree',
    identification_characteristics: 'Bipinnate feathery fern-like foliage with vivid scarlet-orange 5-petaled flowers, one petal marked in yellow and white. Large flat woody pods up to 60 cm long.',
    identification_confidence: 'confirmed',
    native_origin: 'Madagascar (endangered in wild, widely naturalized across tropics)',
    distribution: 'Widely planted as an avenue and ornamental shade tree throughout peninsular and tropical India.',
    campus_location: 'Senior Wing Courtyard & Main Avenue Pathway',
    flowers: 'Scarlet to fiery reddish-orange flowers with ruffled petals, clustered in corymbs.',
    flowering_season: 'April – June (Peak summer)',
    fruits: 'Elongated, dark brown, woody legumes with hard seeds.',
    fruiting_season: 'July – December (hangs through winter)',
    uses: 'Prized for deep cooling shade, landscape beautification, and educational botanical study.',
    ecological_importance: 'Supports pollinating insects including carpenter bees, butterflies, and nectar-feeding birds such as sunbirds.',
    cultural_significance: 'Iconic herald of Indian summer; widely celebrated in poetry, regional literature, and school folklore.',
    traditional_medicinal_uses: 'Folk traditions note mild astringent bark decoctions; largely cultivated for ornamental landscaping.',
    safety_warnings: 'Wood is brittle and prone to breakage during high pre-monsoon winds. Pod seeds are hard and inedible.',
    interesting_facts: 'Despite being one of the world\'s most widely cultivated tropical trees, Gulmohar was nearly extinct in its native Madagascan dry deciduous forests when discovered by botanists.',
    video_links: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
    status: 'published',
    created_at: '2026-03-15T09:00:00Z',
    updated_at: '2026-04-10T11:30:00Z',
    photos: [
      {
        id: 'photo-1',
        storage_path: 'plants/gulmohar/canopy.png',
        public_url: '/images/plants/gulmohar.png',
        alt_text: 'Vibrant scarlet Gulmohar blossoms with bipinnate foliage',
        caption: 'Full bloom in the school senior courtyard during May',
        is_primary: true,
        display_order: 1
      }
    ],
    sources: [
      {
        id: 'src-1',
        title: 'Trees of Delhi: A Field Guide',
        author: 'Pradip Krishen',
        notes: 'Definitive field guide documentation for Delonix regia urban ecology.'
      },
      {
        id: 'src-2',
        title: 'Flowers of India - Delonix regia',
        url: 'https://www.flowersofindia.net/catalog/slides/Gulmohar.html',
        notes: 'Botanical descriptions, regional vernacular names, and distribution.'
      }
    ]
  },
  {
    id: 'sample-2',
    slug: 'neem-azadirachta-indica',
    common_name: 'Neem',
    other_common_names: ['Indian Lilac', 'Vepa', 'Nim', 'Margosa'],
    scientific_name: 'Azadirachta indica',
    family: 'Meliaceae (Mahogany family)',
    category: 'tree',
    identification_characteristics: 'Pinnate leaves with serrated sickle-shaped leaflets; small scented white star-like flowers; smooth olive-green drupes turning yellow.',
    identification_confidence: 'confirmed',
    native_origin: 'Indian Subcontinent & Myanmar',
    distribution: 'Thrives in dry, tropical, and sub-tropical regions throughout India.',
    campus_location: 'Herbal Garden & Science Block Perimeter',
    flowers: 'Small, fragrant, creamy white honey-scented flowers borne in axillary panicles.',
    flowering_season: 'March – May',
    fruits: 'Ellipsoid drupes, greenish when raw, ripening to translucent yellow with sweetish pulp.',
    fruiting_season: 'June – August',
    uses: 'Natural pest repellent, organic soil conditioner (neem cake), dental care (twigs/datun), timber.',
    ecological_importance: 'Keystone urban tree providing dense canopy shade, nitrogen cycling, and sustenance for bats and bulbuls that feed on the ripe fruits.',
    cultural_significance: 'Revered in Indian culture for thousands of years; associated with health, purification rituals, and festivals like Ugadi and Chaitra Navratri.',
    traditional_medicinal_uses: 'Documented extensively in Ayurveda and Siddha medicine for antibacterial, antifungal, and skin soothing properties.',
    safety_warnings: 'Neem oil should not be ingested in high concentrations by children or pregnant women.',
    interesting_facts: 'The United Nations declared Neem as the "Tree of the 21st Century" due to its versatile sustainable agricultural and medicinal benefits.',
    video_links: [],
    status: 'published',
    created_at: '2026-03-20T10:00:00Z',
    updated_at: '2026-04-12T14:15:00Z',
    photos: [
      {
        id: 'photo-3',
        storage_path: 'plants/neem/leaves.png',
        public_url: '/images/plants/neem.png',
        alt_text: 'Fresh green serrated neem leaves catching sunlight',
        caption: 'Pinnate leaves at the school herbal demonstration patch',
        is_primary: true,
        display_order: 1
      }
    ],
    sources: [
      {
        id: 'src-3',
        title: 'Ayurvedic Pharmacopoeia of India',
        author: 'Govt. of India Ministry of AYUSH',
        notes: 'Monograph on Azadirachta indica folium and cortex.'
      }
    ]
  },
  {
    id: 'sample-3',
    slug: 'periwinkle-catharanthus-roseus',
    common_name: 'Sadabahar',
    other_common_names: ['Madagascar Periwinkle', 'Rosy Periwinkle', 'Nayantara', 'Nithyakalyani'],
    scientific_name: 'Catharanthus roseus',
    family: 'Apocynaceae (Dogbane family)',
    category: 'flowering plant',
    identification_characteristics: 'Evergreen perennial herb/subshrub with glossy oval opposite leaves with pale midrib; 5-lobed salverform flowers in pink, white, or lavender.',
    identification_confidence: 'confirmed',
    native_origin: 'Madagascar',
    distribution: 'Naturalized throughout tropical and subtropical India in gardens, wastelands, and campus borders.',
    campus_location: 'Primary Wing Flower Beds & Administrative Quad',
    flowers: 'Five-petaled flat flowers with a tiny contrasting central reddish-yellow eye.',
    flowering_season: 'Year-round (Ever-blooming, peak during post-monsoon)',
    fruits: 'Pair of cylindrical slender dehiscent follicles containing tiny black seeds.',
    fruiting_season: 'Year-round',
    uses: 'Drought-tolerant ornamental border plant; vital source of pharmaceutical vinca alkaloids.',
    ecological_importance: 'Attracts long-tongued butterflies, hawk-moths, and small native solitary bees.',
    cultural_significance: 'Known colloquially as "Sadabahar" (always spring) for its resilience to harsh sun and constant blooms.',
    traditional_medicinal_uses: 'Traditionally used in folk herbalism for diabetes management; source of chemotherapeutic drugs vinblastine and vincristine.',
    safety_warnings: 'Entire plant is poisonous if ingested in quantity due to cytotoxic alkaloids. Wash hands after handling sap.',
    interesting_facts: 'Two chemotherapy drugs extracted from this school garden plant—vinblastine and vincristine—revolutionized childhood leukemia survival rates from 10% to over 90%.',
    video_links: [],
    status: 'published',
    created_at: '2026-03-22T11:00:00Z',
    updated_at: '2026-04-14T08:20:00Z',
    photos: [
      {
        id: 'photo-4',
        storage_path: 'plants/sadabahar/bloom.png',
        public_url: '/images/plants/sadabahar.png',
        alt_text: 'Soft pink Sadabahar flowers with dark green glossy leaves',
        caption: 'Continuous flowering variety near the administrative porch',
        is_primary: true,
        display_order: 1
      }
    ],
    sources: [
      {
        id: 'src-4',
        title: 'Medicinal Plants of India',
        author: 'Indian Council of Medical Research (ICMR)',
        notes: 'Pharmacological evaluation of Catharanthus roseus.'
      }
    ]
  },
  {
    id: 'sample-4',
    slug: 'tulsi-ocimum-tenuiflorum',
    common_name: 'Holy Basil / Tulsi',
    other_common_names: ['Shyama Tulsi', 'Krishna Tulsi', 'Rama Tulsi'],
    scientific_name: 'Ocimum tenuiflorum',
    family: 'Lamiaceae (Mint family)',
    category: 'herb',
    identification_characteristics: 'Aromatic erect branched subshrub with square hairy stems; ovate serrate leaves with strong pungent fragrance; purplish spike inflorescences.',
    identification_confidence: 'confirmed',
    native_origin: 'Indian Subcontinent',
    distribution: 'Grown across homes, gardens, school herbal patches, and sanctified campus spaces across India.',
    campus_location: 'Central Botanical Garden & School Eco-Club Zone',
    flowers: 'Tiny purplish to pale lilac flowers arranged in close whorls on elongated racemes.',
    flowering_season: 'September – February',
    fruits: 'Small nutlets enclosed within the persistent ribbed calyx.',
    fruiting_season: 'November – March',
    uses: 'Herbal teas, botanical fragrance, mosquito deterring plant companion, traditional home remedies.',
    ecological_importance: 'High nectar yield for honeybees, stingless bees, and garden pollinator biodiversity.',
    cultural_significance: 'Regarded as a sacred living entity in Indian heritage; central to courtyard architecture and daily mindfulness.',
    traditional_medicinal_uses: 'Adaptogen, respiratory relief (cough/cold decoctions), digestive support, and stress moderation.',
    safety_warnings: 'Safe in standard dietary/tea quantities. Pregnant individuals should avoid concentrated medicinal extracts.',
    interesting_facts: 'Tulsi produces significant phytochemical aerosols including eugenol and linalool, which naturally purify the micro-air environment around the plant.',
    video_links: [],
    status: 'published',
    created_at: '2026-03-25T14:00:00Z',
    updated_at: '2026-04-15T16:00:00Z',
    photos: [
      {
        id: 'photo-5',
        storage_path: 'plants/tulsi/plant.jpg',
        public_url: '/images/plants/neem.png',
        alt_text: 'Fragrant Tulsi leaves and floral spikes',
        caption: 'Rama Tulsi specimen flourishing in the eco-club herbal container',
        is_primary: true,
        display_order: 1
      }
    ],
    sources: [
      {
        id: 'src-5',
        title: 'Tulsi: Queen of Herbs',
        author: 'Journal of Ayurveda and Integrative Medicine',
        notes: 'Review on pharmacological and adaptogenic qualities of Ocimum sanctum.'
      }
    ]
  },
  {
    id: 'sample-5',
    slug: 'amaltas-cassia-fistula',
    common_name: 'Amaltas',
    other_common_names: ['Golden Shower Tree', 'Indian Laburnum', 'Kani Konna'],
    scientific_name: 'Cassia fistula',
    family: 'Fabaceae (Legume family)',
    category: 'tree',
    identification_characteristics: 'Medium tree shedding leaves in early summer, followed by breathtaking pendulous racemes of golden-yellow flowers. Cylindrical dark brown pods up to 60 cm.',
    identification_confidence: 'confirmed',
    native_origin: 'Indian Subcontinent and adjacent regions of Southeast Asia',
    distribution: 'Native deciduous forests and widely planted roadside tree across India.',
    campus_location: 'Sports Field Boundary & Eastern Perimeter Fence',
    flowers: 'Drooping cascades of brilliant yellow 5-petaled flowers, 30–50 cm long.',
    flowering_season: 'April – June (Peak Indian summer)',
    fruits: 'Rigid, cylindrical, dark brown or black woody pods filled with sticky sweet-smelling black pulp and seeds.',
    fruiting_season: 'September – March',
    uses: 'Avenue shading, festival flower harvest (Vishu festival), honey production, natural dye.',
    ecological_importance: 'Host plant for common emigrant and mottled emigrant butterflies; pods eaten by jackals, monkeys, and bears which disperse seeds.',
    cultural_significance: 'State flower of Kerala (Kani Konna), sacred to Vishu new year celebrations symbolizes prosperity and abundance.',
    traditional_medicinal_uses: 'Fruit pulp is a gentle and effective traditional laxative known in Ayurveda as Aragvadha ("disease killer").',
    safety_warnings: 'Leaves, bark, and seeds contain high purgative saponins; only mature pod pulp is traditionally utilized under guidance.',
    interesting_facts: 'The tree blooms completely leafless in the blistering heat of May, creating an astonishing cascading golden roof for shaded school walks.',
    video_links: [],
    status: 'published',
    created_at: '2026-03-28T12:00:00Z',
    updated_at: '2026-04-18T10:00:00Z',
    photos: [
      {
        id: 'photo-6',
        storage_path: 'plants/amaltas/canopy.jpg',
        public_url: '/images/plants/gulmohar.png',
        alt_text: 'Spectacular golden cascading flowers of Amaltas',
        caption: 'Golden shower bloom near the sports track',
        is_primary: true,
        display_order: 1
      }
    ],
    sources: [
      {
        id: 'src-6',
        title: 'Common Trees of India',
        author: 'H. Santapau',
        notes: 'Field identification key for Cassia fistula and relatives.'
      }
    ]
  },
  {
    id: 'sample-6',
    slug: 'bougainvillea-spectabilis',
    common_name: 'Bougainvillea',
    other_common_names: ['Paper Flower', 'Baganvilas'],
    scientific_name: 'Bougainvillea spectabilis',
    family: 'Nyctaginaceae (Four o\'clock family)',
    category: 'climber',
    identification_characteristics: 'Thorny woody perennial vine/scrambler with oval alternate leaves and papery magenta, pink, or purple bracts surrounding three tiny tubular cream flowers.',
    identification_confidence: 'probable',
    native_origin: 'South America (Brazil, Peru, Argentina)',
    distribution: 'Naturalized and omnipresent throughout campuses, boundary walls, and gates across India.',
    campus_location: 'Main School Entrance Arch & Boundary Wall Trellis',
    flowers: 'Tiny cream-white tubular flowers surrounded by three large, brightly colored, paper-textured bracts.',
    flowering_season: 'October – May (Almost continuous in sunny locations)',
    fruits: 'Inconspicuous narrow five-lobed achenes (rarely produced outside native range).',
    fruiting_season: 'Rarely sets fruit in campus settings',
    uses: 'Living protective security hedge, wall screening, vibrant vertical landscaping, pollution barrier.',
    ecological_importance: 'Provides dense, thorny nesting refuge for small urban birds like tailorbirds, sunbirds, and sparrows safe from predators.',
    cultural_significance: 'Ubiquitous sight in Indian schools, government campuses, and railway stations since colonial introductions.',
    traditional_medicinal_uses: 'Leaves have shown mild antimicrobial and antidiabetic properties in lab evaluations; mainly an ornamental shrub.',
    safety_warnings: 'Sharp curved spines on stems can cause painful punctures. Sap may cause dermatitis in sensitive skin.',
    interesting_facts: 'What looks like the petals are actually modified leaves called bracts! The true flower is the tiny white tube hidden in the center of the three leaves.',
    video_links: [],
    status: 'published',
    created_at: '2026-03-30T15:00:00Z',
    updated_at: '2026-04-20T09:00:00Z',
    photos: [
      {
        id: 'photo-7',
        storage_path: 'plants/bougainvillea/bracts.jpg',
        public_url: '/images/plants/sadabahar.png',
        alt_text: 'Cascading clusters of magenta Bougainvillea papery bracts',
        caption: 'Overhanging the campus boundary wall near the gate',
        is_primary: true,
        display_order: 1
      }
    ],
    sources: [
      {
        id: 'src-7',
        title: 'Manual of Cultivated Plants',
        author: 'L.H. Bailey',
        notes: 'Systematics of Bougainvillea spectabilis and hybrids.'
      }
    ]
  },
  {
    id: 'sample-7',
    slug: 'unidentified-campus-wildflower-1',
    common_name: 'Yellow Star Creeper (Field Specimen #04)',
    other_common_names: ['Unverified Meadow Creeper'],
    scientific_name: null,
    family: 'Asteraceae (tentative)',
    category: 'creeper',
    identification_characteristics: 'Prostrate creeping habit, rooting at nodes. Serrate trilobed leaves with rough pubescence. Small yellow composite flowerheads on erect 6 cm stalks.',
    identification_confidence: 'uncertain',
    native_origin: 'Under investigation (possibly native to wet tropical regions)',
    distribution: 'Spreading along damp edges of the school pond perimeter.',
    campus_location: 'Eco-Pond Buffer & Rainwater Swale',
    flowers: 'Bright yellow daisy-like ray and disc florets, ~1.5 cm diameter.',
    flowering_season: 'Monsoon season (July – September)',
    fruits: 'Tiny cypsela achenes.',
    fruiting_season: 'September – October',
    uses: 'Ground cover helping prevent swale soil erosion.',
    ecological_importance: 'Attracts tiny hoverflies and skipper butterflies in the damp microhabitat.',
    cultural_significance: 'Not documented.',
    traditional_medicinal_uses: 'Not verified. Students instructed not to touch or harvest without verification.',
    safety_warnings: 'Identity unverified. Do not ingest or use medicinally.',
    interesting_facts: 'Discovered during the Grade 8 Monsoon Biodiversity Survey 2026. Awaiting confirmation from botanical survey mentors.',
    video_links: [],
    status: 'draft',
    created_at: '2026-08-10T10:00:00Z',
    updated_at: '2026-08-15T11:00:00Z',
    photos: [],
    sources: [
      {
        id: 'src-8',
        title: 'Eco-Club Field Observation Log 2026',
        notes: 'Entry #42 by Grade 8 Science Section B.'
      }
    ]
  }
];

export const PLANT_CATEGORIES: { id: string; label: string; count?: number }[] = [
  { id: 'all', label: 'All Plants' },
  { id: 'tree', label: 'Trees' },
  { id: 'shrub', label: 'Shrubs' },
  { id: 'herb', label: 'Herbs' },
  { id: 'climber', label: 'Climbers' },
  { id: 'creeper', label: 'Creepers' },
  { id: 'flowering plant', label: 'Flowering Plants' },
  { id: 'grass', label: 'Grasses' },
  { id: 'fern', label: 'Ferns' },
  { id: 'aquatic', label: 'Aquatic' },
  { id: 'succulent', label: 'Succulents' },
  { id: 'palm', label: 'Palms' },
  { id: 'other', label: 'Other' },
];
