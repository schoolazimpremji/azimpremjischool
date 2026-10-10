import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Sprout,
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  Search,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header Introduction */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold">
          <Sprout className="w-4 h-4 text-forest-600" />
          <span>Campus Nature Curriculum</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950">
          About the Azim Premji School Campus Flora Project
        </h1>
        <p className="text-lg text-sage-800 leading-relaxed">
          Cultivating ecological literacy, scientific inquiry, and environmental responsibility by turning our school grounds into a living field laboratory.
        </p>
      </div>

      {/* Main Philosophy Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sage-200 shadow-sm space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
          Why We Document Campus Biodiversity
        </h2>
        <div className="text-sage-800 space-y-4 leading-relaxed text-sm sm:text-base">
          <p>
            Children often know more about exotic wildlife and rainforests than the ancient neem tree standing outside their classroom window or the wild medicinal creepers buffering their playground. The <strong>Azim Premji School Campus Flora Initiative</strong> was born from a desire to ground education in immediate, tangible living reality.
          </p>
          <p>
            Every plant featured on this website grows within the boundaries of our school campus. Through structured weekly field sessions, students observe seasonal rhythms: the sudden leafless explosion of golden <em>Amaltas</em> flowers during summer, the return of pollinators to <em>Sadabahar</em> borders after rain, and the micro-climate shade cast by overarching trees across play areas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-sage-100">
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-forest-950 text-base">Direct Observation</h4>
            <p className="text-xs text-sage-700">
              Moving beyond textbook diagrams to measuring real bark textures, inspecting stamen counts, and documenting leaf veins firsthand.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-forest-950 text-base">Ethnobotanical Heritage</h4>
            <p className="text-xs text-sage-700">
              Uncovering cultural uses, regional Indian vernacular names, and ancient herbal traditions alongside modern plant systematics.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-forest-950 text-base">Ecological Stewardship</h4>
            <p className="text-xs text-sage-700">
              Understanding which flora support native birds, caterpillars, butterflies, and subterranean soil microorganisms.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Protocol & Scientific Ethics */}
      <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 shadow-lg space-y-6">
        <div className="inline-flex items-center space-x-2 text-forest-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Scientific Rigor & Publishing Policy</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold">
          Our Four-Stage Verification Protocol
        </h2>
        <p className="text-sm text-sage-300 leading-relaxed max-w-2xl">
          Scientific integrity is a core educational lesson. We do not manufacture observations or publish rushed plant identifications. Every entry travels through four deliberate phases:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="bg-forest-900 p-5 rounded-2xl border border-forest-800 space-y-2">
            <span className="text-xs font-mono font-bold text-ochre-400">STAGE 01</span>
            <h4 className="font-serif font-bold text-white text-sm">Draft Specimen Entry</h4>
            <p className="text-xs text-sage-300">
              Initial student field log recorded with photographs, campus location, and tentative observations.
            </p>
          </div>

          <div className="bg-forest-900 p-5 rounded-2xl border border-forest-800 space-y-2">
            <span className="text-xs font-mono font-bold text-ochre-400">STAGE 02</span>
            <h4 className="font-serif font-bold text-white text-sm">Mentor Review</h4>
            <p className="text-xs text-sage-300">
              Science faculty and eco-club coordinators cross-examine specimens against botanical field guides.
            </p>
          </div>

          <div className="bg-forest-900 p-5 rounded-2xl border border-forest-800 space-y-2">
            <span className="text-xs font-mono font-bold text-ochre-400">STAGE 03</span>
            <h4 className="font-serif font-bold text-white text-sm">Curator Publication</h4>
            <p className="text-xs text-sage-300">
              Only verified records are promoted to "Published" status and rendered in the public field directory.
            </p>
          </div>

          <div className="bg-forest-900 p-5 rounded-2xl border border-forest-800 space-y-2">
            <span className="text-xs font-mono font-bold text-ochre-400">STAGE 04</span>
            <h4 className="font-serif font-bold text-white text-sm">Phenological Updating</h4>
            <p className="text-xs text-sage-300">
              Records are re-visited through different seasons to update blooming times, fruits, and insect visitors.
            </p>
          </div>
        </div>
      </div>

      {/* Safety Notice Card */}
      <div className="bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-200 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-lg text-amber-950">Important Safety Notice for Students</h3>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            While many plants hold historical medicinal or culinary value in traditional folklore, students must never consume, chew, or prepare any plant, fruit, root, or leaf found on school grounds without direct faculty supervision. Several common garden species carry toxic saponins or irritant saps.
          </p>
        </div>
      </div>

      {/* Contact & Contribution Call to Action */}
      <div className="text-center pt-6 space-y-4">
        <h3 className="font-serif text-2xl font-bold text-forest-950">Ready to Explore?</h3>
        <p className="text-sm text-sage-700">
          Explore the active catalog or log into the curator portal to add newly surveyed campus flora.
        </p>
        <div className="flex justify-center space-x-4 pt-2">
          <Link
            href="/explore"
            className="px-6 py-3 bg-forest-800 text-white rounded-xl text-sm font-semibold hover:bg-forest-900"
          >
            Open Field Guide
          </Link>
          <Link
            href="/admin"
            className="px-6 py-3 bg-white text-forest-900 border border-sage-300 rounded-xl text-sm font-semibold hover:bg-sage-100"
          >
            Curator Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
