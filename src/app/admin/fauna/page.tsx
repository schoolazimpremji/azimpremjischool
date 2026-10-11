'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Fauna, FaunaStatus, ConfidenceLevel } from '@/types/fauna';
import { getLocalFauna, deleteFauna, saveFauna } from '@/lib/faunaRepo';
import { StatusBadge, ConfidenceBadge } from '@/components/ui/Badges';
import {
  Bird,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdminFaunaPage() {
  const [faunaList, setFaunaList] = useState<Fauna[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [confidenceFilter, setConfidenceFilter] = useState<string>('all');

  const loadFauna = () => {
    setFaunaList(getLocalFauna());
  };

  useEffect(() => {
    loadFauna();
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete "${name}" from the fauna registry?`)) {
      deleteFauna(id);
      loadFauna();
    }
  };

  const handleStatusChange = (fauna: Fauna, newStatus: FaunaStatus) => {
    saveFauna({
      ...fauna,
      status: newStatus,
    });
    loadFauna();
  };

  const filteredFauna = faunaList.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCommon = item.common_name.toLowerCase().includes(q);
      const matchSci = (item.scientific_name || '').toLowerCase().includes(q);
      const matchFam = (item.family || '').toLowerCase().includes(q);
      const matchLoc = (item.campus_location || '').toLowerCase().includes(q);
      if (!matchCommon && !matchSci && !matchFam && !matchLoc) return false;
    }

    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (confidenceFilter !== 'all' && item.identification_confidence !== confidenceFilter) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sage-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-ochre-800 uppercase tracking-wider mb-1">
            <Bird className="w-4 h-4 text-ochre-600" />
            <span>Campus Wildlife Registry</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
            Manage Fauna Records
          </h1>
          <p className="text-xs text-sage-600 mt-1">
            Add, verify, review, and publish campus birds, mammals, insects, and reptiles.
          </p>
        </div>

        <Link
          href="/admin/fauna/new"
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-forest-800 text-white font-semibold text-xs hover:bg-forest-900 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Wildlife Entry</span>
        </Link>
      </div>

      {/* Toolbar / Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-sage-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by common name, binomial, family, or location..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-sage-300 text-xs text-forest-950 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 rounded-xl border border-sage-300 bg-white text-forest-900 outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="review">Under Review</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={confidenceFilter}
              onChange={(e) => setConfidenceFilter(e.target.value)}
              className="p-2 rounded-xl border border-sage-300 bg-white text-forest-900 outline-none"
            >
              <option value="all">All Confidence</option>
              <option value="confirmed">Confirmed</option>
              <option value="probable">Probable</option>
              <option value="uncertain">Uncertain</option>
            </select>
          </div>
        </div>

        <div className="text-[11px] text-sage-600 flex items-center justify-between pt-1 border-t border-sage-100">
          <span>
            Showing <strong>{filteredFauna.length}</strong> of {faunaList.length} wildlife records
          </span>
          <span className="text-amber-800 font-medium">
            * Unverified drafts remain quarantined from public guide
          </span>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-sage-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-sage-800">
            <thead className="bg-sage-50/70 border-b border-sage-200 text-forest-950 uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Specimen</th>
                <th className="py-3.5 px-4">Group / Family</th>
                <th className="py-3.5 px-4">Confidence</th>
                <th className="py-3.5 px-4">Campus Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-100 font-normal">
              {filteredFauna.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sage-500">
                    No fauna records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredFauna.map((fauna) => {
                  const primaryPhoto = fauna.photos?.find((p) => p.is_primary) || fauna.photos?.[0];
                  return (
                    <tr key={fauna.id} className="hover:bg-sage-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-sage-100 flex-shrink-0 border border-sage-200">
                            {primaryPhoto?.public_url ? (
                              <img
                                src={primaryPhoto.public_url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-sage-400">
                                🐾
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-forest-950">
                              {fauna.common_name}
                            </div>
                            <div className="font-serif italic text-sage-600 text-[11px]">
                              {fauna.scientific_name || 'Binomial pending'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="capitalize font-medium text-forest-900">{fauna.category}</div>
                        <div className="text-[11px] text-sage-500">{fauna.family || 'Family unlisted'}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <ConfidenceBadge confidence={fauna.identification_confidence} />
                      </td>

                      <td className="py-3.5 px-4 text-sage-700">
                        {fauna.campus_location || 'Campus wide'}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={fauna.status}
                          onChange={(e) =>
                            handleStatusChange(fauna, e.target.value as FaunaStatus)
                          }
                          className="p-1 rounded text-xs border border-sage-300 bg-white text-forest-950 font-medium"
                        >
                          <option value="draft">Draft</option>
                          <option value="review">Review</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center space-x-2">
                          <Link
                            href={`/fauna/${fauna.slug}`}
                            target="_blank"
                            title="Preview species page"
                            className="p-1.5 rounded-lg text-sage-600 hover:text-forest-900 hover:bg-sage-100"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/fauna/${fauna.id}/edit`}
                            title="Edit record"
                            className="p-1.5 rounded-lg text-forest-700 hover:text-forest-950 hover:bg-forest-50"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(fauna.id, fauna.common_name)}
                            title="Delete record"
                            className="p-1.5 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
