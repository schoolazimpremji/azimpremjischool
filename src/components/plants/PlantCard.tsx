import React from 'react';
import Link from 'next/link';
import { Plant } from '@/types/plant';
import { ConfidenceBadge } from '@/components/ui/Badges';
import { MapPin, Calendar, Sparkles } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  const primaryPhoto = plant.photos?.find((p) => p.is_primary) || plant.photos?.[0];
  const imageUrl = primaryPhoto?.public_url || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80';

  return (
    <article className="herbarium-card flex flex-col h-full overflow-hidden group">
      {/* Plant Image Container */}
      <Link href={`/explore/${plant.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-sage-100">
        <img
          src={imageUrl}
          alt={primaryPhoto?.alt_text || plant.common_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Category Badge Top Left */}
        <div className="absolute top-3 left-3">
          <span className="capitalize px-2.5 py-1 text-xs font-semibold rounded-full bg-forest-900/80 backdrop-blur-md text-white border border-forest-600/40">
            {plant.category}
          </span>
        </div>

        {/* Floating Confidence Badge Top Right */}
        <div className="absolute top-3 right-3">
          <ConfidenceBadge confidence={plant.identification_confidence} className="shadow-sm backdrop-blur-md" />
        </div>

        {/* Bottom image overlay metadata */}
        {plant.campus_location && (
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center text-xs text-white/95 font-medium truncate">
            <MapPin className="w-3.5 h-3.5 mr-1 text-ochre-300 flex-shrink-0" />
            <span className="truncate">{plant.campus_location}</span>
          </div>
        )}
      </Link>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          {/* Botanical Nomenclature */}
          <Link href={`/explore/${plant.slug}`}>
            <h3 className="font-serif font-bold text-xl text-forest-950 group-hover:text-forest-700 transition-colors">
              {plant.common_name}
            </h3>
          </Link>

          {plant.scientific_name ? (
            <p className="text-sm italic font-serif text-forest-800 font-medium mt-0.5">
              {plant.scientific_name}
            </p>
          ) : (
            <p className="text-xs text-amber-800 italic mt-0.5 flex items-center">
              <span>Scientific name pending verification</span>
            </p>
          )}

          {plant.family && (
            <p className="text-xs text-sage-600 font-medium uppercase tracking-wider mt-1">
              Family: {plant.family}
            </p>
          )}

          {/* Identification Characteristics Snippet */}
          {plant.identification_characteristics && (
            <p className="mt-3 text-sm text-sage-800 line-clamp-2 leading-relaxed">
              {plant.identification_characteristics}
            </p>
          )}
        </div>

        {/* Card Footer Details */}
        <div className="mt-4 pt-3 border-t border-sage-100 flex items-center justify-between text-xs text-sage-600">
          {plant.flowering_season ? (
            <span className="flex items-center" title="Flowering Season">
              <Calendar className="w-3.5 h-3.5 mr-1 text-forest-600" />
              <span className="truncate max-w-[130px]">{plant.flowering_season}</span>
            </span>
          ) : (
            <span>Non-seasonal</span>
          )}

          <Link
            href={`/explore/${plant.slug}`}
            className="font-semibold text-forest-700 group-hover:text-forest-900 group-hover:underline inline-flex items-center space-x-1"
          >
            <span>Read field notes</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
