/**
 * Storage and mock data manager for fauna.
 * Provides in-memory / localStorage persistence for client-side editing
 * until direct Supabase mutations are active.
 */
import { Fauna, FaunaStatus } from '@/types/fauna';
import { SAMPLE_FAUNA } from '@/data/sampleFauna';

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
  return updatedRecord;
}

export function deleteFauna(id: string): boolean {
  const all = getLocalFauna();
  const filtered = all.filter((f) => f.id !== id);
  if (filtered.length !== all.length) {
    saveLocalFauna(filtered);
    return true;
  }
  return false;
}
