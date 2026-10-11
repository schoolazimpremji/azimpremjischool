import React from 'react';
import Link from 'next/link';
import { Sprout, Compass, Bird, BookOpen, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-sage-200 mt-20 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-forest-800 text-forest-200 flex items-center justify-center">
                <Sprout className="w-5 h-5 text-ochre-300" />
              </div>
              <span className="font-serif font-bold text-lg text-white">
                Azim Premji School Campus Biodiversity
              </span>
            </div>
            <p className="text-sm text-sage-300 max-w-md leading-relaxed">
              A student-led, faculty-mentored living registry documenting the botanical flora and wildlife fauna sharing our school grounds. Promoting hands-on observational science, compassionate conservation, and respectful wildlife observation.
            </p>
            <div className="pt-2 text-xs text-sage-400">
              * Notice: Records marked with uncertain confidence represent ongoing student field inquiries awaiting scientific confirmation.
            </div>
          </div>

          {/* Flora & Fauna Directories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-forest-300 mb-4">
              Explore Nature
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/flora" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-forest-400" />
                  <span>Flora Directory (Plants & Trees)</span>
                </Link>
              </li>
              <li>
                <Link href="/fauna" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <Bird className="w-3.5 h-3.5 text-ochre-400" />
                  <span>Fauna Directory (Birds & Wildlife)</span>
                </Link>
              </li>
              <li>
                <Link href="/fauna?category=birds" className="hover:text-white transition-colors text-xs text-sage-300">
                  Campus Avian Life (Birds)
                </Link>
              </li>
              <li>
                <Link href="/fauna?category=butterflies and moths" className="hover:text-white transition-colors text-xs text-sage-300">
                  Butterflies & Pollinators
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
                  Campus Wildlife Safety: Observe from distance, do not handle animals.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-forest-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-sage-400">
          <p>© {new Date().getFullYear()} Azim Premji School. Campus Biodiversity Registry.</p>
          <p className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Living documentation of campus trees, plants, birds & creatures</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
