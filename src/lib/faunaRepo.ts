/**
 * Storage and mock data manager for fauna.
 * Provides in-memory / localStorage persistence for client-side editing
 * and seamlessly synchronizes with Supabase when tables are deployed.
 */
import { Fauna, FaunaStatus } from '@/types/fauna';
import { SAMPLE_FAUNA } from '@/data/sampleFauna';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

const STORAGE_KEY = 'azimpremjischool_fauna_v1';

export function getLocalFauna(): Fauna[] {
  if (typeof window === 'undefined') {
    return SAMPLE_FAUNA;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_FAUNA));
      return SAMPLE_FAUNA;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load local fauna:', e);
    return SAMPLE_FAUNA;
  }
}

export function saveLocalFauna(faunaList: Fauna[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(faunaList));
  } catch (e) {
    console.error('Failed to save local fauna:', e);
  }
}

export function getPublicFauna(): Fauna[] {
  const all = getLocalFauna();
  return all.filter((f) => f.status === 'published');
}

export function getFaunaBySlug(slug: string): Fauna | undefined {
  const all = getLocalFauna();
  return all.find((f) => f.slug === slug);
}

export function getFaunaById(id: string): Fauna | undefined {
  const all = getLocalFauna();
  return all.find((f) => f.id === id);
}

/**
 * Fetch fauna records directly from Supabase if configured and available.
 * Falls back to local storage if table is not yet deployed or on network error.
 */
export async function fetchFaunaFromSupabase(): Promise<Fauna[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalFauna();
  }

  try {
    const { data, error } = await supabase
      .from('fauna')
      .select(`
        *,
        photos:fauna_photos(*),
        sources:fauna_sources(*)
      `)
      .order('common_name', { ascending: true });

    if (error) {
      // Table may not be created yet in Supabase
      console.warn('Supabase fauna query returned error, using local data:', error.message);
      return getLocalFauna();
    }

    if (data && data.length > 0) {
      saveLocalFauna(data as Fauna[]);
      return data as Fauna[];
    }

    return getLocalFauna();
  } catch (err) {
    console.warn('Could not query Supabase fauna, using local data:', err);
    return getLocalFauna();
  }
}

/**
 * Saves a fauna record locally and attempts to sync to Supabase if authenticated.
 */
export function saveFauna(faunaRecord: Fauna): Fauna {
  const all = getLocalFauna();
  const existingIdx = all.findIndex((f) => f.id === faunaRecord.id);

  let updatedList: Fauna[];
  const now = new Date().toISOString();
  const updatedRecord = { ...faunaRecord, updated_at: now };

  if (existingIdx >= 0) {
    updatedList = [...all];
    updatedList[existingIdx] = updatedRecord;
  } else {
    updatedRecord.created_at = updatedRecord.created_at || now;
    updatedList = [updatedRecord, ...all];
  }

  saveLocalFauna(updatedList);

  // Background sync to Supabase if available
  if (isSupabaseConfigured && supabase) {
    syncFaunaToSupabase(updatedRecord).catch((err) => {
      console.warn('Could not sync fauna record to Supabase:', err);
    });
  }

  return updatedRecord;
}

/**
 * Sync a single fauna record and its photos & sources to Supabase.
 */
export async function syncFaunaToSupabase(fauna: Fauna): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    const { photos, sources, ...faunaFields } = fauna;
    const { error: faunaError } = await supabase.from('fauna').upsert(faunaFields);
    if (faunaError) throw faunaError;

    if (photos && photos.length > 0) {
      const photosToUpsert = photos.map((p) => ({
        ...p,
        fauna_id: fauna.id,
      }));
      await supabase.from('fauna_photos').upsert(photosToUpsert);
    }

    if (sources && sources.length > 0) {
      const sourcesToUpsert = sources.map((s) => ({
        ...s,
        fauna_id: fauna.id,
      }));
      await supabase.from('fauna_sources').upsert(sourcesToUpsert);
    }
  } catch (err) {
    console.warn('Error during Supabase fauna upsert:', err);
  }
}

/**
 * Deletes a fauna record locally and from Supabase if configured.
 */
export function deleteFauna(id: string): boolean {
  const all = getLocalFauna();
  const filtered = all.filter((f) => f.id !== id);
  if (filtered.length !== all.length) {
    saveLocalFauna(filtered);

    if (isSupabaseConfigured && supabase) {
      supabase
        .from('fauna')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.warn('Could not delete fauna from Supabase:', error.message);
        });
    }

    return true;
  }
  return false;
}
