-- ==============================================================================
-- Azim Premji School - Campus Biodiversity Website
-- Database Migration & Security Schema
-- Target: Supabase PostgreSQL (Project: azimpremjischool)
-- ==============================================================================

-- 1. CUSTOM ENUMS
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plant_category') THEN
    CREATE TYPE plant_category AS ENUM (
      'tree',
      'shrub',
      'herb',
      'climber',
      'creeper',
      'flowering plant',
      'grass',
      'fern',
      'aquatic',
      'succulent',
      'palm',
      'other'
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plant_status') THEN
    CREATE TYPE plant_status AS ENUM (
      'draft',
      'review',
      'published',
      'archived'
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

-- 2. EXPLICIT ADMINISTRATOR ALLOWLIST TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  granted_at TIMESTAMPTZ DEFAULT now()
);

-- Lockdown admin_users: Enable RLS with zero public access policies
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 3. SECURITY DEFINER HELPER FUNCTION
-- Checks if currently authenticated session belongs to approved admin allowlist
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

-- 4. PLANTS TABLE
CREATE TABLE IF NOT EXISTS public.plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  common_name TEXT NOT NULL,
  other_common_names TEXT[] DEFAULT '{}',
  scientific_name TEXT,
  family TEXT,
  category plant_category DEFAULT 'other',
  identification_characteristics TEXT,
  identification_confidence confidence_level DEFAULT 'uncertain',
  native_origin TEXT,
  distribution TEXT,
  campus_location TEXT,
  flowers TEXT,
  flowering_season TEXT,
  fruits TEXT,
  fruiting_season TEXT,
  uses TEXT,
  ecological_importance TEXT,
  cultural_significance TEXT,
  traditional_medicinal_uses TEXT,
  safety_warnings TEXT,
  interesting_facts TEXT,
  video_links TEXT[] DEFAULT '{}',
  status plant_status DEFAULT 'draft',
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance (slug already indexed by UNIQUE constraint)
CREATE INDEX IF NOT EXISTS idx_plants_status ON public.plants(status);
CREATE INDEX IF NOT EXISTS idx_plants_category ON public.plants(category);
CREATE INDEX IF NOT EXISTS idx_plants_common_name ON public.plants(common_name);

-- 5. PLANT PHOTOGRAPHS TABLE
CREATE TABLE IF NOT EXISTS public.plant_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID NOT NULL REFERENCES public.plants(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_plant_photos_plant_id ON public.plant_photos(plant_id);

-- 6. PLANT SOURCES / REFERENCES TABLE
CREATE TABLE IF NOT EXISTS public.plant_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID NOT NULL REFERENCES public.plants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT,
  author TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_plant_sources_plant_id ON public.plant_sources(plant_id);

-- 7. AUTO-UPDATE TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_plants_updated_at ON public.plants;
CREATE TRIGGER set_plants_updated_at
  BEFORE UPDATE ON public.plants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_modified_column();

-- 8. ROW LEVEL SECURITY POLICIES

-- --- Plants Policies ---
ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published plants" ON public.plants;
CREATE POLICY "Public can view published plants"
  ON public.plants FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "Admins can view all plants" ON public.plants;
CREATE POLICY "Admins can view all plants"
  ON public.plants FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert plants" ON public.plants;
CREATE POLICY "Admins can insert plants"
  ON public.plants FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update plants" ON public.plants;
CREATE POLICY "Admins can update plants"
  ON public.plants FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete plants" ON public.plants;
CREATE POLICY "Admins can delete plants"
  ON public.plants FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- --- Plant Photos Policies ---
ALTER TABLE public.plant_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published plant photos" ON public.plant_photos;
CREATE POLICY "Public can view published plant photos"
  ON public.plant_photos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.plants
      WHERE public.plants.id = plant_photos.plant_id
      AND public.plants.status = 'published'
    )
  );

DROP POLICY IF EXISTS "Admins can view all photos" ON public.plant_photos;
CREATE POLICY "Admins can view all photos"
  ON public.plant_photos FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert photos" ON public.plant_photos;
CREATE POLICY "Admins can insert photos"
  ON public.plant_photos FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update photos" ON public.plant_photos;
CREATE POLICY "Admins can update photos"
  ON public.plant_photos FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete photos" ON public.plant_photos;
CREATE POLICY "Admins can delete photos"
  ON public.plant_photos FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- --- Plant Sources Policies ---
ALTER TABLE public.plant_sources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published plant sources" ON public.plant_sources;
CREATE POLICY "Public can view published plant sources"
  ON public.plant_sources FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.plants
      WHERE public.plants.id = plant_sources.plant_id
      AND public.plants.status = 'published'
    )
  );

DROP POLICY IF EXISTS "Admins can view all sources" ON public.plant_sources;
CREATE POLICY "Admins can view all sources"
  ON public.plant_sources FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert sources" ON public.plant_sources;
CREATE POLICY "Admins can insert sources"
  ON public.plant_sources FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update sources" ON public.plant_sources;
CREATE POLICY "Admins can update sources"
  ON public.plant_sources FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete sources" ON public.plant_sources;
CREATE POLICY "Admins can delete sources"
  ON public.plant_sources FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- 9. STORAGE POLICIES (For private bucket 'plant-photos')
-- Note: Create private bucket 'plant-photos' in Supabase Storage UI first
DROP POLICY IF EXISTS "Admins can read photos" ON storage.objects;
CREATE POLICY "Admins can read photos"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'plant-photos' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can upload photos" ON storage.objects;
CREATE POLICY "Admins can upload photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'plant-photos' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can update photos" ON storage.objects;
CREATE POLICY "Admins can update photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'plant-photos' AND public.is_admin())
  WITH CHECK (bucket_id = 'plant-photos' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can delete photos" ON storage.objects;
CREATE POLICY "Admins can delete photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'plant-photos' AND public.is_admin());
