'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Fauna } from '@/types/fauna';
import { getFaunaBySlug } from '@/lib/faunaRepo';
import { ConfidenceBadge } from '@/components/ui/Badges';
import {
  ArrowLeft,
  MapPin,
  Clock,
  AlertTriangle,
  BookOpen,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Sun,
  Moon,
  Sunrise,
  Layers,
  HeartHandshake,
  Feather,
  Eye,
  Info
} from 'lucide-react';

export default function FaunaDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [fauna, setFauna] = useState<Fauna | null | undefined>(undefined);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    if (slug) {
      const found = getFaunaBySlug(slug);
      setFauna(found || null);
    }
  }, [slug]);

  if (fauna === undefined) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-sage-600">
        Loading campus wildlife dossier...
      </div>
    );
  }

  if (fauna === null) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-forest-950">Species Not Found</h2>
        <p className="text-sm text-sage-700">
          We could not locate this animal record in the campus fauna registry.
        </p>
        <Link
          href="/fauna"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-forest-800 text-white rounded-lg text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Fauna Directory</span>
        </Link>
      </div>
    );
  }

  const photos = fauna.photos && fauna.photos.length > 0 ? fauna.photos : [];
  const currentPhoto = photos[selectedPhotoIndex];

  const renderActivityTag = () => {
    if (!fauna.activity_pattern) return null;
    switch (fauna.activity_pattern) {
      case 'diurnal':
        return (
          <div className="flex items-start space-x-2">
            <Sun className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-forest-950 block">Activity Rhythm</span>
              <span className="text-sage-700 capitalize">{fauna.activity_pattern} (Day-active)</span>
            </div>
          </div>
        );
      case 'nocturnal':
        return (
          <div className="flex items-start space-x-2">
            <Moon className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-forest-950 block">Activity Rhythm</span>
              <span className="text-sage-700 capitalize">{fauna.activity_pattern} (Night-active)</span>
            </div>
          </div>
        );
      case 'crepuscular':
        return (
          <div className="flex items-start space-x-2">
            <Sunrise className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-forest-950 block">Activity Rhythm</span>
              <span className="text-sage-700 capitalize">{fauna.activity_pattern} (Dawn & Dusk)</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/fauna"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-forest-700 hover:text-forest-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Wildlife Field Guide</span>
        </Link>

        <ConfidenceBadge confidence={fauna.identification_confidence} />
      </div>

      {/* Hero Header: Title, Names, Taxonomy & Photographs */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sage-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-sage-100 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="capitalize px-3 py-1 text-xs font-semibold rounded-full bg-forest-100 text-forest-800 border border-forest-200">
                {fauna.category}
              </span>
              {fauna.family && (
                <span className="text-xs font-medium text-sage-600">
                  Family: <strong className="text-forest-900">{fauna.family}</strong>
                </span>
              )}
              {fauna.conservation_status && (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {fauna.conservation_status}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950">
              {fauna.common_name}
            </h1>

            {fauna.scientific_name ? (
              <p className="font-serif italic text-xl sm:text-2xl text-forest-800">
                {fauna.scientific_name}{' '}
                {fauna.scientific_authority && (
                  <span className="text-xs font-sans not-italic text-sage-600 font-normal">
                    {fauna.scientific_authority}
                  </span>
                )}
              </p>
            ) : (
              <p className="text-sm italic text-amber-800 bg-amber-50 px-3 py-1 rounded-md inline-block">
                Scientific binomial pending verification
              </p>
            )}

            {fauna.other_common_names && fauna.other_common_names.length > 0 && (
              <p className="text-xs text-sage-600 pt-1">
                Also known as: <span className="text-sage-800 font-medium">{fauna.other_common_names.join(', ')}</span>
              </p>
            )}
          </div>

          {/* Quick campus metadata badge box */}
          <div className="bg-sage-50/80 rounded-2xl p-4 border border-sage-200 text-xs space-y-2.5 min-w-[240px]">
            {fauna.campus_location && (
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-forest-950 block">Campus Sighting</span>
                  <span className="text-sage-700">{fauna.campus_location}</span>
                </div>
              </div>
            )}

            {renderActivityTag()}

            {fauna.seasonal_occurrence && (
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-forest-950 block">Seasonal Occurrence</span>
                  <span className="text-sage-700">{fauna.seasonal_occurrence}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Photographic Gallery */}
        {photos.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-wider text-forest-700">
              Photographic Wildlife Record
            </h3>
            <div className="relative rounded-2xl overflow-hidden bg-forest-950 aspect-[16/9] max-h-[480px]">
              <img
                src={currentPhoto?.public_url}
                alt={currentPhoto?.alt_text || fauna.common_name}
                className="w-full h-full object-contain"
              />
              {currentPhoto?.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-md text-white text-xs px-4 py-2.5">
                  <span className="font-medium">{currentPhoto.caption}</span>
                </div>
              )}
            </div>

            {/* Thumbnail switcher */}
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
            No wildlife photographs currently cataloged for this specimen. Field documentation in progress.
          </div>
        )}
      </div>

      {/* Main Two-Column Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Biology, Behaviour, Adaptations & Ecology (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Distinguishing Characteristics & Identification */}
          {fauna.identification_notes && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-sage-200 shadow-sm space-y-3">
              <h2 className="font-serif text-xl font-bold text-forest-950 flex items-center space-x-2">
                <Eye className="w-5 h-5 text-forest-600" />
                <span>Field Identification & Distinguishing Marks</span>
              </h2>
              <p className="text-sage-800 leading-relaxed text-sm whitespace-pre-line">
                {fauna.identification_notes}
              </p>
            </section>
          )}

          {/* Biology: Diet & Feeding */}
          {(fauna.physical_description || fauna.diet_and_feeding) && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-sage-200 shadow-sm space-y-4">
              <h2 className="font-serif text-xl font-bold text-forest-950 flex items-center space-x-2">
                <Feather className="w-5 h-5 text-forest-600" />
                <span>Physical Traits & Foraging Biology</span>
              </h2>

              {fauna.physical_description && (
                <div className="space-y-1">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-sage-600">Physical Morphology</h4>
                  <p className="text-sm text-sage-800 leading-relaxed">{fauna.physical_description}</p>
                </div>
              )}

              {fauna.diet_and_feeding && (
                <div className="space-y-1 pt-2">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-sage-600">Diet & Feeding Behaviour</h4>
                  <p className="text-sm text-sage-800 leading-relaxed">{fauna.diet_and_feeding}</p>
                </div>
              )}
            </section>
          )}

          {/* Behaviour & Distinctive Adaptations */}
          {(fauna.behaviour_and_adaptations || fauna.reproduction_breeding || fauna.life_cycle) && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-sage-200 shadow-sm space-y-4">
              <h2 className="font-serif text-xl font-bold text-forest-950 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-forest-600" />
                <span>Behaviour, Breeding & Life Cycle</span>
              </h2>

              {fauna.behaviour_and_adaptations && (
                <div className="space-y-1">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-sage-600">Ethology & Adaptations</h4>
                  <p className="text-sm text-sage-800 leading-relaxed">{fauna.behaviour_and_adaptations}</p>
                </div>
              )}

              {fauna.reproduction_breeding && (
                <div className="space-y-1 pt-2">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-sage-600">Nesting & Breeding Habits</h4>
                  <p className="text-sm text-sage-800 leading-relaxed">{fauna.reproduction_breeding}</p>
                </div>
              )}

              {fauna.life_cycle && (
                <div className="space-y-1 pt-2">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-sage-600">Life History & Metamorphosis</h4>
                  <p className="text-sm text-sage-800 leading-relaxed">{fauna.life_cycle}</p>
                </div>
              )}
            </section>
          )}

          {/* Ecological Role & Relationship with Flora */}
          {(fauna.ecological_role || fauna.relationship_with_flora) && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-sage-200 shadow-sm space-y-4">
              <h2 className="font-serif text-xl font-bold text-forest-950 flex items-center space-x-2">
                <HeartHandshake className="w-5 h-5 text-forest-600" />
                <span>Campus Ecosystem & Plant-Animal Interactions</span>
              </h2>

              {fauna.ecological_role && (
                <div className="space-y-1">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-sage-600">Niche in Campus Food Web</h4>
                  <p className="text-sm text-sage-800 leading-relaxed">{fauna.ecological_role}</p>
                </div>
              )}

              {fauna.relationship_with_flora && (
                <div className="space-y-1 pt-2">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-forest-700">Symbiosis with Campus Flora</h4>
                  <p className="text-sm text-sage-800 leading-relaxed">{fauna.relationship_with_flora}</p>
                </div>
              )}
            </section>
          )}

          {/* Featured Educational Fact */}
          {(fauna.featured_fact || fauna.interesting_facts) && (
            <section className="bg-ochre-50/70 rounded-2xl p-6 sm:p-8 border border-ochre-200 space-y-3">
              <h3 className="font-serif text-lg font-bold text-ochre-900 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-ochre-600" />
                <span>Field Naturalist Discovery Note</span>
              </h3>
              {fauna.featured_fact && (
                <p className="text-sm font-semibold text-ochre-950 leading-relaxed">
                  {fauna.featured_fact}
                </p>
              )}
              {fauna.interesting_facts && (
                <p className="text-xs text-ochre-900 leading-relaxed pt-1">
                  {fauna.interesting_facts}
                </p>
              )}
            </section>
          )}
        </div>

        {/* Right Column: Safety, Human-Wildlife Interactions, Conservation & References (1 col) */}
        <div className="space-y-6">
          {/* Campus Safety & Ethical Observation Guidance */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-300 space-y-3">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Campus Observation Safety Guide</span>
            </div>
            {fauna.safety_guidance && (
              <p className="text-xs text-amber-950 leading-relaxed">
                {fauna.safety_guidance}
              </p>
            )}
            {fauna.observation_distance && (
              <div className="text-xs bg-amber-100/70 p-2.5 rounded-xl border border-amber-200 text-amber-900 font-medium">
                <strong>Recommended Distance:</strong> {fauna.observation_distance}
              </div>
            )}
            <div className="text-[11px] text-amber-800 pt-1">
              • Do not disturb nesting sites or fledgling animals.<br />
              • Never offer human food or attempt direct physical contact.
            </div>
          </div>

          {/* Habitat & Distribution */}
          <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-forest-950">
              Habitat & Range Context
            </h3>

            {fauna.habitat && (
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-sage-600 uppercase tracking-wider block">Natural Habitat</span>
                <p className="text-sage-800">{fauna.habitat}</p>
              </div>
            )}

            {fauna.microhabitat && (
              <div className="space-y-1 text-xs pt-2 border-t border-sage-100">
                <span className="font-semibold text-sage-600 uppercase tracking-wider block">Campus Microhabitat</span>
                <p className="text-sage-800">{fauna.microhabitat}</p>
              </div>
            )}

            {fauna.geographic_distribution && (
              <div className="space-y-1 text-xs pt-2 border-t border-sage-100">
                <span className="font-semibold text-sage-600 uppercase tracking-wider block">Geographic Distribution</span>
                <p className="text-sage-800">{fauna.geographic_distribution}</p>
              </div>
            )}
          </div>

          {/* Conservation Status & Threats */}
          {(fauna.conservation_status || fauna.ecological_threats) && (
            <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-3 text-xs">
              <h3 className="font-serif font-bold text-base text-forest-950">
                Conservation & Threats
              </h3>

              {fauna.conservation_status && (
                <div className="space-y-0.5">
                  <span className="font-semibold text-sage-600 uppercase tracking-wider block text-[10px]">Assessment</span>
                  <p className="text-emerald-900 font-semibold">{fauna.conservation_status} ({fauna.conservation_assessment_year || 'Recent'})</p>
                </div>
              )}

              {fauna.ecological_threats && (
                <div className="space-y-0.5 pt-2 border-t border-sage-100">
                  <span className="font-semibold text-sage-600 uppercase tracking-wider block text-[10px]">Ecological Pressures</span>
                  <p className="text-sage-800">{fauna.ecological_threats}</p>
                </div>
              )}
            </div>
          )}

          {/* References & Literature */}
          {fauna.sources && fauna.sources.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-forest-950 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-forest-600" />
                <span>Field References</span>
              </h3>

              <ul className="space-y-3 text-xs">
                {fauna.sources.map((src) => (
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

          {/* Record Metadata */}
          <div className="bg-sage-50/50 p-4 rounded-xl border border-sage-200 text-[11px] text-sage-600 space-y-1">
            <p>Fauna Record ID: <span className="font-mono text-sage-800">{fauna.id}</span></p>
            <p>Last Observation Update: {new Date(fauna.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
