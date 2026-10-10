'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Sprout,
  FolderTree,
  PlusCircle,
  LogOut,
  ExternalLink,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    // If not admin, redirect to login
    if (!isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sage-600 text-sm">
        Verifying administrator authorization...
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Overview & Stats', icon: Layers },
    { href: '/admin/plants', label: 'All Plant Records', icon: FolderTree },
    { href: '/admin/plants/new', label: 'Add New Specimen', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-sage-50/60 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-forest-950 text-sage-200 border-r border-forest-900 flex-shrink-0 flex flex-col justify-between">
        <div className="p-5 space-y-6">
          {/* Admin Header Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-forest-800 text-forest-200 flex items-center justify-center">
              <Shield className="w-5 h-5 text-ochre-300" />
            </div>
            <div>
              <div className="font-serif font-bold text-white text-base">Curator Panel</div>
              <div className="text-[11px] text-sage-400">Azim Premji School</div>
            </div>
          </div>

          {/* Current Admin User Badge */}
          <div className="bg-forest-900/80 p-3 rounded-xl border border-forest-800/80 text-xs">
            <div className="text-forest-300 font-semibold text-[10px] uppercase tracking-wider">
              Signed in as:
            </div>
            <div className="text-white font-medium truncate mt-0.5">{user?.email}</div>
            <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center space-x-1">
              <span>●</span>
              <span>Authorized Administrator</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-forest-800 text-white font-semibold'
                      : 'text-sage-300 hover:text-white hover:bg-forest-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-ochre-300' : 'text-sage-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-forest-900 space-y-2">
          <Link
            href="/explore"
            target="_blank"
            className="flex items-center justify-between text-xs text-sage-300 hover:text-white px-3 py-2 rounded-lg hover:bg-forest-900 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Guide</span>
            </span>
            <span>↗</span>
          </Link>

          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="w-full flex items-center space-x-2 text-xs text-red-300 hover:text-red-200 hover:bg-red-950/40 px-3 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Admin Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl">
        {children}
      </main>
    </div>
  );
}
