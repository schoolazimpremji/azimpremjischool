import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Sprout,
  Bird,
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  Search,
  Eye,
  CheckCircle2,
  AlertCircle,
  Leaf,
  Layers,
  HeartHandshake
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header Introduction */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold">
          <Leaf className="w-4 h-4 text-forest-600" />
          <span>Campus Living Laboratory</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950">
          About the Campus Biodiversity Project
        </h1>
        <p className="text-lg text-sage-800 leading-relaxed">
          Cultivating ecological literacy, scientific inquiry, and environmental empathy by turning the Azim Premji School grounds into a living field laboratory for Flora (plants) and Fauna (wildlife).
        </p>
      </div>

      {/* Main Philosophy Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sage-200 shadow-sm space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
          Why We Document Campus Flora & Fauna Together
        </h2>
        <div className="text-sage-800 space-y-4 leading-relaxed text-sm sm:text-base">
          <p>
            Children often study exotic animals and distant rainforests while overlooking the ancient neem tree outside their classroom window or the red-vented bulbuls nesting in the school hedge. The <strong>Azim Premji School Campus Biodiversity Initiative</strong> grounds science education in immediate, tangible living reality.
          </p>
          <p>
            Rather than treating plants and animals in isolation, our field inquiries map the symbiotic connections between them: how <em>Delonix regia</em> (Gulmohar) and <em>Cassia fistula</em> (Amaltas) canopies provide perches and nectar for sunbirds and bulbuls; how larval host plants like curry leaf nourish caterpillars of the Common Mormon butterfly; and how palm squirrels bury tree seeds across school lawns that germinate into the next generation of campus greenery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-sage-100">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="font-serif font-bold text-forest-950 text-base">Direct Observation</h4>
            <p className="text-xs text-sage-700 leading-relaxed">
              Measuring real bark textures, inspecting stamen symmetries, recording bird calls, and monitoring insect behaviors firsthand.
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-ochre-100 text-ochre-800 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="font-serif font-bold text-forest-950 text-base">Ecosystem Interdependence</h4>
            <p className="text-xs text-sage-700 leading-relaxed">
              Mapping host plants to pollinators, food web dynamics, and the seasonal rhythm of blooming flowers and visiting migratory species.
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="font-serif font-bold text-forest-950 text-base">Ethical Stewardship</h4>
            <p className="text-xs text-sage-700 leading-relaxed">
              Cultivating respect for non-human life, ethical wildlife observation from distance, and active preservation of campus microhabitats.
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
          Scientific integrity is a core educational lesson. We do not manufacture observations or publish rushed taxonomic identifications. Every botanical and zoological entry travels through four deliberate phases:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="bg-forest-900 p-5 rounded-2xl border border-forest-800 space-y-2">
            <span className="text-xs font-mono font-bold text-ochre-400">STAGE 01</span>
            <h4 className="font-serif font-bold text-white text-sm">Draft Field Log</h4>
            <p className="text-xs text-sage-300 leading-relaxed">
              Initial student observation logged with photographs, campus location coordinates, and tentative morphology notes.
            </p>
          </div>

          <div className="bg-forest-900 p-5 rounded-2xl border border-forest-800 space-y-2">
            <span className="text-xs font-mono font-bold text-ochre-400">STAGE 02</span>
            <h4 className="font-serif font-bold text-white text-sm">Mentor Review</h4>
            <p className="text-xs text-sage-300 leading-relaxed">
              Science faculty and Eco-Club mentors cross-examine specimens against regional botanical and zoological field guides.
            </p>
          </div>

          <div className="bg-forest-900 p-5 rounded-2xl border border-forest-800 space-y-2">
            <span className="text-xs font-mono font-bold text-ochre-400">STAGE 03</span>
            <h4 className="font-serif font-bold text-white text-sm">Curator Publication</h4>
            <p className="text-xs text-sage-300 leading-relaxed">
              Only verified records are promoted to "Published" status and rendered in the public field directory.
            </p>
          </div>

          <div className="bg-forest-900 p-5 rounded-2xl border border-forest-800 space-y-2">
            <span className="text-xs font-mono font-bold text-ochre-400">STAGE 04</span>
            <h4 className="font-serif font-bold text-white text-sm">Phenology Updates</h4>
            <p className="text-xs text-sage-300 leading-relaxed">
              Records are re-visited through different seasons to update blooming times, fruiting periods, and animal sightings.
            </p>
          </div>
        </div>
      </div>

      {/* Safety & Ethics Notices for Students */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Botanical Safety Notice */}
        <div className="bg-amber-50 rounded-2xl p-6 sm:p-7 border border-amber-200 flex flex-col space-y-3">
          <div className="flex items-center space-x-3 text-amber-900">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="font-serif font-bold text-base">Botanical Safety Guidelines</h3>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            While many plants hold historical medicinal or culinary value in traditional folklore, students must <strong>never consume, chew, or ingest</strong> any plant part, fruit, seed, or sap found on campus without explicit faculty authorization. Several common ornamental species carry toxic saponins or irritants.
          </p>
        </div>

        {/* Wildlife Observation Ethics */}
        <div className="bg-emerald-50 rounded-2xl p-6 sm:p-7 border border-emerald-200 flex flex-col space-y-3">
          <div className="flex items-center space-x-3 text-emerald-950">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Bird className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="font-serif font-bold text-base">Wildlife Observational Code</h3>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            Students must observe campus animals from a respectful distance (3–5 metres for birds, 1–2 metres for insects). <strong>Never attempt to touch, corner, capture, or feed</strong> campus wildlife. Bird nests, eggs, roosting sites, and butterfly chrysalises must never be handled or disturbed.
          </p>
        </div>
      </div>

      {/* Contact & Contribution Call to Action */}
      <div className="text-center pt-6 space-y-4">
        <h3 className="font-serif text-2xl font-bold text-forest-950">Ready to Explore Campus Biodiversity?</h3>
        <p className="text-sm text-sage-700">
          Explore our twin field guides or log into the curator portal to add newly surveyed specimens.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/flora"
            className="px-6 py-3 bg-forest-800 text-white rounded-xl text-sm font-semibold hover:bg-forest-900 shadow-sm inline-flex items-center space-x-2"
          >
            <Compass className="w-4 h-4 text-forest-200" />
            <span>Explore Campus Flora</span>
          </Link>
          <Link
            href="/fauna"
            className="px-6 py-3 bg-ochre-800 text-white rounded-xl text-sm font-semibold hover:bg-ochre-900 shadow-sm inline-flex items-center space-x-2"
          >
            <Bird className="w-4 h-4 text-ochre-200" />
            <span>Explore Campus Fauna</span>
          </Link>
          <Link
            href="/admin"
            className="px-6 py-3 bg-white text-forest-900 border border-sage-300 rounded-xl text-sm font-semibold hover:bg-sage-100 shadow-sm inline-flex items-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            <span>Curator Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
