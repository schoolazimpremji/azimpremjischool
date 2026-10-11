import React from 'react';
import Link from 'next/link';
import { Fauna } from '@/types/fauna';
import { ConfidenceBadge } from '@/components/ui/Badges';
import { MapPin, Sun, Moon, Sunrise, Clock, ArrowRight } from 'lucide-react';

interface FaunaCardProps {
  fauna: Fauna;
}

export default function FaunaCard({ fauna }: FaunaCardProps) {
  const primaryPhoto = fauna.photos?.find((p) => p.is_primary) || fauna.photos?.[0];

  const renderActivityIcon = () => {
    switch (fauna.activity_pattern) {
      case 'diurnal':
        return (
          <span className="inline-flex items-center space-x-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200" title="Day active">
            <Sun className="w-3 h-3 text-amber-600" />
            <span>Diurnal</span>
          </span>
        );
      case 'nocturnal':
        return (
          <span className="inline-flex items-center space-x-1 text-[11px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200" title="Night active">
            <Moon className="w-3 h-3 text-indigo-600" />
            <span>Nocturnal</span>
          </span>
        );
      case 'crepuscular':
        return (
          <span className="inline-flex items-center space-x-1 text-[11px] text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200" title="Twilight active (dawn/dusk)">
            <Sunrise className="w-3 h-3 text-orange-600" />
            <span>Crepuscular</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <article className="herbarium-card group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-sage-200 bg-white rounded-2xl">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sage-100">
          {primaryPhoto?.public_url ? (
            <img
              src={primaryPhoto.public_url}
              alt={primaryPhoto.alt_text || fauna.common_name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-xs text-sage-500 bg-sage-50">
              <span className="text-2xl mb-1">🐾</span>
              <span>Photographic record in progress</span>
            </div>
          )}

          {/* Group pill */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg bg-forest-900/85 text-forest-100 backdrop-blur-md shadow-sm">
              {fauna.category}
            </span>
          </div>

          {/* Confidence Badge */}
          <div className="absolute top-3 right-3 shadow-sm">
            <ConfidenceBadge confidence={fauna.identification_confidence} />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-forest-800 transition-colors">
              {fauna.common_name}
            </h3>
            {fauna.scientific_name ? (
              <p className="font-serif italic text-sm text-forest-700">
                {fauna.scientific_name}
              </p>
            ) : (
              <p className="text-xs italic text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block mt-0.5">
                Binomial unconfirmed
              </p>
            )}
          </div>

          {/* Activity & Family */}
          <div className="flex items-center space-x-2 pt-0.5">
            {renderActivityIcon()}
            {fauna.family && (
              <span className="text-[11px] text-sage-600 font-medium">
                Family: <strong className="text-forest-900">{fauna.family}</strong>
              </span>
            )}
          </div>

          {/* Campus Location */}
          {fauna.campus_location && (
            <div className="flex items-start space-x-1.5 text-xs text-sage-600 pt-1">
              <MapPin className="w-3.5 h-3.5 text-forest-600 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{fauna.campus_location}</span>
            </div>
          )}

          {/* Quick biological feature */}
          {fauna.diet_and_feeding && (
            <p className="text-xs text-sage-700 line-clamp-2 leading-relaxed pt-1 border-t border-sage-100">
              <strong className="text-forest-900 font-semibold">Diet:</strong> {fauna.diet_and_feeding}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="px-5 pb-5 pt-1">
        <Link
          href={`/fauna/${fauna.slug}`}
          className="inline-flex w-full items-center justify-between px-3.5 py-2.5 rounded-xl bg-sage-50 text-xs font-semibold text-forest-900 group-hover:bg-forest-800 group-hover:text-white transition-all"
        >
          <span>View Species Dossier</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
