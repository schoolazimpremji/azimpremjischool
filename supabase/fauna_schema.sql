-- ==============================================================================
-- Azim Premji School - Campus Biodiversity Website
-- Fauna Extension Migration & Row-Level Security Schema
-- Target: Supabase PostgreSQL (Project: azimpremjischool)
--
-- Note: Uses Option B (Dedicated Fauna Tables) to guarantee zero disruption
-- to existing flora records and production services.
-- ==============================================================================

-- 1. FAUNA CUSTOM ENUMS
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'fauna_category') THEN
    CREATE TYPE fauna_category AS ENUM (
      'birds',
      'mammals',
      'reptiles',
      'amphibians',
      'butterflies and moths',
      'other insects',
      'spiders and arachnids',
      'fish',
      'other invertebrates',
      'other'
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'fauna_status') THEN
    CREATE TYPE fauna_status AS ENUM (
      'draft',
      'review',
      'published',
      'archived'
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'activity_pattern') THEN
    CREATE TYPE activity_pattern AS ENUM (
      'diurnal',
      'nocturnal',
      'crepuscular',
      'cathemeral',
      'variable'
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'confidence_level') THEN
    CREATE TYPE confidence_level AS ENUM (
      'confirmed',
      'probable',
      'uncertain',
      'unidentified'
    );
  END IF;
END $$;

-- Administrator allowlist table & helper (if not already defined)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  granted_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE id = auth.uid()
  );
$$;

-- Trigger helper function for auto-updating updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. FAUNA SPECIES TABLE
CREATE TABLE IF NOT EXISTS public.fauna (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  common_name TEXT NOT NULL,
  other_common_names TEXT[] DEFAULT '{}',
  scientific_name TEXT,
  scientific_authority TEXT,
  family TEXT,
  category fauna_category DEFAULT 'other',
  identification_confidence confidence_level DEFAULT 'uncertain',
  identification_notes TEXT,

  -- Observation & Habitat
  native_range TEXT,
  geographic_distribution TEXT,
  habitat TEXT,
  microhabitat TEXT,
  campus_location TEXT,
  observation_notes TEXT,
  activity_pattern activity_pattern DEFAULT 'diurnal',
  seasonal_occurrence TEXT,

  -- Biology & Behaviour
  physical_description TEXT,
  diet_and_feeding TEXT,
  behaviour_and_adaptations TEXT,
  ecological_role TEXT,
  reproduction_breeding TEXT,
  life_cycle TEXT,
  relationship_with_flora TEXT,

  -- Conservation & Safety
  conservation_status TEXT,
  conservation_assessment_year TEXT,
  ecological_threats TEXT,
  human_wildlife_interactions TEXT,
  safety_guidance TEXT,
  observation_distance TEXT,

  -- Educational Content
  interesting_facts TEXT,
  featured_fact TEXT,
  video_links TEXT[] DEFAULT '{}',
  audio_links TEXT[] DEFAULT '{}',

  status fauna_status DEFAULT 'draft',
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_fauna_status ON public.fauna(status);
CREATE INDEX IF NOT EXISTS idx_fauna_category ON public.fauna(category);
CREATE INDEX IF NOT EXISTS idx_fauna_common_name ON public.fauna(common_name);

-- 3. FAUNA PHOTOGRAPHS TABLE
CREATE TABLE IF NOT EXISTS public.fauna_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fauna_id UUID NOT NULL REFERENCES public.fauna(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  public_url TEXT,
  alt_text TEXT,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.fauna_photos ADD COLUMN IF NOT EXISTS public_url TEXT;

CREATE INDEX IF NOT EXISTS idx_fauna_photos_fauna_id ON public.fauna_photos(fauna_id);

-- 4. FAUNA SOURCES / REFERENCES TABLE
CREATE TABLE IF NOT EXISTS public.fauna_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fauna_id UUID NOT NULL REFERENCES public.fauna(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT,
  author TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fauna_sources_fauna_id ON public.fauna_sources(fauna_id);

-- 5. TRIGGER FOR UPDATED_AT
DROP TRIGGER IF EXISTS set_fauna_updated_at ON public.fauna;
CREATE TRIGGER set_fauna_updated_at
  BEFORE UPDATE ON public.fauna
  FOR EACH ROW
  EXECUTE FUNCTION public.update_modified_column();

-- 6. ROW LEVEL SECURITY POLICIES

-- --- Fauna Table Policies ---
ALTER TABLE public.fauna ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published fauna" ON public.fauna;
CREATE POLICY "Public can view published fauna"
  ON public.fauna FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "Admins can view all fauna" ON public.fauna;
CREATE POLICY "Admins can view all fauna"
  ON public.fauna FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert fauna" ON public.fauna;
CREATE POLICY "Admins can insert fauna"
  ON public.fauna FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update fauna" ON public.fauna;
CREATE POLICY "Admins can update fauna"
  ON public.fauna FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete fauna" ON public.fauna;
CREATE POLICY "Admins can delete fauna"
  ON public.fauna FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- --- Fauna Photos Policies ---
ALTER TABLE public.fauna_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published fauna photos" ON public.fauna_photos;
CREATE POLICY "Public can view published fauna photos"
  ON public.fauna_photos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.fauna
      WHERE public.fauna.id = fauna_photos.fauna_id
      AND public.fauna.status = 'published'
    )
  );

DROP POLICY IF EXISTS "Admins can view all fauna photos" ON public.fauna_photos;
CREATE POLICY "Admins can view all fauna photos"
  ON public.fauna_photos FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert fauna photos" ON public.fauna_photos;
CREATE POLICY "Admins can insert fauna photos"
  ON public.fauna_photos FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update fauna photos" ON public.fauna_photos;
CREATE POLICY "Admins can update fauna photos"
  ON public.fauna_photos FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete fauna photos" ON public.fauna_photos;
CREATE POLICY "Admins can delete fauna photos"
  ON public.fauna_photos FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- --- Fauna Sources Policies ---
ALTER TABLE public.fauna_sources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published fauna sources" ON public.fauna_sources;
CREATE POLICY "Public can view published fauna sources"
  ON public.fauna_sources FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.fauna
      WHERE public.fauna.id = fauna_sources.fauna_id
      AND public.fauna.status = 'published'
    )
  );

DROP POLICY IF EXISTS "Admins can view all fauna sources" ON public.fauna_sources;
CREATE POLICY "Admins can view all fauna sources"
  ON public.fauna_sources FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert fauna sources" ON public.fauna_sources;
CREATE POLICY "Admins can insert fauna sources"
  ON public.fauna_sources FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update fauna sources" ON public.fauna_sources;
CREATE POLICY "Admins can update fauna sources"
  ON public.fauna_sources FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete fauna sources" ON public.fauna_sources;
CREATE POLICY "Admins can delete fauna sources"
  ON public.fauna_sources FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================
-- 9. STORAGE BUCKET CONFIGURATION (For 'fauna-photos')
-- ============================================================
-- Ensure the 'fauna-photos' public storage bucket exists for image uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('fauna-photos', 'fauna-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS Policies for 'fauna-photos' bucket
DROP POLICY IF EXISTS "Public can view fauna photos in storage" ON storage.objects;
CREATE POLICY "Public can view fauna photos in storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'fauna-photos');

DROP POLICY IF EXISTS "Admins can upload fauna photos to storage" ON storage.objects;
CREATE POLICY "Admins can upload fauna photos to storage"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'fauna-photos' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can update fauna photos in storage" ON storage.objects;
CREATE POLICY "Admins can update fauna photos in storage"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'fauna-photos' AND public.is_admin())
  WITH CHECK (bucket_id = 'fauna-photos' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can delete fauna photos from storage" ON storage.objects;
CREATE POLICY "Admins can delete fauna photos from storage"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'fauna-photos' AND public.is_admin());

-- ============================================================
-- 10. INITIAL SAMPLE SEEDS (Optional Verification Data)
-- ============================================================
INSERT INTO public.fauna (
  slug, common_name, other_common_names, scientific_name, scientific_authority,
  family, category, identification_confidence, identification_notes,
  native_range, geographic_distribution, habitat, microhabitat,
  campus_location, observation_notes, activity_pattern, seasonal_occurrence,
  physical_description, diet_and_feeding, behaviour_and_adaptations,
  ecological_role, reproduction_breeding, life_cycle, relationship_with_flora,
  conservation_status, conservation_assessment_year, ecological_threats,
  human_wildlife_interactions, safety_guidance, observation_distance,
  interesting_facts, featured_fact, status
) VALUES
(
  'red-vented-bulbul',
  'Red-vented Bulbul',
  ARRAY['Bulbul', 'Kala Bulbul (Hindi)'],
  'Pycnonotus cafer',
  '(Linnaeus, 1766)',
  'Pycnonotidae',
  'birds',
  'confirmed',
  'Dark crest on head, brown scaled back, white rump, crimson-red undertail patch.',
  'Indian Subcontinent',
  'Widespread across India and Sri Lanka in open woodlands, orchards, and gardens.',
  'Urban gardens, school grounds, deciduous orchards, and scrublands.',
  'Canopy branches of Gulmohar and Neem trees, and fruiting hedges.',
  'Central Lawn & Fruit Tree Orchard near Junior Wing',
  'Frequently observed in pairs foraging on berries in morning hours.',
  'diurnal',
  'Resident breeder; present on campus throughout all seasons.',
  'Medium-sized songbird (~20 cm) with black crested head, brown scalloped back, crimson vent.',
  'Omnivorous: berries, flower nectar, termites, caterpillars.',
  'Builds neat cup-shaped nests in dense low bushes using fine twigs and cobwebs.',
  'Critical seed disperser for campus shrubs and natural biological insect predator.',
  'Breeds June to September; clutches contain 2-3 pinkish speckled eggs.',
  'Incubation lasts 12-14 days; fledglings leave nest within 12 days.',
  'Visits Delonix regia (Gulmohar) flowers for nectar; perches in Neem.',
  'Least Concern (IUCN)',
  '2020',
  'Urban pesticide usage causing insect depletion and domestic cat predation.',
  'Accustomed to quiet human presence around campus walkways. Do not disturb nesting bushes.',
  'Harmless songbird. Students must observe with binoculars from 3-5 metres distance.',
  'Observe quietly from 3 to 5 metres distance; avoid touching nests or fledglings.',
  'Bulbuls are capable of complex melodious bubbling calls and territory mimicry.',
  'Red-vented bulbuls play an indispensable role in regenerating campus flora through seed dispersal.',
  'published'
),
(
  'indian-palm-squirrel',
  'Three-striped Palm Squirrel',
  ARRAY['Gilahri (Hindi)', 'Indian Palm Squirrel'],
  'Funambulus palmarum',
  '(Linnaeus, 1766)',
  'Sciuridae',
  'mammals',
  'confirmed',
  'Small agile rodent with three creamy longitudinal dorsal stripes and bushy tail.',
  'Indian Subcontinent & Sri Lanka',
  'Ubiquitous in rural, semi-urban, and forested areas across India.',
  'Deciduous trees, cultivated gardens, roof crevices, and verandas.',
  'Tree trunks, branches, and shady canopy of mature courtyard trees.',
  'Main School Courtyard & Library Periphery',
  'Produces bird-like chirping alarms when potential predators appear.',
  'diurnal',
  'Active year-round, especially in cooler morning and late afternoon hours.',
  'Slender rodent measuring 15-20 cm head-body length with bushy tail.',
  'Herbivorous: seeds, nuts, tender tree buds, fallen fruits, occasionally insects.',
  'Rapid vertical climbing ability; holds food deftly between forepaws.',
  'Seed cacher; forgotten seeds buried in school lawns often germinate into saplings.',
  'Breeds year-round with peaks in spring; builds domed nests from dry fibers.',
  'Gestation 40-42 days; litters usually 2-3 kits.',
  'Uses bark fibers to construct warm nests and feeds on flowers of Gulmohar.',
  'Least Concern (IUCN)',
  '2016',
  'Overhead electrical lines, traffic, and feral cats.',
  'Seen scurrying near benches. Students should never trap or feed processed snacks.',
  'Harmless but wild; do not corner or handle directly as rodents can bite.',
  'Observe freely from 2 to 4 metres.',
  'Folklore connects the three stripes to the gentle touch of Lord Rama.',
  'Their high-pitched sentinel calls alert both other squirrels and campus birds to raptors.',
  'published'
),
(
  'common-mormon-butterfly',
  'Common Mormon',
  ARRAY['Mormon Swallowtail'],
  'Papilio polytes',
  'Linnaeus, 1758',
  'Papilionidae',
  'butterflies and moths',
  'confirmed',
  'Velvet-black swallowtail; males have creamy-white hindwing band; females show Batesian mimicry.',
  'South Asia & Indo-Malayan realm',
  'Widespread across India from lowlands to mid-elevation hills.',
  'Gardens, campus flower beds, forest clearings, and citrus groves.',
  'Sunlit flowering shrubs, Sadabahar patches, and lemon saplings.',
  'Campus Botanical Garden & Science Block Greenhouses',
  'Regularly observed mud-puddling on wet soil near garden taps.',
  'diurnal',
  'Most abundant during post-monsoon months (September to November).',
  'Wingspan 90-100 mm with pronounced spatulate tail extensions.',
  'Adults drink flower nectar; caterpillars feed strictly on Rutaceae (Citrus, Curry leaf).',
  'Exhibits polymorphic female mimicry of toxic Crimson Rose swallowtails.',
  'Key pollinator of campus garden flowers and herbs.',
  'Lays single pale yellow spherical eggs on tender citrus leaf undersides.',
  'Complete metamorphosis over roughly 3 to 4 weeks.',
  'Host plant: Murraya koenigii (Curry leaf) & Citrus; nectar: Sadabahar.',
  'Least Concern (IUCN / WPA)',
  '2021',
  'Pesticide spraying on ornamental plants kills caterpillars and pupae.',
  'Delightful subject for student photography and drawing exercises in science class.',
  'Completely harmless. Do not touch delicate wings as rubbing scales impairs flight.',
  'Observe closely from 1 metre without casting rapid shadows.',
  'Young caterpillars look exactly like bird droppings to deter predators.',
  'A classic textbook example of natural selection and Batesian mimicry.',
  'published'
),
(
  'oriental-garden-lizard',
  'Oriental Garden Lizard',
  ARRAY['Changeable Lizard', 'Girgit (Hindi)', 'Blood-sucker (Misnomer)'],
  'Calotes versicolor',
  '(Daudin, 1802)',
  'Agamidae',
  'reptiles',
  'confirmed',
  'Serrated dorsal crest; males develop bright crimson head during territorial breeding displays.',
  'South Asia & Indo-China',
  'Common throughout India in gardens, farmlands, open woodlands, and urban parks.',
  'Hedges, shrubby borders, stone boundary walls, and sun-warmed tree boles.',
  'Low tree branches and sunny brick ledges along perimeter.',
  'Perimeter Boundary Wall & Sports Field Hedges',
  'Seen basking on morning rocks to thermoregulate, performing head bobs.',
  'diurnal',
  'Active throughout warmer months; enters brumation during chilly winter weeks.',
  'Total length up to 37 cm including very long slender tail. Body scales keeled.',
  'Insectivorous: feeds eagerly on grasshoppers, beetles, ants, crickets.',
  'Capable of rapid color change driven by temperature, mood, and camouflage.',
  'Natural biological controller of campus insect pests; prey for raptors.',
  'Oviparous; females bury 10-20 oval leathery eggs in moist soil.',
  'Eggs hatch in 6-8 weeks; hatchlings are self-sufficient immediately.',
  'Uses thorny branches of bougainvillea and hedge shrubs for shelter.',
  'Least Concern (IUCN)',
  '2021',
  'Loss of dense boundary hedges and lawn pesticide use.',
  'Commonly feared due to unfounded myth of "blood-sucking"; educational signage dispels this.',
  'Non-venomous and timid. Will scurry away when approached. Do not grab by tail.',
  'Observe from 2 to 3 metres.',
  'The name "Blood-sucker" is completely misleading; they do not suck blood.',
  'Garden lizards perform rhythmic "push-ups" to assert dominance over rival males.',
  'published'
)
ON CONFLICT (slug) DO UPDATE SET
  common_name = EXCLUDED.common_name,
  scientific_name = EXCLUDED.scientific_name,
  family = EXCLUDED.family,
  category = EXCLUDED.category,
  identification_confidence = EXCLUDED.identification_confidence,
  status = EXCLUDED.status;

-- Seed Photos for Fauna (Dynamically resolved by slug, safe for UUID keys)
INSERT INTO public.fauna_photos (
  fauna_id, storage_path, public_url, caption, alt_text, is_primary, display_order
)
SELECT 
  id,
  'fauna/red-vented-bulbul/bulbul-01.jpg',
  '/images/fauna/bulbul.jpg',
  'Adult Red-vented Bulbul photographed in campus shrubbery near Junior Wing.',
  'Red-vented bulbul perching on garden foliage',
  true,
  1
FROM public.fauna
WHERE slug = 'red-vented-bulbul'
AND NOT EXISTS (
  SELECT 1 FROM public.fauna_photos p WHERE p.fauna_id = public.fauna.id AND p.storage_path = 'fauna/red-vented-bulbul/bulbul-01.jpg'
);

INSERT INTO public.fauna_photos (
  fauna_id, storage_path, public_url, caption, alt_text, is_primary, display_order
)
SELECT 
  id,
  'fauna/indian-palm-squirrel/squirrel-01.jpg',
  '/images/fauna/squirrel.jpg',
  'Palm squirrel foraging along the bark of an old courtyard tree.',
  'Three-striped palm squirrel climbing bark of tree',
  true,
  1
FROM public.fauna
WHERE slug = 'indian-palm-squirrel'
AND NOT EXISTS (
  SELECT 1 FROM public.fauna_photos p WHERE p.fauna_id = public.fauna.id AND p.storage_path = 'fauna/indian-palm-squirrel/squirrel-01.jpg'
);

INSERT INTO public.fauna_photos (
  fauna_id, storage_path, public_url, caption, alt_text, is_primary, display_order
)
SELECT 
  id,
  'fauna/common-mormon/mormon-01.jpg',
  '/images/fauna/common_mormon.jpg',
  'Common Mormon nectaring on blooming campus flora in the afternoon sun.',
  'Common Mormon butterfly perched on a garden blossom',
  true,
  1
FROM public.fauna
WHERE slug = 'common-mormon-butterfly'
AND NOT EXISTS (
  SELECT 1 FROM public.fauna_photos p WHERE p.fauna_id = public.fauna.id AND p.storage_path = 'fauna/common-mormon/mormon-01.jpg'
);

INSERT INTO public.fauna_photos (
  fauna_id, storage_path, public_url, caption, alt_text, is_primary, display_order
)
SELECT 
  id,
  'fauna/oriental-garden-lizard/lizard-01.jpg',
  '/images/fauna/garden_lizard.jpg',
  'Male garden lizard thermoregulating along the school perimeter hedge.',
  'Oriental Garden lizard basking on wooden branch',
  true,
  1
FROM public.fauna
WHERE slug = 'oriental-garden-lizard'
AND NOT EXISTS (
  SELECT 1 FROM public.fauna_photos p WHERE p.fauna_id = public.fauna.id AND p.storage_path = 'fauna/oriental-garden-lizard/lizard-01.jpg'
);


