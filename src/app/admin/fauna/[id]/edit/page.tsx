'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Fauna } from '@/types/fauna';
import { getFaunaById } from '@/lib/faunaRepo';
import FaunaForm from '@/components/admin/FaunaForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditFaunaPage() {
  const params = useParams();
  const id = params.id as string;
  const [fauna, setFauna] = useState<Fauna | null | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const found = getFaunaById(id);
      setFauna(found || null);
    }
  }, [id]);

  if (fauna === undefined) {
    return (
      <div className="py-12 text-center text-sage-600 text-sm">
        Loading wildlife record for editing...
      </div>
    );
  }

  if (fauna === null) {
    return (
      <div className="py-12 text-center space-y-4">
        <h2 className="font-serif text-xl font-bold text-forest-950">Fauna Record Not Found</h2>
        <p className="text-xs text-sage-600">The requested animal record could not be found.</p>
        <Link
          href="/admin/fauna"
          className="inline-flex items-center space-x-1 text-xs font-semibold text-forest-800 underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Fauna Records</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <FaunaForm initialFauna={fauna} isEditing={true} />
    </div>
  );
}
