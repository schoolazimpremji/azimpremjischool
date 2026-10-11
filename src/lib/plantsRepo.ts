/**
 * Storage and mock data manager for plants.
 * Provides in-memory / localStorage persistence for client-side editing
 * until Supabase credentials are fully configured.
 */
import { Plant, PlantStatus } from '@/types/plant';
import { SAMPLE_PLANTS } from '@/data/samplePlants';

const STORAGE_KEY = 'azimpremjischool_plants_v3';

export function getLocalPlants(): Plant[] {
  if (typeof window === 'undefined') {
    return SAMPLE_PLANTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_PLANTS));
      return SAMPLE_PLANTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length < SAMPLE_PLANTS.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_PLANTS));
      return SAMPLE_PLANTS;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load local plants:', e);
    return SAMPLE_PLANTS;
  }
}

export function saveLocalPlants(plants: Plant[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
  } catch (e) {
    console.error('Failed to save local plants:', e);
  }
}

export function getPublicPlants(): Plant[] {
  const all = getLocalPlants();
  return all.filter((p) => p.status === 'published');
}

export function getPlantBySlug(slug: string): Plant | undefined {
  const all = getLocalPlants();
  return all.find((p) => p.slug === slug);
}

export function getPlantById(id: string): Plant | undefined {
  const all = getLocalPlants();
  return all.find((p) => p.id === id);
}

export function savePlant(plant: Plant): Plant {
  const all = getLocalPlants();
  const existingIdx = all.findIndex((p) => p.id === plant.id);

  let updatedList: Plant[];
  const now = new Date().toISOString();
  const updatedPlant = { ...plant, updated_at: now };

  if (existingIdx >= 0) {
    updatedList = [...all];
    updatedList[existingIdx] = updatedPlant;
  } else {
    updatedPlant.created_at = updatedPlant.created_at || now;
    updatedList = [updatedPlant, ...all];
  }

  saveLocalPlants(updatedList);
  return updatedPlant;
}

export function deletePlant(id: string): boolean {
  const all = getLocalPlants();
  const filtered = all.filter((p) => p.id !== id);
  if (filtered.length !== all.length) {
    saveLocalPlants(filtered);
    return true;
  }
  return false;
}
