import React from 'react';
import { Fauna } from '@/types/fauna';
import FaunaCard from './FaunaCard';
import { Compass } from 'lucide-react';

interface FaunaGridProps {
  faunaList: Fauna[];
  emptyMessage?: string;
}

export default function FaunaGrid({
  faunaList,
  emptyMessage = 'No campus wildlife records match your criteria.',
}: FaunaGridProps) {
  if (faunaList.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white/60 rounded-3xl border border-dashed border-sage-300 max-w-xl mx-auto my-8 space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center mx-auto">
          <Compass className="w-6 h-6 text-sage-500" />
        </div>
        <h3 className="font-serif font-bold text-lg text-forest-950">No Fauna Observations Found</h3>
        <p className="text-sm text-sage-600 max-w-sm mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {faunaList.map((fauna) => (
        <FaunaCard key={fauna.id} fauna={fauna} />
      ))}
    </div>
  );
}
