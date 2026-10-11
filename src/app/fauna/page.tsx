'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Fauna } from '@/types/fauna';
import { getPublicFauna } from '@/lib/faunaRepo';
import FaunaGrid from '@/components/fauna/FaunaGrid';
import { FAUNA_CATEGORIES } from '@/data/sampleFauna';
import { Search, X, Bird, ShieldAlert, Sparkles } from 'lucide-react';

function FaunaExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [faunaList, setFaunaList] = useState<Fauna[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedConfidence, setSelectedConfidence] = useState<string>('all');

  useEffect(() => {
    setFaunaList(getPublicFauna());
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filter logic
  const filteredFauna = useMemo(() => {
    return faunaList.filter((fauna) => {
      // 1. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = fauna.common_name.toLowerCase().includes(query);
        const matchSci = (fauna.scientific_name || '').toLowerCase().includes(query);
        const matchFam = (fauna.family || '').toLowerCase().includes(query);
        const matchLoc = (fauna.campus_location || '').toLowerCase().includes(query);
        const matchOther = fauna.other_common_names.some((n) => n.toLowerCase().includes(query));

        if (!matchName && !matchSci && !matchFam && !matchLoc && !matchOther) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'all' && fauna.category !== selectedCategory) {
        return false;
      }

      // 3. Confidence filter
      if (selectedConfidence !== 'all' && fauna.identification_confidence !== selectedConfidence) {
        return false;
      }

      return true;
    });
  }, [faunaList, searchQuery, selectedCategory, selectedConfidence]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedConfidence('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedConfidence !== 'all';

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="border-b border-sage-200 pb-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-ochre-800 mb-1">
          <Bird className="w-4 h-4 text-ochre-600" />
          <span>Campus Wildlife Field Guide</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
          Campus Fauna Directory
        </h1>
        <p className="text-base text-sage-700 mt-1 max-w-3xl leading-relaxed">
          Explore birds, mammals, butterflies, insects, and reptiles documented on the Azim Premji School campus through student field observation, photographic evidence, and verified ecological records.
        </p>

        {/* Ethical Wildlife Observation Advisory */}
        <div className="mt-4 p-3.5 rounded-xl bg-forest-900/5 border border-forest-900/10 flex items-center space-x-3 text-xs text-forest-900">
          <ShieldAlert className="w-4 h-4 text-forest-700 flex-shrink-0" />
          <span>
            <strong>Observational Code of Conduct:</strong> Always observe wildlife from a respectful distance. Never attempt to catch, disturb nests, or feed wild animals on campus grounds.
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by animal name, scientific name (e.g. Pycnonotus), family, or campus location..."
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-sage-300 focus:border-forest-600 focus:ring-2 focus:ring-forest-100 text-sm text-forest-950 placeholder-sage-400 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-sage-400 hover:text-forest-900"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="font-semibold text-sage-600 uppercase tracking-wider mr-1 flex-shrink-0">
            Group:
          </span>
          {FAUNA_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full font-medium transition-colors ${
                  isSelected
                    ? 'bg-forest-800 text-white font-semibold shadow-sm'
                    : 'bg-sage-100 text-sage-800 hover:bg-sage-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Verification status and Count */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-sage-100 text-xs">
          <div className="flex items-center space-x-3">
            <span className="text-sage-600 font-medium">Identification:</span>
            <select
              value={selectedConfidence}
              onChange={(e) => setSelectedConfidence(e.target.value)}
              className="py-1 px-2.5 rounded-lg border border-sage-300 bg-white text-forest-900 focus:border-forest-600 outline-none font-medium text-xs"
            >
              <option value="all">All Verification Levels</option>
              <option value="confirmed">Verified Only</option>
              <option value="probable">Probable ID</option>
              <option value="uncertain">Uncertain / In Review</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-sage-600 font-medium">
              Showing <strong className="text-forest-900">{filteredFauna.length}</strong> of {faunaList.length} documented wildlife species
            </span>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-forest-700 hover:text-forest-950 font-semibold underline inline-flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>Reset filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Fauna Grid */}
      <FaunaGrid
        faunaList={filteredFauna}
        emptyMessage="No campus wildlife observations match your search or filter selection."
      />
    </div>
  );
}

export default function FaunaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Suspense fallback={<div className="text-sage-600 text-sm py-12 text-center">Loading campus fauna guide...</div>}>
        <FaunaExploreContent />
      </Suspense>
    </div>
  );
}
