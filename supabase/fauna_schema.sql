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
  alt_text TEXT,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

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
