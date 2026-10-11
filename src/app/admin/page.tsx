'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plant } from '@/types/plant';
import { Fauna } from '@/types/fauna';
import { getLocalPlants } from '@/lib/plantsRepo';
import { getLocalFauna } from '@/lib/faunaRepo';
import {
  FolderTree,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Bird,
  Sprout,
  Compass,
  Eye
} from 'lucide-react';
import { StatusBadge, ConfidenceBadge } from '@/components/ui/Badges';

export default function AdminDashboardPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [fauna, setFauna] = useState<Fauna[]>([]);
  const [activeTab, setActiveTab] = useState<'flora' | 'fauna'>('flora');

  useEffect(() => {
    setPlants(getLocalPlants());
    setFauna(getLocalFauna());
  }, []);

  const totalPlants = plants.length;
  const publishedPlants = plants.filter((p) => p.status === 'published').length;
  const draftPlants = plants.filter((p) => p.status === 'draft' || p.status === 'review').length;

  const totalFauna = fauna.length;
  const publishedFauna = fauna.filter((f) => f.status === 'published').length;
  const draftFauna = fauna.filter((f) => f.status === 'draft' || f.status === 'review').length;

  const totalCombined = totalPlants + totalFauna;
  const totalPublished = publishedPlants + publishedFauna;
  const totalInReview = draftPlants + draftFauna;

  return (
    <div className="space-y-8">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sage-200 pb-5">
        <div>
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Curator Dashboard
          </h1>
          <p className="text-sm text-sage-600 mt-0.5">
            Campus biodiversity registry overview — documenting both Flora (plants) and Fauna (wildlife).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/plants/new"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-forest-800 text-white font-semibold text-xs hover:bg-forest-900 shadow-sm"
          >
            <Sprout className="w-4 h-4 text-ochre-300" />
            <span>Add Plant</span>
          </Link>

          <Link
            href="/admin/fauna/new"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-ochre-800 text-white font-semibold text-xs hover:bg-ochre-900 shadow-sm"
          >
            <Bird className="w-4 h-4 text-ochre-200" />
            <span>Add Wildlife</span>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-sage-600 uppercase tracking-wider">
            Total Biodiversity
          </span>
          <div className="text-3xl font-serif font-bold text-forest-950">{totalCombined}</div>
          <p className="text-[11px] text-sage-500">
            {totalPlants} flora • {totalFauna} fauna
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Published Public</span>
          </span>
          <div className="text-3xl font-serif font-bold text-emerald-950">{totalPublished}</div>
          <p className="text-[11px] text-emerald-700">
            {publishedPlants} plants • {publishedFauna} animals
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Draft & Review</span>
          </span>
          <div className="text-3xl font-serif font-bold text-amber-950">{totalInReview}</div>
          <p className="text-[11px] text-amber-700">Awaiting faculty verification</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-sage-600 uppercase tracking-wider flex items-center space-x-1">
            <Bird className="w-3.5 h-3.5 text-ochre-600" />
            <span>Fauna Diversity</span>
          </span>
          <div className="text-3xl font-serif font-bold text-forest-950">{totalFauna}</div>
          <p className="text-[11px] text-sage-500">Documented animal species</p>
        </div>
      </div>

      {/* Tabbed Recent Records Management Table */}
      <div className="bg-white rounded-2xl border border-sage-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-sage-100 pb-4 gap-3">
          {/* Tab Selector */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('flora')}
              className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'flora'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'bg-sage-100 text-sage-700 hover:bg-sage-200'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>Flora Records ({totalPlants})</span>
            </button>

            <button
              onClick={() => setActiveTab('fauna')}
              className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'fauna'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'bg-sage-100 text-sage-700 hover:bg-sage-200'
              }`}
            >
              <Bird className="w-3.5 h-3.5" />
              <span>Fauna Records ({totalFauna})</span>
            </button>
          </div>

          <Link
            href={activeTab === 'flora' ? '/admin/plants' : '/admin/fauna'}
            className="text-xs font-semibold text-forest-700 hover:text-forest-950 hover:underline flex items-center space-x-1"
          >
            <span>Manage all {activeTab === 'flora' ? 'flora' : 'fauna'} records</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Tab 1: Flora Table */}
        {activeTab === 'flora' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-sage-800">
              <thead className="bg-sage-50/70 uppercase text-[11px] tracking-wider text-sage-600 border-b border-sage-200">
                <tr>
                  <th className="py-3 px-4">Plant Specimen</th>
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
        )}

        {/* Tab 2: Fauna Table */}
        {activeTab === 'fauna' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-sage-800">
              <thead className="bg-sage-50/70 uppercase text-[11px] tracking-wider text-sage-600 border-b border-sage-200">
                <tr>
                  <th className="py-3 px-4">Wildlife Specimen</th>
                  <th className="py-3 px-4">Group</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Identification</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100">
                {fauna.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-sage-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-forest-950 text-sm">{item.common_name}</div>
                      <div className="italic font-serif text-sage-600 text-xs">
                        {item.scientific_name || 'Unconfirmed binomial'}
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize font-medium">{item.category}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3 px-4">
                      <ConfidenceBadge confidence={item.identification_confidence} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/fauna/${item.id}/edit`}
                        className="font-semibold text-forest-700 hover:text-forest-950 hover:underline mr-3"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/fauna/${item.slug}`}
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
        )}
      </div>
    </div>
  );
}
