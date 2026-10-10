import React from 'react';
import { ConfidenceLevel, PlantStatus } from '@/types/plant';
import { CheckCircle2, HelpCircle, AlertTriangle, Clock } from 'lucide-react';

interface ConfidenceBadgeProps {
  confidence: ConfidenceLevel;
  className?: string;
}

export function ConfidenceBadge({ confidence, className = '' }: ConfidenceBadgeProps) {
  switch (confidence) {
    case 'confirmed':
      return (
        <span
          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 ${className}`}
          title="Verified by botanical reference guides and mentors"
        >
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Verified Specimen</span>
        </span>
      );
    case 'probable':
      return (
        <span
          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 ${className}`}
          title="High identification likelihood based on floral/foliar keys"
        >
          <Clock className="w-3 h-3 text-blue-600" />
          <span>Probable ID</span>
        </span>
      );
    case 'uncertain':
      return (
        <span
          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 ${className}`}
          title="Field observation in progress; pending verification"
        >
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          <span>Unverified / In Review</span>
        </span>
      );
    case 'unidentified':
    default:
      return (
        <span
          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300 ${className}`}
          title="Species identification unknown"
        >
          <HelpCircle className="w-3 h-3 text-slate-500" />
          <span>Unknown Species</span>
        </span>
      );
  }
}

interface StatusBadgeProps {
  status: PlantStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  switch (status) {
    case 'published':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 ${className}`}>
          Published
        </span>
      );
    case 'review':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 ${className}`}>
          Under Review
        </span>
      );
    case 'draft':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 ${className}`}>
          Draft
        </span>
      );
    case 'archived':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 ${className}`}>
          Archived
        </span>
      );
  }
}
