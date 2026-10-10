'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plant } from '@/types/plant';
import { getLocalPlants } from '@/lib/plantsRepo';
import {
  FolderTree,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Archive,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { StatusBadge, ConfidenceBadge } from '@/components/ui/Badges';

export default function AdminDashboardPage() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    setPlants(getLocalPlants());
  }, []);

  const total = plants.length;
  const published = plants.filter((p) => p.status === 'published').length;
  const draft = plants.filter((p) => p.status === 'draft').length;
  const review = plants.filter((p) => p.status === 'review').length;
  const archived = plants.filter((p) => p.status === 'archived').length;
  const uncertain = plants.filter((p) => p.identification_confidence === 'uncertain').length;

  return (
    <div className="space-y-8">
      {/* Title & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sage-200 pb-5">
        <div>
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Curator Dashboard
          </h1>
          <p className="text-sm text-sage-600 mt-0.5">
            Overview of plant documentation progress across Azim Premji School campus.
          </p>
        </div>

        <Link
          href="/admin/plants/new"
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-forest-800 text-white font-semibold text-sm hover:bg-forest-900 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Enter New Plant Record</span>
        </Link>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-sage-600 uppercase tracking-wider">
            Total Documented
          </span>
          <div className="text-3xl font-serif font-bold text-forest-950">{total}</div>
          <p className="text-[11px] text-sage-500">Living specimens recorded</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Published Public</span>
          </span>
          <div className="text-3xl font-serif font-bold text-emerald-950">{published}</div>
          <p className="text-[11px] text-emerald-700">Visible on student field guide</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Draft & Review</span>
          </span>
          <div className="text-3xl font-serif font-bold text-amber-950">{draft + review}</div>
          <p className="text-[11px] text-amber-700">Internal work in progress</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-sage-600 uppercase tracking-wider flex items-center space-x-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Uncertain Species</span>
          </span>
          <div className="text-3xl font-serif font-bold text-forest-950">{uncertain}</div>
          <p className="text-[11px] text-sage-500">Awaiting botanical verification</p>
        </div>
      </div>

      {/* Recent Records Table */}
      <div className="bg-white rounded-2xl border border-sage-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-sage-100 pb-4">
          <h3 className="font-serif font-bold text-lg text-forest-950">
            Recent Catalog Records
          </h3>
          <Link
            href="/admin/plants"
            className="text-xs font-semibold text-forest-700 hover:text-forest-950 hover:underline flex items-center space-x-1"
          >
            <span>View all {total} records</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-sage-800">
            <thead className="bg-sage-50/70 uppercase text-[11px] tracking-wider text-sage-600 border-b border-sage-200">
              <tr>
                <th className="py-3 px-4">Specimen</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Identification</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-100">
              {plants.slice(0, 5).map((plant) => (
                <tr key={plant.id} className="hover:bg-sage-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-forest-950 text-sm">{plant.common_name}</div>
                    <div className="italic font-serif text-sage-600 text-xs">
                      {plant.scientific_name || 'Unconfirmed binomial'}
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize font-medium">{plant.category}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={plant.status} />
                  </td>
                  <td className="py-3 px-4">
                    <ConfidenceBadge confidence={plant.identification_confidence} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/admin/plants/${plant.id}/edit`}
                      className="font-semibold text-forest-700 hover:text-forest-950 hover:underline mr-3"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/explore/${plant.slug}`}
                      target="_blank"
                      className="text-sage-500 hover:text-sage-800"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
