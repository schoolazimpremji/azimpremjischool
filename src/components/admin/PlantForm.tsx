'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plant,
  PlantCategory,
  PlantStatus,
  ConfidenceLevel,
  PlantPhoto,
  PlantSource
} from '@/types/plant';
import { savePlant } from '@/lib/plantsRepo';
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
  Check
} from 'lucide-react';
import Link from 'next/link';

interface PlantFormProps {
  initialPlant?: Plant;
  isEditing?: boolean;
}

export default function PlantForm({ initialPlant, isEditing = false }: PlantFormProps) {
  const router = useRouter();

  // Helper for slug generation
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const [formData, setFormData] = useState<Partial<Plant>>({
    id: initialPlant?.id || `plant-${Date.now()}`,
    slug: initialPlant?.slug || '',
    common_name: initialPlant?.common_name || '',
    other_common_names: initialPlant?.other_common_names || [],
    scientific_name: initialPlant?.scientific_name || '',
    family: initialPlant?.family || '',
    category: initialPlant?.category || 'tree',
    identification_characteristics: initialPlant?.identification_characteristics || '',
    identification_confidence: initialPlant?.identification_confidence || 'uncertain',
    native_origin: initialPlant?.native_origin || '',
    distribution: initialPlant?.distribution || '',
    campus_location: initialPlant?.campus_location || '',
    flowers: initialPlant?.flowers || '',
    flowering_season: initialPlant?.flowering_season || '',
    fruits: initialPlant?.fruits || '',
    fruiting_season: initialPlant?.fruiting_season || '',
    uses: initialPlant?.uses || '',
    ecological_importance: initialPlant?.ecological_importance || '',
    cultural_significance: initialPlant?.cultural_significance || '',
    traditional_medicinal_uses: initialPlant?.traditional_medicinal_uses || '',
    safety_warnings: initialPlant?.safety_warnings || '',
    interesting_facts: initialPlant?.interesting_facts || '',
    video_links: initialPlant?.video_links || [],
    status: initialPlant?.status || 'draft',
    photos: initialPlant?.photos || [],
    sources: initialPlant?.sources || [],
  });

  // State for adding other common names
  const [otherNameInput, setOtherNameInput] = useState('');

  // State for new photo
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [photoCaptionInput, setPhotoCaptionInput] = useState('');
  const [photoAltInput, setPhotoAltInput] = useState('');

  // State for new source
  const [sourceTitleInput, setSourceTitleInput] = useState('');
  const [sourceAuthorInput, setSourceAuthorInput] = useState('');
  const [sourceUrlInput, setSourceUrlInput] = useState('');
  const [sourceNotesInput, setSourceNotesInput] = useState('');

  // Auto-slug generator on common name blur
  const handleCommonNameBlur = () => {
    if (!formData.slug && formData.common_name) {
      setFormData((prev) => ({
        ...prev,
        slug: slugify(formData.common_name || ''),
      }));
    }
  };

  // Add / remove other common names
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

  // Add / remove photo
  const addPhoto = () => {
    if (photoUrlInput.trim()) {
      const newPhoto: PlantPhoto = {
        id: `photo-${Date.now()}`,
        storage_path: `plants/${formData.slug || 'misc'}/${Date.now()}.jpg`,
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

  // Add / remove source
  const addSource = () => {
    if (sourceTitleInput.trim()) {
      const newSource: PlantSource = {
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

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.common_name?.trim()) {
      alert('Please enter a common name for the plant.');
      return;
    }

    const finalSlug = formData.slug?.trim() || slugify(formData.common_name);

    const plantToSave: Plant = {
      ...(formData as Plant),
      id: formData.id || `plant-${Date.now()}`,
      slug: finalSlug,
      common_name: formData.common_name.trim(),
      other_common_names: formData.other_common_names || [],
      scientific_name: formData.scientific_name?.trim() || null,
      family: formData.family?.trim() || undefined,
      category: formData.category || 'other',
      identification_confidence: formData.identification_confidence || 'uncertain',
      status: formData.status || 'draft',
      created_at: initialPlant?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      photos: formData.photos || [],
      sources: formData.sources || [],
    };

    savePlant(plantToSave);
    router.push('/admin/plants');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      {/* Top Header & Save Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sage-200 pb-5">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/plants"
            className="p-2 rounded-lg text-sage-600 hover:text-forest-900 hover:bg-sage-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              {isEditing ? `Edit: ${initialPlant?.common_name}` : 'New Plant Field Entry'}
            </h1>
            <p className="text-xs text-sage-600">
              Complete individual plant record based on campus observations and research notes.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/plants"
            className="px-4 py-2 rounded-xl border border-sage-300 text-sage-700 hover:bg-sage-100 font-semibold text-xs"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-5 py-2 rounded-xl bg-forest-800 text-white font-semibold text-xs hover:bg-forest-900 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Record</span>
          </button>
        </div>
      </div>

      {/* Section 1: Publication Status & Scientific Confidence */}
      <div className="bg-amber-50/60 rounded-2xl p-6 border border-amber-200/80 space-y-4">
        <div className="flex items-center space-x-2 text-forest-900 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-forest-700" />
          <span>Curator Governance & Publishing Workflow</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Publication Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as PlantStatus })}
              className="w-full p-2.5 rounded-xl border border-sage-300 bg-white text-forest-950 font-medium outline-none"
            >
              <option value="draft">Draft (Quarantined, internal entry)</option>
              <option value="review">Under Review (Awaiting faculty verification)</option>
              <option value="published">Published (Visible on public field guide)</option>
              <option value="archived">Archived (Retained for historical records)</option>
            </select>
            <p className="text-[11px] text-sage-600 mt-1">
              * Only "Published" records appear on the public website.
            </p>
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
              <option value="confirmed">Confirmed (Expert/Field guide verified)</option>
              <option value="probable">Probable (High certainty)</option>
              <option value="uncertain">Uncertain (Field inquiry ongoing)</option>
              <option value="unidentified">Unidentified (Unknown species)</option>
            </select>
            <p className="text-[11px] text-sage-600 mt-1">
              Keep uncertain plant identifications in draft or review until verified.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Botanical Nomenclature & Classification */}
      <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-950 border-b border-sage-100 pb-2">
          1. Botanical Taxonomy & Names
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
              placeholder="e.g. Gulmohar, Neem, Sadabahar"
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
              placeholder="e.g. Delonix regia (leave blank if uncertain)"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 italic outline-none"
            />
            <p className="text-[10px] text-sage-500 mt-1">
              Nullable so unconfirmed identifications can be documented honestly.
            </p>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Botanical Family
            </label>
            <input
              type="text"
              value={formData.family || ''}
              onChange={(e) => setFormData({ ...formData, family: e.target.value })}
              placeholder="e.g. Fabaceae, Meliaceae, Apocynaceae"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Plant Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as PlantCategory })
              }
              className="w-full p-2.5 rounded-xl border border-sage-300 bg-white text-forest-950 font-medium outline-none capitalize"
            >
              <option value="tree">Tree</option>
              <option value="shrub">Shrub</option>
              <option value="herb">Herb</option>
              <option value="climber">Climber</option>
              <option value="creeper">Creeper</option>
              <option value="flowering plant">Flowering Plant</option>
              <option value="grass">Grass</option>
              <option value="fern">Fern</option>
              <option value="aquatic">Aquatic</option>
              <option value="succulent">Succulent</option>
              <option value="palm">Palm</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
              placeholder="e.g. gulmohar-delonix-regia"
              className="w-full p-2.5 rounded-xl border border-sage-300 font-mono text-xs text-forest-950 outline-none"
            />
          </div>

          {/* Other common names tag editor */}
          <div className="sm:col-span-2 space-y-2">
            <label className="block font-semibold uppercase tracking-wider text-sage-700">
              Other Common & Regional Vernacular Names
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
                placeholder="e.g. Royal Poinciana, Krishnachura (press Enter or Add)"
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

      {/* Section 3: Field Identification & Location */}
      <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-950 border-b border-sage-100 pb-2">
          2. Field Identification & Campus Location
        </h3>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Identification Characteristics (Foliage, Bark, Habit)
            </label>
            <textarea
              rows={3}
              value={formData.identification_characteristics || ''}
              onChange={(e) =>
                setFormData({ ...formData, identification_characteristics: e.target.value })
              }
              placeholder="Describe physical features: leaf shape, venation, bark texture, branching pattern, spines..."
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
                Campus Location
              </label>
              <input
                type="text"
                value={formData.campus_location || ''}
                onChange={(e) => setFormData({ ...formData, campus_location: e.target.value })}
                placeholder="e.g. Senior Wing Courtyard, Eco-Pond"
                className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
                Native Origin
              </label>
              <input
                type="text"
                value={formData.native_origin || ''}
                onChange={(e) => setFormData({ ...formData, native_origin: e.target.value })}
                placeholder="e.g. Indian Subcontinent, Madagascar"
                className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
                Geographic Distribution
              </label>
              <input
                type="text"
                value={formData.distribution || ''}
                onChange={(e) => setFormData({ ...formData, distribution: e.target.value })}
                placeholder="e.g. Peninsular India, Dry deciduous belts"
                className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Phenology (Flowers & Fruits) */}
      <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-950 border-b border-sage-100 pb-2">
          3. Phenology: Flowers, Fruits & Seasons
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Flowers Description
            </label>
            <textarea
              rows={2}
              value={formData.flowers || ''}
              onChange={(e) => setFormData({ ...formData, flowers: e.target.value })}
              placeholder="Color, petal count, fragrance, inflorescence structure..."
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Flowering Season
            </label>
            <input
              type="text"
              value={formData.flowering_season || ''}
              onChange={(e) => setFormData({ ...formData, flowering_season: e.target.value })}
              placeholder="e.g. March – May, Year-round"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Fruits & Seeds Description
            </label>
            <textarea
              rows={2}
              value={formData.fruits || ''}
              onChange={(e) => setFormData({ ...formData, fruits: e.target.value })}
              placeholder="Pod, berry, drupe, seed dispersal mechanism..."
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Fruiting Season
            </label>
            <input
              type="text"
              value={formData.fruiting_season || ''}
              onChange={(e) => setFormData({ ...formData, fruiting_season: e.target.value })}
              placeholder="e.g. July – October"
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 5: Significance, Ethnobotany & Warnings */}
      <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-950 border-b border-sage-100 pb-2">
          4. Ecology, Cultural Value & Safety Warnings
        </h3>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Ecological Importance (Pollinators, Birds, Soil)
            </label>
            <textarea
              rows={2}
              value={formData.ecological_importance || ''}
              onChange={(e) => setFormData({ ...formData, ecological_importance: e.target.value })}
              placeholder="Nectar source, caterpillar host, bird nesting, microclimate cooling..."
              className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
                Cultural Significance
              </label>
              <textarea
                rows={2}
                value={formData.cultural_significance || ''}
                onChange={(e) =>
                  setFormData({ ...formData, cultural_significance: e.target.value })
                }
                placeholder="Festivals, symbolism, historical presence in Indian literature..."
                className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
                Traditional / Medicinal Uses
              </label>
              <textarea
                rows={2}
                value={formData.traditional_medicinal_uses || ''}
                onChange={(e) =>
                  setFormData({ ...formData, traditional_medicinal_uses: e.target.value })
                }
                placeholder="Ayurveda, folk herbalism documentation..."
                className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
                Practical Uses
              </label>
              <textarea
                rows={2}
                value={formData.uses || ''}
                onChange={(e) => setFormData({ ...formData, uses: e.target.value })}
                placeholder="Shade, hedge, timber, soil conservation..."
                className="w-full p-2.5 rounded-xl border border-sage-300 text-forest-950 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-amber-800 mb-1">
                Safety Warnings & Cautions
              </label>
              <textarea
                rows={2}
                value={formData.safety_warnings || ''}
                onChange={(e) => setFormData({ ...formData, safety_warnings: e.target.value })}
                placeholder="Toxic parts, latex irritants, allergen hazards..."
                className="w-full p-2.5 rounded-xl border border-amber-300 bg-amber-50/50 text-forest-950 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Interesting Facts (For Students)
            </label>
            <textarea
              rows={2}
              value={formData.interesting_facts || ''}
              onChange={(e) => setFormData({ ...formData, interesting_facts: e.target.value })}
              placeholder="Fun botanical trivia, unique adaptations..."
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

        {/* Existing photos preview list */}
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

        {/* Add photo sub-form */}
        <div className="bg-sage-50/70 p-4 rounded-xl border border-dashed border-sage-300 space-y-3 text-xs">
          <span className="font-semibold text-forest-900 block">
            Add Image (URL or Stored Asset)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="url"
              value={photoUrlInput}
              onChange={(e) => setPhotoUrlInput(e.target.value)}
              placeholder="Image URL (e.g. https://...)"
              className="sm:col-span-2 p-2 rounded-lg border border-sage-300 text-forest-950 outline-none"
            />
            <input
              type="text"
              value={photoCaptionInput}
              onChange={(e) => setPhotoCaptionInput(e.target.value)}
              placeholder="Caption (e.g. Canopy in May)"
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

      {/* Section 7: Citations & Sources */}
      <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-forest-950 border-b border-sage-100 pb-2 flex items-center justify-between">
          <span>6. Botanical References & Literature Sources</span>
          <span className="text-xs font-normal text-sage-500">
            {formData.sources?.length || 0} source(s)
          </span>
        </h3>

        {/* Existing sources list */}
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

        {/* Add source sub-form */}
        <div className="bg-sage-50/70 p-4 rounded-xl border border-dashed border-sage-300 space-y-3 text-xs">
          <span className="font-semibold text-forest-900 block">Add Reference Source</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={sourceTitleInput}
              onChange={(e) => setSourceTitleInput(e.target.value)}
              placeholder="Title (e.g. Trees of Delhi / Flora of India)"
              className="p-2 rounded-lg border border-sage-300 text-forest-950 outline-none"
            />
            <input
              type="text"
              value={sourceAuthorInput}
              onChange={(e) => setSourceAuthorInput(e.target.value)}
              placeholder="Author (e.g. Pradip Krishen)"
              className="p-2 rounded-lg border border-sage-300 text-forest-950 outline-none"
            />
            <input
              type="url"
              value={sourceUrlInput}
              onChange={(e) => setSourceUrlInput(e.target.value)}
              placeholder="Reference Web Link (optional)"
              className="p-2 rounded-lg border border-sage-300 text-forest-950 outline-none"
            />
            <input
              type="text"
              value={sourceNotesInput}
              onChange={(e) => setSourceNotesInput(e.target.value)}
              placeholder="Notes or page numbers"
              className="p-2 rounded-lg border border-sage-300 text-forest-950 outline-none"
            />
          </div>
          <button
            type="button"
            onClick={addSource}
            className="px-4 py-2 bg-forest-800 text-white rounded-lg text-xs font-semibold hover:bg-forest-900 inline-flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Source Citation</span>
          </button>
        </div>
      </div>

      {/* Bottom Save Action Bar */}
      <div className="pt-4 flex items-center justify-end space-x-3">
        <Link
          href="/admin/plants"
          className="px-5 py-2.5 rounded-xl border border-sage-300 text-sage-700 hover:bg-sage-100 font-semibold text-xs"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-forest-800 text-white font-semibold text-xs hover:bg-forest-900 shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>Save Plant Record</span>
        </button>
      </div>
    </form>
  );
}
