'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Fauna,
  FaunaCategory,
  FaunaStatus,
  ConfidenceLevel,
  ActivityPattern,
  FaunaPhoto,
  FaunaSource
} from '@/types/fauna';
import { saveFauna } from '@/lib/faunaRepo';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Image,
  BookOpen,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Bird
} from 'lucide-react';
import Link from 'next/link';

interface FaunaFormProps {
  initialFauna?: Fauna;
  isEditing?: boolean;
}

export default function FaunaForm({ initialFauna, isEditing = false }: FaunaFormProps) {
  const router = useRouter();

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const [formData, setFormData] = useState<Partial<Fauna>>({
    id: initialFauna?.id || `fauna-${Date.now()}`,
    slug: initialFauna?.slug || '',
    common_name: initialFauna?.common_name || '',
    other_common_names: initialFauna?.other_common_names || [],
    scientific_name: initialFauna?.scientific_name || '',
    scientific_authority: initialFauna?.scientific_authority || '',
    family: initialFauna?.family || '',
    category: initialFauna?.category || 'birds',
    identification_confidence: initialFauna?.identification_confidence || 'uncertain',
    identification_notes: initialFauna?.identification_notes || '',

    native_range: initialFauna?.native_range || '',
    geographic_distribution: initialFauna?.geographic_distribution || '',
    habitat: initialFauna?.habitat || '',
    microhabitat: initialFauna?.microhabitat || '',
    campus_location: initialFauna?.campus_location || '',
    observation_notes: initialFauna?.observation_notes || '',
    activity_pattern: initialFauna?.activity_pattern || 'diurnal',
    seasonal_occurrence: initialFauna?.seasonal_occurrence || '',

    physical_description: initialFauna?.physical_description || '',
    diet_and_feeding: initialFauna?.diet_and_feeding || '',
    behaviour_and_adaptations: initialFauna?.behaviour_and_adaptations || '',
    ecological_role: initialFauna?.ecological_role || '',
    reproduction_breeding: initialFauna?.reproduction_breeding || '',
    life_cycle: initialFauna?.life_cycle || '',
    relationship_with_flora: initialFauna?.relationship_with_flora || '',

    conservation_status: initialFauna?.conservation_status || '',
    conservation_assessment_year: initialFauna?.conservation_assessment_year || '',
    ecological_threats: initialFauna?.ecological_threats || '',
    human_wildlife_interactions: initialFauna?.human_wildlife_interactions || '',
    safety_guidance: initialFauna?.safety_guidance || '',
    observation_distance: initialFauna?.observation_distance || '',

    interesting_facts: initialFauna?.interesting_facts || '',
    featured_fact: initialFauna?.featured_fact || '',
    video_links: initialFauna?.video_links || [],
    audio_links: initialFauna?.audio_links || [],
    status: initialFauna?.status || 'draft',
    photos: initialFauna?.photos || [],
    sources: initialFauna?.sources || [],
  });

  const [otherNameInput, setOtherNameInput] = useState('');
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [photoCaptionInput, setPhotoCaptionInput] = useState('');
  const [photoAltInput, setPhotoAltInput] = useState('');

  const [sourceTitleInput, setSourceTitleInput] = useState('');
  const [sourceAuthorInput, setSourceAuthorInput] = useState('');
  const [sourceUrlInput, setSourceUrlInput] = useState('');
  const [sourceNotesInput, setSourceNotesInput] = useState('');

  const handleCommonNameBlur = () => {
    if (!formData.slug && formData.common_name) {
      setFormData((prev) => ({
        ...prev,
        slug: slugify(formData.common_name || ''),
      }));
    }
  };

  const addOtherCommonName = () => {
    if (otherNameInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        other_common_names: [...(prev.other_common_names || []), otherNameInput.trim()],
      }));
      setOtherNameInput('');
    }
  };

  const removeOtherCommonName = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      other_common_names: prev.other_common_names?.filter((_, i) => i !== index),
    }));
  };

  const addPhoto = () => {
    if (photoUrlInput.trim()) {
      const newPhoto: FaunaPhoto = {
        id: `photo-${Date.now()}`,
        storage_path: `fauna/${formData.slug || 'misc'}/${Date.now()}.jpg`,
        public_url: photoUrlInput.trim(),
        caption: photoCaptionInput.trim() || undefined,
        alt_text: photoAltInput.trim() || undefined,
        is_primary: (formData.photos?.length || 0) === 0,
        display_order: (formData.photos?.length || 0) + 1,
      };

      setFormData((prev) => ({
        ...prev,
        photos: [...(prev.photos || []), newPhoto],
      }));

      setPhotoUrlInput('');
      setPhotoCaptionInput('');
      setPhotoAltInput('');
    }
  };

  const removePhoto = (photoId: string) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos?.filter((p) => p.id !== photoId),
    }));
  };

  const setPrimaryPhoto = (photoId: string) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos?.map((p) => ({
        ...p,
        is_primary: p.id === photoId,
      })),
    }));
  };

  const addSource = () => {
    if (sourceTitleInput.trim()) {
      const newSource: FaunaSource = {
        id: `src-${Date.now()}`,
        title: sourceTitleInput.trim(),
        author: sourceAuthorInput.trim() || undefined,
        url: sourceUrlInput.trim() || undefined,
        notes: sourceNotesInput.trim() || undefined,
      };

      setFormData((prev) => ({
        ...prev,
        sources: [...(prev.sources || []), newSource],
      }));

      setSourceTitleInput('');
      setSourceAuthorInput('');
      setSourceUrlInput('');
      setSourceNotesInput('');
    }
  };

  const removeSource = (sourceId: string) => {
    setFormData((prev) => ({
      ...prev,
      sources: prev.sources?.filter((s) => s.id !== sourceId),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.common_name?.trim()) {
      alert('Please enter a common name for the animal specimen.');
      return;
    }

    const finalSlug = formData.slug?.trim() || slugify(formData.common_name);

    const faunaToSave: Fauna = {
      ...(formData as Fauna),
      id: formData.id || `fauna-${Date.now()}`,
      slug: finalSlug,
      common_name: formData.common_name.trim(),
      other_common_names: formData.other_common_names || [],
      scientific_name: formData.scientific_name?.trim() || null,
      family: formData.family?.trim() || undefined,
      category: formData.category || 'birds',
      identification_confidence: formData.identification_confidence || 'uncertain',
      status: formData.status || 'draft',
      created_at: initialFauna?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      photos: formData.photos || [],
      sources: formData.sources || [],
    };

    saveFauna(faunaToSave);
    router.push('/admin/fauna');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      {/* Top Header & Save Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sage-200 pb-5">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/fauna"
            className="p-2 rounded-lg text-sage-600 hover:text-forest-900 hover:bg-sage-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              {isEditing ? `Edit Fauna: ${initialFauna?.common_name}` : 'New Wildlife Field Entry'}
            </h1>
            <p className="text-xs text-sage-600">
              Document animal observations, behaviour, habitat, and student safety guidance.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/fauna"
            className="px-4 py-2 rounded-xl border border-sage-300 text-sage-700 hover:bg-sage-100 font-semibold text-xs"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-5 py-2 rounded-xl bg-forest-800 text-white font-semibold text-xs hover:bg-forest-900 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Fauna Record</span>
          </button>
        </div>
      </div>

      {/* Section 1: Governance & Status */}
      <div className="bg-amber-50/60 rounded-2xl p-6 border border-amber-200/80 space-y-4">
        <div className="flex items-center space-x-2 text-forest-900 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-forest-700" />
          <span>Curator Publishing & Verification Status</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Publication Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as FaunaStatus })}
              className="w-full p-2.5 rounded-xl border border-sage-300 bg-white text-forest-950 font-medium outline-none"
            >
              <option value="draft">Draft (Quarantined, ongoing observation)</option>
              <option value="review">Under Review (Awaiting faculty confirmation)</option>
              <option value="published">Published (Visible on public field guide)</option>
              <option value="archived">Archived (Historical observation)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Identification Confidence *
            </label>
            <select
              value={formData.identification_confidence}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  identification_confidence: e.target.value as ConfidenceLevel,
                })
              }
              className="w-full p-2.5 rounded-xl border border-sage-300 bg-white text-forest-950 font-medium outline-none"
            >
              <option value="confirmed">Confirmed (Verified with photographic evidence)</option>
              <option value="probable">Probable (High certainty)</option>
              <option value="uncertain">Uncertain (Field verification pending)</option>
              <option value="unidentified">Unidentified (Unknown species observed)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Identity & Taxonomy */}
      <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-950 border-b border-sage-100 pb-2">
          1. Animal Identity & Taxonomy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Common Name *
            </label>
            <input
              type="text"
              required
              value={formData.common_name}
              onChange={(e) => setFormData({ ...formData, common_name: e.target.value })}
              onBlur={handleCommonNameBlur}
              placeholder="e.g. Red-vented Bulbul, Indian Palm Squirrel"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Scientific Name (Binomial)
            </label>
            <input
              type="text"
              value={formData.scientific_name || ''}
              onChange={(e) => setFormData({ ...formData, scientific_name: e.target.value })}
              placeholder="e.g. Pycnonotus cafer (leave blank if unconfirmed)"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 italic outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Zoological Family
            </label>
            <input
              type="text"
              value={formData.family || ''}
              onChange={(e) => setFormData({ ...formData, family: e.target.value })}
              placeholder="e.g. Pycnonotidae, Sciuridae, Papilionidae"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Animal Group / Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as FaunaCategory })
              }
              className="w-full p-2.5 rounded-xl border border-sage-300 bg-white text-forest-950 font-medium outline-none capitalize"
            >
              <option value="birds">Birds</option>
              <option value="mammals">Mammals</option>
              <option value="butterflies and moths">Butterflies & Moths</option>
              <option value="reptiles">Reptiles</option>
              <option value="amphibians">Amphibians</option>
              <option value="other insects">Other Insects</option>
              <option value="spiders and arachnids">Spiders & Arachnids</option>
              <option value="fish">Fish</option>
              <option value="other invertebrates">Other Invertebrates</option>
              <option value="other">Other / Unclassified</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Scientific Authority (e.g. Linnaeus, 1758)
            </label>
            <input
              type="text"
              value={formData.scientific_authority || ''}
              onChange={(e) => setFormData({ ...formData, scientific_authority: e.target.value })}
              placeholder="Optional taxonomic author"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
              placeholder="e.g. red-vented-bulbul"
              className="w-full p-2.5 rounded-xl border border-sage-300 font-mono text-xs text-forest-950 outline-none"
            />
          </div>

          {/* Other Regional / Vernacular Names */}
          <div className="sm:col-span-2 space-y-2">
            <label className="block font-semibold uppercase tracking-wider text-sage-700">
              Other Vernacular & Local Names
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={otherNameInput}
                onChange={(e) => setOtherNameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addOtherCommonName();
                  }
                }}
                placeholder="e.g. Gilahri (Hindi), Kala Bulbul (press Enter or Add)"
                className="flex-1 p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none text-xs"
              />
              <button
                type="button"
                onClick={addOtherCommonName}
                className="px-4 py-2 bg-sage-200 text-forest-900 rounded-xl text-xs font-semibold hover:bg-sage-300"
              >
                Add
              </button>
            </div>

            {formData.other_common_names && formData.other_common_names.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {formData.other_common_names.map((name, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sage-100 text-forest-900 text-xs font-medium"
                  >
                    <span>{name}</span>
                    <button
                      type="button"
                      onClick={() => removeOtherCommonName(idx)}
                      className="text-sage-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Campus Observation & Habitat */}
      <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-950 border-b border-sage-100 pb-2">
          2. Field Observation & Campus Habitat
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Campus Sighting Location
            </label>
            <input
              type="text"
              value={formData.campus_location || ''}
              onChange={(e) => setFormData({ ...formData, campus_location: e.target.value })}
              placeholder="e.g. Central Lawn, Orchard, Science Block Quad"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Activity Pattern (Circadian Rhythm)
            </label>
            <select
              value={formData.activity_pattern}
              onChange={(e) =>
                setFormData({ ...formData, activity_pattern: e.target.value as ActivityPattern })
              }
              className="w-full p-2.5 rounded-xl border border-sage-300 bg-white text-forest-950 font-medium outline-none capitalize"
            >
              <option value="diurnal">Diurnal (Day active)</option>
              <option value="nocturnal">Nocturnal (Night active)</option>
              <option value="crepuscular">Crepuscular (Dawn / dusk active)</option>
              <option value="cathemeral">Cathemeral (Day & night irregular)</option>
              <option value="variable">Variable</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Microhabitat On Campus
            </label>
            <input
              type="text"
              value={formData.microhabitat || ''}
              onChange={(e) => setFormData({ ...formData, microhabitat: e.target.value })}
              placeholder="e.g. Neem tree canopy, flowering hedge, wet mud tap"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Seasonal Occurrence / Migration
            </label>
            <input
              type="text"
              value={formData.seasonal_occurrence || ''}
              onChange={(e) => setFormData({ ...formData, seasonal_occurrence: e.target.value })}
              placeholder="e.g. Year-round resident, Monsoon visitor"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Distinguishing Field Characteristics & Marks
            </label>
            <textarea
              rows={3}
              value={formData.identification_notes || ''}
              onChange={(e) => setFormData({ ...formData, identification_notes: e.target.value })}
              placeholder="Describe physical field cues: crest, wing spots, tail stripes, flight style, vocalizations..."
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Biology & Behaviour */}
      <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-950 border-b border-sage-100 pb-2">
          3. Biology, Diet & Campus Ecology
        </h3>

        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
                Physical Description (Size & Plumage/Fur/Scales)
              </label>
              <textarea
                rows={2}
                value={formData.physical_description || ''}
                onChange={(e) => setFormData({ ...formData, physical_description: e.target.value })}
                placeholder="Dimensions, body form, coloring, sexual dimorphism..."
                className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
                Diet & Feeding Behaviour
              </label>
              <textarea
                rows={2}
                value={formData.diet_and_feeding || ''}
                onChange={(e) => setFormData({ ...formData, diet_and_feeding: e.target.value })}
                placeholder="Herbivore, insectivore, frugivore, nectar feeding..."
                className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
                Behaviour & Distinctive Adaptations
              </label>
              <textarea
                rows={2}
                value={formData.behaviour_and_adaptations || ''}
                onChange={(e) =>
                  setFormData({ ...formData, behaviour_and_adaptations: e.target.value })
                }
                placeholder="Territorial displays, climbing, mimicry, alarm calls..."
                className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
                Ecological Role & Food Web Position
              </label>
              <textarea
                rows={2}
                value={formData.ecological_role || ''}
                onChange={(e) => setFormData({ ...formData, ecological_role: e.target.value })}
                placeholder="Seed dispersal, pollination, insect population control..."
                className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-forest-800 mb-1">
              Relationship with Campus Flora (Host Plants, Nectar Trees)
            </label>
            <input
              type="text"
              value={formData.relationship_with_flora || ''}
              onChange={(e) => setFormData({ ...formData, relationship_with_flora: e.target.value })}
              placeholder="e.g. Larval host plant is Curry leaf; drinks nectar from Gulmohar blossoms"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 5: Student Safety & Ethical Guidelines */}
      <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-950 border-b border-sage-100 pb-2">
          4. Student Safety & Human-Wildlife Guidance
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-amber-800 mb-1">
              Safety Guidance for Students *
            </label>
            <textarea
              rows={2}
              value={formData.safety_guidance || ''}
              onChange={(e) => setFormData({ ...formData, safety_guidance: e.target.value })}
              placeholder="e.g. Harmless songbird; do not disturb nesting bushes or touch fledglings..."
              className="w-full p-2.5 rounded-xl border border-amber-300 bg-amber-50/50 text-forest-950 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Recommended Observation Distance
            </label>
            <input
              type="text"
              value={formData.observation_distance || ''}
              onChange={(e) => setFormData({ ...formData, observation_distance: e.target.value })}
              placeholder="e.g. Observe from 3-5 metres with binoculars"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Conservation Status (IUCN / WPA)
            </label>
            <input
              type="text"
              value={formData.conservation_status || ''}
              onChange={(e) => setFormData({ ...formData, conservation_status: e.target.value })}
              placeholder="e.g. Least Concern (IUCN)"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Featured Naturalist Fact (For Children)
            </label>
            <input
              type="text"
              value={formData.featured_fact || ''}
              onChange={(e) => setFormData({ ...formData, featured_fact: e.target.value })}
              placeholder="Highlight for cards & posters..."
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 6: Photographs Management */}
      <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-950 border-b border-sage-100 pb-2 flex items-center justify-between">
          <span>5. Photographic Documentation</span>
          <span className="text-xs font-normal text-sage-500">
            {formData.photos?.length || 0} photo(s)
          </span>
        </h3>

        {formData.photos && formData.photos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {formData.photos.map((photo) => (
              <div
                key={photo.id}
                className="border border-sage-200 rounded-xl overflow-hidden relative group bg-sage-50 text-xs"
              >
                <div className="aspect-[4/3] bg-sage-200 relative">
                  <img src={photo.public_url} alt="" className="w-full h-full object-cover" />
                  {photo.is_primary && (
                    <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      Primary Cover
                    </span>
                  )}
                </div>
                <div className="p-3 space-y-1">
                  <p className="font-medium text-forest-950 truncate">
                    {photo.caption || 'No caption'}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-sage-200">
                    {!photo.is_primary && (
                      <button
                        type="button"
                        onClick={() => setPrimaryPhoto(photo.id)}
                        className="text-[11px] text-forest-700 hover:underline font-semibold"
                      >
                        Make Primary
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="text-[11px] text-red-600 hover:underline font-semibold ml-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-sage-50/70 p-4 rounded-xl border border-dashed border-sage-300 space-y-3 text-xs">
          <span className="font-semibold text-forest-900 block">
            Attach Wildlife Photograph
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="url"
              value={photoUrlInput}
              onChange={(e) => setPhotoUrlInput(e.target.value)}
              placeholder="Image URL (e.g. /images/fauna/bulbul.jpg)"
              className="sm:col-span-2 p-2 rounded-lg border border-sage-300 text-forest-950 outline-none"
            />
            <input
              type="text"
              value={photoCaptionInput}
              onChange={(e) => setPhotoCaptionInput(e.target.value)}
              placeholder="Caption (e.g. Perched on hedge)"
              className="p-2 rounded-lg border border-sage-300 text-forest-950 outline-none"
            />
          </div>
          <button
            type="button"
            onClick={addPhoto}
            className="px-4 py-2 bg-forest-800 text-white rounded-lg text-xs font-semibold hover:bg-forest-900 inline-flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Attach Photograph</span>
          </button>
        </div>
      </div>

      {/* Section 7: References & Citations */}
      <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-950 border-b border-sage-100 pb-2 flex items-center justify-between">
          <span>6. Scientific References & Field Literature</span>
          <span className="text-xs font-normal text-sage-500">
            {formData.sources?.length || 0} source(s)
          </span>
        </h3>

        {formData.sources && formData.sources.length > 0 && (
          <ul className="space-y-2 text-xs divide-y divide-sage-100">
            {formData.sources.map((src) => (
              <li key={src.id} className="pt-2 flex items-start justify-between">
                <div>
                  <span className="font-semibold text-forest-900">{src.title}</span>
                  {src.author && <span className="text-sage-600 ml-2">by {src.author}</span>}
                  {src.notes && <p className="text-sage-700 text-[11px] mt-0.5">{src.notes}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => removeSource(src.id)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="bg-sage-50/70 p-4 rounded-xl border border-dashed border-sage-300 space-y-3 text-xs">
          <span className="font-semibold text-forest-900 block">Add Reference Source</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={sourceTitleInput}
              onChange={(e) => setSourceTitleInput(e.target.value)}
              placeholder="Title (e.g. Salim Ali: Book of Indian Birds)"
              className="p-2 rounded-lg border border-sage-300 text-forest-950 outline-none"
            />
            <input
              type="text"
              value={sourceAuthorInput}
              onChange={(e) => setSourceAuthorInput(e.target.value)}
              placeholder="Author / Institution"
              className="p-2 rounded-lg border border-sage-300 text-forest-950 outline-none"
            />
            <input
              type="url"
              value={sourceUrlInput}
              onChange={(e) => setSourceUrlInput(e.target.value)}
              placeholder="Reference URL (e.g. https://ebird.org/...)"
              className="sm:col-span-2 p-2 rounded-lg border border-sage-300 text-forest-950 outline-none"
            />
          </div>
          <button
            type="button"
            onClick={addSource}
            className="px-4 py-2 bg-sage-200 text-forest-900 rounded-lg text-xs font-semibold hover:bg-sage-300 inline-flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Citation</span>
          </button>
        </div>
      </div>
    </form>
  );
}
