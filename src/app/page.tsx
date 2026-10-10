'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plant } from '@/types/plant';
import { getPublicPlants } from '@/lib/plantsRepo';
import PlantGrid from '@/components/plants/PlantGrid';
import {
  Compass,
  Sprout,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  Leaf
} from 'lucide-react';

export default function HomePage() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    setPlants(getPublicPlants());
  }, []);

  const featuredPlants = plants.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Botanical Field Guide Hero */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-sage-200 bg-gradient-to-b from-forest-50/70 via-[#faf7f0] to-[#faf7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Mission & Callouts */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold tracking-wide border border-forest-200">
                <Leaf className="w-3.5 h-3.5 text-forest-600" />
                <span>Azim Premji School Campus Biodiversity Project</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-950 tracking-tight leading-[1.15]">
                Discover the Living Canopy of Our Campus.
              </h1>

              <p className="text-lg text-sage-800 max-w-2xl leading-relaxed">
                Step into our outdoor classroom. This living digital field guide documents the trees, flowering shrubs, medicinal herbs, and climbers that share our school grounds—curated through hands-on student observations and botanical mentorship.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/explore"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-forest-800 text-white font-semibold text-sm hover:bg-forest-900 shadow-md hover:shadow-lg transition-all"
                >
                  <Compass className="w-4 h-4 text-forest-200" />
                  <span>Explore Field Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-white text-forest-900 font-semibold text-sm hover:bg-sage-100 border border-sage-300 shadow-sm transition-all"
                >
                  <BookOpen className="w-4 h-4 text-forest-700" />
                  <span>Educational Purpose</span>
                </Link>
              </div>

              {/* Research Methodology Notice */}
              <div className="p-4 rounded-xl bg-white/80 border border-sage-200 text-xs text-sage-700 space-y-1">
                <div className="font-semibold text-forest-900 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-forest-700" />
                  <span>Scientific Rigor & Ethics</span>
                </div>
                <p>
                  We treat unverified plant specimens honestly. Observations in draft or under review remain quarantined in our curator workbench until species identity is verified through botanical keys.
                </p>
              </div>
            </div>

            {/* Right Column: Visual Botanical Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Featured Specimen Card */}
                <div className="herbarium-card p-4 bg-white shadow-xl rotate-1 hover:rotate-0 transition-transform duration-300 border border-sage-200">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-sage-100 relative">
                    <img
                      src="/images/plants/gulmohar.png"
                      alt="Gulmohar canopy blooming on campus"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-forest-900/80 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-forest-100">
                      Specimen #AP-01
                    </div>
                  </div>
                  <div className="pt-3 pb-1">
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-serif font-bold text-forest-950 text-base">Gulmohar</h4>
                      <span className="text-xs italic font-serif text-forest-700">Delonix regia</span>
                    </div>
                    <p className="text-xs text-sage-600 mt-0.5">Senior Wing Courtyard • Verified Tree</p>
                  </div>
                </div>

                {/* Secondary Offset Specimen Card */}
                <div className="absolute -bottom-6 -left-6 sm:-left-8 herbarium-card p-3 bg-white shadow-lg -rotate-3 hover:rotate-0 transition-transform duration-300 border border-sage-200 hidden sm:block max-w-[210px]">
                  <div className="aspect-square rounded overflow-hidden bg-sage-100 relative mb-2">
                    <img
                      src="/images/plants/neem.png"
                      alt="Neem foliage"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <p className="font-serif font-bold text-forest-900">Neem</p>
                    <p className="text-[10px] text-sage-500 italic">Azadirachta indica</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Biodiversity Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-sage-200">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-forest-700 mb-1">
              Field Observations
            </div>
            <h2 className="font-serif text-3xl font-bold text-forest-950">
              Featured Campus Flora
            </h2>
            <p className="text-sm text-sage-700 mt-1">
              Representative plants cataloged and studied by our school nature club.
            </p>
          </div>
          <Link
            href="/explore"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-1.5 text-sm font-semibold text-forest-800 hover:text-forest-950 hover:underline"
          >
            <span>Browse complete catalog ({plants.length} species)</span>
            <span>→</span>
          </Link>
        </div>

        <PlantGrid plants={featuredPlants} />
      </section>

      {/* Inquiry & Learning Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-forest-300">
              Hands-On Ecological Education
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Why Documenting Campus Biodiversity Matters
            </h2>
            <p className="text-forest-100/90 leading-relaxed text-sm sm:text-base">
              Learning biology from textbooks alone leaves a gap between nature and the learner. By surveying every tree and wild herb on our school grounds, students cultivate close observational skills, understand local food webs, and learn to appreciate indigenous botanical wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-forest-800">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-forest-800 text-ochre-300 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Botanical Identification</h3>
              <p className="text-xs text-forest-200 leading-relaxed">
                Students practice using dichotomous keys, analyzing leaf venation, floral symmetries, and seasonal phenology.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-forest-800 text-ochre-300 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Ecological Web Mapping</h3>
              <p className="text-xs text-forest-200 leading-relaxed">
                Connecting campus plants to bird nests, nectar-feeding insects, microclimate cooling, and soil health.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-forest-800 text-ochre-300 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Ethnobotany & Safety</h3>
              <p className="text-xs text-forest-200 leading-relaxed">
                Recording traditional medicinal heritage alongside crucial safety warnings regarding plant toxicity and irritants.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
