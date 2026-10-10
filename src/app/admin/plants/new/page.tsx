'use client';

import React from 'react';
import PlantForm from '@/components/admin/PlantForm';

export default function NewPlantPage() {
  return (
    <div>
      <PlantForm isEditing={false} />
    </div>
  );
}
