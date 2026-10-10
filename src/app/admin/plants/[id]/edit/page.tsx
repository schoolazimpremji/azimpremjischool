'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Plant } from '@/types/plant';
import { getPlantById } from '@/lib/plantsRepo';
import PlantForm from '@/components/admin/PlantForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditPlantPage() {
  const params = useParams();
  const id = params.id as string;

  const [plant, setPlant] = useState<Plant | null | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const found = getPlantById(id);
      setPlant(found || null);
    }
  }, [id]);

  if (plant === undefined) {
    return <div className="p-8 text-sage-600 text-sm">Loading specimen record...</div>;
  }

  if (plant === null) {
    return (
      <div className="p-8 space-y-4">
        <h2 className="font-serif text-xl font-bold text-forest-950">Record not found</h2>
        <p className="text-sm text-sage-600">The plant record with ID {id} does not exist.</p>
        <Link
          href="/admin/plants"
          className="inline-flex items-center space-x-2 text-forest-700 underline text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to plant records</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PlantForm initialPlant={plant} isEditing={true} />
    </div>
  );
}
