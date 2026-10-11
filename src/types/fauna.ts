export type FaunaCategory =
  | 'birds'
  | 'mammals'
  | 'reptiles'
  | 'amphibians'
  | 'butterflies and moths'
  | 'other insects'
  | 'spiders and arachnids'
  | 'fish'
  | 'other invertebrates'
  | 'other';

export type FaunaStatus = 'draft' | 'review' | 'published' | 'archived';

export type ConfidenceLevel = 'confirmed' | 'probable' | 'uncertain' | 'unidentified';

export type ActivityPattern = 'diurnal' | 'nocturnal' | 'crepuscular' | 'cathemeral' | 'variable';

export interface FaunaSource {
  id: string;
  fauna_id?: string;
  title: string;
  url?: string;
  author?: string;
  notes?: string;
  created_at?: string;
}

export interface FaunaPhoto {
  id: string;
  fauna_id?: string;
  storage_path: string;
  public_url?: string;
  alt_text?: string;
  caption?: string;
  is_primary?: boolean;
  display_order?: number;
  created_at?: string;
}

export interface Fauna {
  id: string;
  slug: string;
  common_name: string;
  other_common_names: string[];
  scientific_name?: string | null;
  scientific_authority?: string;
  family?: string;
  category: FaunaCategory;
  identification_confidence: ConfidenceLevel;
  identification_notes?: string;

  // Observation & Habitat
  native_range?: string;
  geographic_distribution?: string;
  habitat?: string;
  microhabitat?: string;
  campus_location?: string;
  observation_notes?: string;
  activity_pattern?: ActivityPattern;
  seasonal_occurrence?: string;

  // Biology & Behaviour
  physical_description?: string;
  diet_and_feeding?: string;
  behaviour_and_adaptations?: string;
  ecological_role?: string;
  reproduction_breeding?: string;
  life_cycle?: string;
  relationship_with_flora?: string;

  // Conservation & Safety
  conservation_status?: string;
  conservation_assessment_year?: string;
  ecological_threats?: string;
  human_wildlife_interactions?: string;
  safety_guidance?: string;
  observation_distance?: string;

  // Educational
  interesting_facts?: string;
  featured_fact?: string;
  video_links?: string[];
  audio_links?: string[];
  status: FaunaStatus;
  created_at: string;
  updated_at: string;
  photos?: FaunaPhoto[];
  sources?: FaunaSource[];
}
