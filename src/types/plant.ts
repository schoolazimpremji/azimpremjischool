export type PlantCategory =
  | 'tree'
  | 'shrub'
  | 'herb'
  | 'climber'
  | 'creeper'
  | 'grass'
  | 'fern'
  | 'aquatic'
  | 'succulent'
  | 'palm'
  | 'flowering plant'
  | 'other';

export type PlantStatus = 'draft' | 'review' | 'published' | 'archived';

export type ConfidenceLevel = 'confirmed' | 'probable' | 'uncertain' | 'unidentified';

export interface PlantSource {
  id: string;
  plant_id?: string;
  title: string;
  url?: string;
  author?: string;
  notes?: string;
  created_at?: string;
}

export interface PlantPhoto {
  id: string;
  plant_id?: string;
  storage_path: string;
  public_url?: string;
  alt_text?: string;
  caption?: string;
  is_primary?: boolean;
  display_order?: number;
  created_at?: string;
}

export interface Plant {
  id: string;
  slug: string;
  common_name: string;
  other_common_names: string[];
  scientific_name?: string | null;
  family?: string;
  category: PlantCategory;
  identification_characteristics?: string;
  identification_confidence: ConfidenceLevel;
  native_origin?: string;
  distribution?: string;
  campus_location?: string;
  flowers?: string;
  flowering_season?: string;
  fruits?: string;
  fruiting_season?: string;
  uses?: string;
  ecological_importance?: string;
  cultural_significance?: string;
  traditional_medicinal_uses?: string;
  safety_warnings?: string;
  interesting_facts?: string;
  video_links?: string[];
  status: PlantStatus;
  created_at: string;
  updated_at: string;
  photos?: PlantPhoto[];
  sources?: PlantSource[];
}
