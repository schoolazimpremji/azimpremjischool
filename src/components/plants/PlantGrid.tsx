import React from 'react';
import { Plant } from '@/types/plant';
import PlantCard from '@/components/plants/PlantCard';
import { Sprout } from 'lucide-react';

interface PlantGridProps {
  plants: Plant[];
  emptyMessage?: string;
}

export default function PlantGrid({
  plants,
  emptyMessage = 'No plant records match your criteria.',
}: PlantGridProps) {
  if (plants.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white/70 rounded-2xl border border-dashed border-sage-300">
        <div className="w-12 h-12 mx-auto rounded-full bg-sage-100 flex items-center justify-center text-sage-600 mb-3">
          <Sprout className="w-6 h-6" />
        </div>
        <h3 className="text-base font-serif font-bold text-forest-900">{emptyMessage}</h3>
        <p className="text-sm text-sage-600 mt-1 max-w-sm mx-auto">
          Try clearing your search query or selecting a different category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
}
