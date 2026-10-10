'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Plant, PlantStatus } from '@/types/plant';
import { getLocalPlants, deletePlant } from '@/lib/plantsRepo';
import { StatusBadge, ConfidenceBadge } from '@/components/ui/Badges';
import {
  PlusCircle,
  Search,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  MapPin,
  AlertTriangle
} from 'lucide-react';

export default function AdminPlantsListPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterConfidence, setFilterConfidence] = useState<string>('all');

  const loadData = () => {
    setPlants(getLocalPlants());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the record for "${name}"?`)) {
      deletePlant(id);
      loadData();
    }
  };

  const filteredPlants = useMemo(() => {
    return plants.filter((p) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const mName = p.common_name.toLowerCase().includes(q);
        const mSci = (p.scientific_name || '').toLowerCase().includes(q);
        const mFam = (p.family || '').toLowerCase().includes(q);
        if (!mName && !mSci && !mFam) return false;
      }

      if (filterStatus !== 'all' && p.status !== filterStatus) return false;
      if (filterConfidence !== 'all' && p.identification_confidence !== filterConfidence) return false;

      return true;
    });
  }, [plants, search, filterStatus, filterConfidence]);

  return (
    <div className="space-y-6">
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sage-200 pb-5">
        <div>
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Plant Catalog Records
          </h1>
          <p className="text-sm text-sage-600 mt-0.5">
            Manage all campus plant specimens, verify drafts, and publish to the student field guide.
          </p>
        </div>

        <Link
          href="/admin/plants/new"
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-forest-800 text-white font-semibold text-sm hover:bg-forest-900 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Specimen</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-sage-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-sage-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search plant records..."
            className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-sage-300 focus:border-forest-600 outline-none text-forest-950"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto text-xs">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-2 px-3 rounded-xl border border-sage-300 bg-white text-forest-900 outline-none font-medium text-xs"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="review">Under Review</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={filterConfidence}
            onChange={(e) => setFilterConfidence(e.target.value)}
            className="py-2 px-3 rounded-xl border border-sage-300 bg-white text-forest-900 outline-none font-medium text-xs"
          >
            <option value="all">All Confidences</option>
            <option value="confirmed">Confirmed</option>
            <option value="probable">Probable</option>
            <option value="uncertain">Uncertain</option>
          </select>
        </div>
      </div>

      {/* Plants Records Table */}
      <div className="bg-white rounded-2xl border border-sage-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-sage-800">
            <thead className="bg-sage-50/70 uppercase text-[11px] tracking-wider text-sage-600 border-b border-sage-200">
              <tr>
                <th className="py-3 px-4">Specimen / Names</th>
                <th className="py-3 px-4">Category & Family</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Identification</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-100">
              {filteredPlants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sage-500">
                    No plant records match your current filter.
                  </td>
                </tr>
              ) : (
                filteredPlants.map((plant) => (
                  <tr key={plant.id} className="hover:bg-sage-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-forest-950 text-sm">{plant.common_name}</div>
                      <div className="italic font-serif text-forest-800 text-xs">
                        {plant.scientific_name || <span className="text-amber-800 not-italic">Binomial pending</span>}
                      </div>
                      {plant.photos && plant.photos.length > 0 && (
                        <span className="text-[10px] text-sage-500">
                          📷 {plant.photos.length} photograph(s)
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="capitalize font-medium block text-forest-900">{plant.category}</span>
                      <span className="text-[11px] text-sage-500">{plant.family || '—'}</span>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-sage-700">
                      {plant.campus_location || '—'}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={plant.status} />
                    </td>

                    <td className="py-3.5 px-4">
                      <ConfidenceBadge confidence={plant.identification_confidence} />
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        href={`/admin/plants/${plant.id}/edit`}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg bg-forest-50 text-forest-800 hover:bg-forest-100 font-semibold text-xs"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        <span>Edit</span>
                      </Link>

                      {plant.status === 'published' && (
                        <Link
                          href={`/explore/${plant.slug}`}
                          target="_blank"
                          className="inline-flex items-center px-2 py-1 text-sage-600 hover:text-forest-900 text-xs"
                          title="View on public site"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}

                      <button
                        onClick={() => handleDelete(plant.id, plant.common_name)}
                        className="inline-flex items-center px-2 py-1 text-red-600 hover:text-red-800 text-xs"
                        title="Delete plant record"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
