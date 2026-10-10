import React from 'react';
import Link from 'next/link';
import { Sprout, Heart, BookOpen, Compass, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-sage-200 mt-20 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-forest-800 text-forest-200 flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-lg text-white">
                Azim Premji School Campus Flora
              </span>
            </div>
            <p className="text-sm text-sage-300 max-w-md leading-relaxed">
              A student-led, teacher-mentored field registry documenting native, naturalized, and ornamental plant diversity across our school campus. Fostering ecological curiosity and environmental stewardship.
            </p>
            <div className="pt-2 text-xs text-sage-400">
              * Notice: Records tagged with uncertain confidence represent ongoing active student investigations awaiting expert botanical review.
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-forest-300 mb-4">
              Explore Flora
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-forest-400" />
                  <span>All Campus Plants</span>
                </Link>
              </li>
              <li>
                <Link href="/explore?category=tree" className="hover:text-white transition-colors">
                  Campus Canopy Trees
                </Link>
              </li>
              <li>
                <Link href="/explore?category=herb" className="hover:text-white transition-colors">
                  Medicinal & Herbal Plants
                </Link>
              </li>
              <li>
                <Link href="/explore?category=flowering plant" className="hover:text-white transition-colors">
                  Flowering Shrubs & Pollinators
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Admin */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-forest-300 mb-4">
              Project & Governance
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-forest-400" />
                  <span>Methodology & Ethics</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest-400" />
                  <span>Curator / Staff Portal</span>
                </Link>
              </li>
              <li>
                <span className="text-xs text-sage-400 block pt-2">
                  Academic Year 2026 – Biodiversity Survey Initiative
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-forest-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-sage-400">
          <p>© {new Date().getFullYear()} Azim Premji School. Educational botanical documentation repository.</p>
          <p className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Preserving campus flora knowledge with care</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
