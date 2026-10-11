'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plant } from '@/types/plant';
import { Fauna } from '@/types/fauna';
import { getPublicPlants } from '@/lib/plantsRepo';
import { getPublicFauna } from '@/lib/faunaRepo';
import PlantGrid from '@/components/plants/PlantGrid';
import FaunaGrid from '@/components/fauna/FaunaGrid';
import {
  Compass,
  Sprout,
  Bird,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  Leaf,
  Layers,
  HeartHandshake
} from 'lucide-react';

export default function HomePage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [fauna, setFauna] = useState<Fauna[]>([]);

  useEffect(() => {
    setPlants(getPublicPlants());
    setFauna(getPublicFauna());
  }, []);

  const featuredPlants = plants.slice(0, 3);
  const featuredFauna = fauna.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Living Field Guide Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-sage-200 bg-gradient-to-b from-forest-50/70 via-[#faf7f0] to-[#faf7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Mission & Twin Portals */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold tracking-wide border border-forest-200">
                <Leaf className="w-3.5 h-3.5 text-forest-600" />
                <span>Azim Premji School Campus Biodiversity Project</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-950 tracking-tight leading-[1.15]">
                The Living Heritage of Our Campus: Flora & Fauna.
              </h1>

              <p className="text-lg text-sage-800 max-w-2xl leading-relaxed">
                Step into our outdoor classroom. This digital field registry documents both the botanical canopy (trees, flowering shrubs, medicinal herbs) and the resident wildlife (songbirds, butterflies, squirrels, reptiles) sharing our school grounds.
              </p>

              {/* Action Buttons: Twin exploration paths */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/flora"
                  className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-forest-800 text-white font-semibold text-sm hover:bg-forest-900 shadow-md hover:shadow-lg transition-all"
                >
                  <Compass className="w-4 h-4 text-forest-200" />
                  <span>Explore Flora (Plants)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/fauna"
                  className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-ochre-800 text-white font-semibold text-sm hover:bg-ochre-900 shadow-md hover:shadow-lg transition-all"
                >
                  <Bird className="w-4 h-4 text-ochre-200" />
                  <span>Explore Fauna (Wildlife)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 px-4 py-3.5 rounded-xl bg-white text-forest-900 font-semibold text-sm hover:bg-sage-100 border border-sage-300 shadow-sm transition-all"
                >
                  <BookOpen className="w-4 h-4 text-forest-700" />
                  <span>Our Methodology</span>
                </Link>
              </div>

              {/* Research Methodology Notice */}
              <div className="p-4 rounded-xl bg-white/80 border border-sage-200 text-xs text-sage-700 space-y-1">
                <div className="font-semibold text-forest-900 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-forest-700" />
                  <span>Scientific Rigor & Wildlife Ethics</span>
                </div>
                <p>
                  Every plant specimen and wildlife observation undergoes student scrutiny and faculty mentorship. Unconfirmed specimens remain quarantined in our curator review queue to uphold observational honesty.
                </p>
              </div>
            </div>

            {/* Right Column: Visual Flora & Fauna Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Specimen 1: Gulmohar Tree */}
                <div className="herbarium-card p-4 bg-white shadow-xl rotate-1 hover:rotate-0 transition-transform duration-300 border border-sage-200">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-sage-100 relative">
                    <img
                      src="/images/plants/gulmohar.png"
                      alt="Gulmohar canopy blooming on campus"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-forest-900/80 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-forest-100">
                      Flora #FL-01
                    </div>
                  </div>
                  <div className="pt-3 pb-1">
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-serif font-bold text-forest-950 text-base">Gulmohar</h4>
                      <span className="text-xs italic font-serif text-forest-700">Delonix regia</span>
                    </div>
                    <p className="text-xs text-sage-600 mt-0.5">Courtyard Canopy Tree</p>
                  </div>
                </div>

                {/* Specimen 2: Red-vented Bulbul Bird */}
                <div className="absolute -bottom-6 -left-6 sm:-left-8 herbarium-card p-3 bg-white shadow-xl -rotate-3 hover:rotate-0 transition-transform duration-300 border border-sage-200 max-w-[220px]">
                  <div className="aspect-square rounded overflow-hidden bg-sage-100 relative mb-2">
                    <img
                      src="/images/fauna/bulbul.jpg"
                      alt="Red-vented bulbul on campus shrub"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-ochre-900/85 backdrop-blur-md text-[9px] uppercase font-bold tracking-wider text-ochre-100">
                      Fauna #FN-01
                    </div>
                  </div>
                  <div className="text-xs">
                    <p className="font-serif font-bold text-forest-900">Red-vented Bulbul</p>
                    <p className="text-[10px] text-sage-500 italic">Pycnonotus cafer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Portals Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Flora Card */}
          <Link
            href="/flora"
            className="group relative overflow-hidden rounded-3xl bg-forest-900 text-white p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="relative z-10 space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-ochre-300 flex items-center space-x-1">
                <Sprout className="w-3.5 h-3.5" />
                <span>Botanical Herbarium</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">Explore Campus Flora</h3>
              <p className="text-sm text-forest-200/90 leading-relaxed max-w-md">
                Browse our complete botanical directory of native shade trees, flowering shrubs, medicinal herbs, and climbers documented on school grounds.
              </p>
              <div className="pt-2 inline-flex items-center space-x-2 text-xs font-semibold text-ochre-300 group-hover:text-white transition-colors">
                <span>View {plants.length} Plant Species</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Fauna Card */}
          <Link
            href="/fauna"
            className="group relative overflow-hidden rounded-3xl bg-ochre-900 text-white p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="relative z-10 space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-ochre-200 flex items-center space-x-1">
                <Bird className="w-3.5 h-3.5" />
                <span>Zoological Field Guide</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">Explore Campus Fauna</h3>
              <p className="text-sm text-ochre-100/90 leading-relaxed max-w-md">
                Discover the birds, mammals, butterflies, reptiles, and insects that feed, nest, and thrive alongside our campus trees.
              </p>
              <div className="pt-2 inline-flex items-center space-x-2 text-xs font-semibold text-ochre-200 group-hover:text-white transition-colors">
                <span>View {fauna.length} Wildlife Species</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Campus Flora Section */}
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
            href="/flora"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-1.5 text-sm font-semibold text-forest-800 hover:text-forest-950 hover:underline"
          >
            <span>Browse complete flora ({plants.length} species)</span>
            <span>→</span>
          </Link>
        </div>

        <PlantGrid plants={featuredPlants} />
      </section>

      {/* Featured Campus Fauna Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-sage-200">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-ochre-800 mb-1">
              Wildlife Field Observations
            </div>
            <h2 className="font-serif text-3xl font-bold text-forest-950">
              Featured Campus Fauna
            </h2>
            <p className="text-sm text-sage-700 mt-1">
              Resident and migratory creatures observed across campus canopies, hedges, and garden lawns.
            </p>
          </div>
          <Link
            href="/fauna"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-1.5 text-sm font-semibold text-forest-800 hover:text-forest-950 hover:underline"
          >
            <span>Browse complete fauna ({fauna.length} species)</span>
            <span>→</span>
          </Link>
        </div>

        <FaunaGrid faunaList={featuredFauna} />
      </section>

      {/* Inquiry & Learning Pillars: Plant-Animal Ecosystem Mapping */}
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
              Learning biology from textbooks alone leaves a gap between nature and the learner. By surveying both plants and creatures on our school grounds, students map real ecological food webs, observe pollination and seed dispersal in real time, and cultivate lifelong environmental empathy.
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
                Connecting campus plants to bird nests, nectar-feeding insects, caterpillar host plants, and natural predators.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-forest-800 text-ochre-300 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-white">Ethical Wildlife Observation</h3>
              <p className="text-xs text-forest-200 leading-relaxed">
                Recording species without disturbing nests, handling animals, or altering delicate microhabitats.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
