'use client';

import React from 'react';
import FaunaForm from '@/components/admin/FaunaForm';

export default function NewFaunaPage() {
  return (
    <div>
      <FaunaForm isEditing={false} />
    </div>
  );
}
