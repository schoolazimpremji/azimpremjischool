'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { Plant, PlantPhoto } from '@/types/plant';
import { getPlantBySlug } from '@/lib/plantsRepo';
import { ConfidenceBadge } from '@/components/ui/Badges';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  AlertTriangle,
  BookOpen,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  HeartHandshake,
  Tag,
  Leaf,
  Layers,
  Flower2,
  Apple
} from 'lucide-react';

export default function PlantDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [plant, setPlant] = useState<Plant | null | undefined>(undefined);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    if (slug) {
      const found = getPlantBySlug(slug);
      setPlant(found || null);
    }
  }, [slug]);

  if (plant === undefined) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-sage-600">
        Loading plant field notes...
      </div>
    );
  }

  if (plant === null) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-forest-950">Specimen Not Found</h2>
        <p className="text-sm text-sage-700">
          We could not locate this plant record in the campus flora registry.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-forest-800 text-white rounded-lg text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Directory</span>
        </Link>
      </div>
    );
  }

  const photos = plant.photos && plant.photos.length > 0 ? plant.photos : [];
  const currentPhoto = photos[selectedPhotoIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/explore"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-forest-700 hover:text-forest-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Field Guide</span>
        </Link>

        <ConfidenceBadge confidence={plant.identification_confidence} />
      </div>

      {/* Hero Header: Title, Names, Taxonomy */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sage-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-sage-100 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="capitalize px-3 py-1 text-xs font-semibold rounded-full bg-forest-100 text-forest-800 border border-forest-200">
                {plant.category}
              </span>
              {plant.family && (
                <span className="text-xs font-medium text-sage-600">
                  Family: <strong className="text-forest-900">{plant.family}</strong>
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950">
              {plant.common_name}
            </h1>

            {plant.scientific_name ? (
              <p className="font-serif italic text-xl sm:text-2xl text-forest-800">
                {plant.scientific_name}
              </p>
            ) : (
              <p className="text-sm italic text-amber-800 bg-amber-50 px-3 py-1 rounded-md inline-block">
                Scientific binomial pending botanical confirmation
              </p>
            )}

            {plant.other_common_names && plant.other_common_names.length > 0 && (
              <p className="text-xs text-sage-600 pt-1">
                Also known as: <span className="text-sage-800 font-medium">{plant.other_common_names.join(', ')}</span>
              </p>
            )}
          </div>

          {/* Quick campus metadata badge box */}
          <div className="bg-sage-50/80 rounded-2xl p-4 border border-sage-200 text-xs space-y-2.5 min-w-[240px]">
            {plant.campus_location && (
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-forest-950 block">Campus Location</span>
                  <span className="text-sage-700">{plant.campus_location}</span>
                </div>
              </div>
            )}

            {plant.flowering_season && (
              <div className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-forest-950 block">Flowering Period</span>
                  <span className="text-sage-700">{plant.flowering_season}</span>
                </div>
              </div>
            )}

            {plant.fruiting_season && (
              <div className="flex items-start space-x-2">
                <Apple className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-forest-950 block">Fruiting Period</span>
                  <span className="text-sage-700">{plant.fruiting_season}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Photographic Evidence Gallery */}
        {photos.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-wider text-forest-700">
              Photographic Herbarium Record
            </h3>
            <div className="relative rounded-2xl overflow-hidden bg-forest-950 aspect-[16/9] max-h-[480px]">
              <img
                src={currentPhoto?.public_url}
                alt={currentPhoto?.alt_text || plant.common_name}
                className="w-full h-full object-contain"
              />
              {currentPhoto?.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-md text-white text-xs px-4 py-2.5">
                  <span className="font-medium">{currentPhoto.caption}</span>
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {photos.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {photos.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      idx === selectedPhotoIndex ? 'border-forest-600 ring-2 ring-forest-200' : 'border-sage-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={p.public_url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center bg-sage-50 rounded-2xl border border-dashed border-sage-300 text-xs text-sage-600">
            No herbarium photos currently cataloged for this specimen. Photo documentation in progress.
          </div>
        )}
      </div>

      {/* Main Two-Column Botanical Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Detailed Field Notes & Morphology (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identification Characteristics */}
          {plant.identification_characteristics && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-sage-200 shadow-sm space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest-950 flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-forest-600" />
                <span>Field Identification Characteristics</span>
              </h2>
              <p className="text-sage-800 leading-relaxed text-sm whitespace-pre-line">
                {plant.identification_characteristics}
              </p>
            </section>
          )}

          {/* Floral & Fruiting Phenology */}
          {(plant.flowers || plant.fruits) && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-sage-200 shadow-sm space-y-4">
              <h2 className="font-serif text-xl font-bold text-forest-950 flex items-center space-x-2">
                <Flower2 className="w-5 h-5 text-forest-600" />
                <span>Flowers & Fruits Phenology</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {plant.flowers && (
                  <div className="bg-sage-50/70 p-4 rounded-xl border border-sage-100 space-y-1">
                    <span className="text-xs uppercase font-bold tracking-wider text-forest-800 block">
                      Floral Structure
                    </span>
                    <p className="text-xs text-sage-800 leading-relaxed">{plant.flowers}</p>
                  </div>
                )}

                {plant.fruits && (
                  <div className="bg-sage-50/70 p-4 rounded-xl border border-sage-100 space-y-1">
                    <span className="text-xs uppercase font-bold tracking-wider text-forest-800 block">
                      Fruiting & Seeds
                    </span>
                    <p className="text-xs text-sage-800 leading-relaxed">{plant.fruits}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Ecological & Environmental Value */}
          {plant.ecological_importance && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-sage-200 shadow-sm space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest-950 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-forest-600" />
                <span>Ecological Role in Campus Food Web</span>
              </h2>
              <p className="text-sage-800 leading-relaxed text-sm">
                {plant.ecological_importance}
              </p>
            </section>
          )}

          {/* Cultural & Ethnobotanical Significance */}
          {(plant.cultural_significance || plant.traditional_medicinal_uses || plant.uses) && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-sage-200 shadow-sm space-y-4">
              <h2 className="font-serif text-xl font-bold text-forest-950 flex items-center space-x-2">
                <HeartHandshake className="w-5 h-5 text-forest-600" />
                <span>Human, Cultural & Traditional Context</span>
              </h2>

              {plant.cultural_significance && (
                <div className="space-y-1">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-sage-600">Cultural Lore</h4>
                  <p className="text-sm text-sage-800 leading-relaxed">{plant.cultural_significance}</p>
                </div>
              )}

              {plant.traditional_medicinal_uses && (
                <div className="space-y-1 pt-2">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-sage-600">Documented Traditional Uses</h4>
                  <p className="text-sm text-sage-800 leading-relaxed">{plant.traditional_medicinal_uses}</p>
                </div>
              )}

              {plant.uses && (
                <div className="space-y-1 pt-2">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-sage-600">Everyday & Practical Uses</h4>
                  <p className="text-sm text-sage-800 leading-relaxed">{plant.uses}</p>
                </div>
              )}
            </section>
          )}

          {/* Interesting Facts */}
          {plant.interesting_facts && (
            <section className="bg-ochre-50/70 rounded-2xl p-6 sm:p-8 border border-ochre-200 space-y-2">
              <h3 className="font-serif text-lg font-bold text-ochre-900 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-ochre-600" />
                <span>Fascinating Botanical Fact</span>
              </h3>
              <p className="text-sm text-ochre-950 leading-relaxed">
                {plant.interesting_facts}
              </p>
            </section>
          )}
        </div>

        {/* Right Column: Geographic Origin, Safety, Sources (1 col) */}
        <div className="space-y-6">
          {/* Safety Warnings Alert */}
          {plant.safety_warnings && (
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-300 space-y-2">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>Campus Safety Advisory</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                {plant.safety_warnings}
              </p>
            </div>
          )}

          {/* Geography & Origin */}
          <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-forest-950">
              Biogeographic Context
            </h3>

            {plant.native_origin && (
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-sage-600 uppercase tracking-wider block">Native Range</span>
                <p className="text-sage-800">{plant.native_origin}</p>
              </div>
            )}

            {plant.distribution && (
              <div className="space-y-1 text-xs pt-2 border-t border-sage-100">
                <span className="font-semibold text-sage-600 uppercase tracking-wider block">Indian Distribution</span>
                <p className="text-sage-800">{plant.distribution}</p>
              </div>
            )}
          </div>

          {/* References & Sources */}
          {plant.sources && plant.sources.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-forest-950 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-forest-600" />
                <span>Field References</span>
              </h3>

              <ul className="space-y-3 text-xs">
                {plant.sources.map((src) => (
                  <li key={src.id} className="border-b border-sage-100 pb-2 last:border-none last:pb-0">
                    <div className="font-semibold text-forest-900">
                      {src.url ? (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-forest-700 inline-flex items-center space-x-1"
                        >
                          <span>{src.title}</span>
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      ) : (
                        src.title
                      )}
                    </div>
                    {src.author && <div className="text-sage-600 italic">Author: {src.author}</div>}
                    {src.notes && <div className="text-sage-700 mt-0.5">{src.notes}</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Field Note Date & Attribution */}
          <div className="bg-sage-50/50 p-4 rounded-xl border border-sage-200 text-[11px] text-sage-600 space-y-1">
            <p>Catalog Record ID: <span className="font-mono text-sage-800">{plant.id}</span></p>
            <p>Last Botanical Revision: {new Date(plant.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
