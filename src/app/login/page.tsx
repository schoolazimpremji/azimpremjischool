'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Lock, Mail, AlertTriangle, ArrowRight, Sprout } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('schoolazimpremji@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push('/admin');
      } else {
        setError(res.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-sage-200 shadow-xl space-y-6">
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-forest-900 text-forest-100 flex items-center justify-center shadow-md">
            <ShieldCheck className="w-8 h-8 text-ochre-300" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
            Curator Access Portal
          </h1>
          <p className="text-xs sm:text-sm text-sage-600">
            Authorized administrative entrance for Azim Premji School faculty and flora curators.
          </p>
        </div>

        {/* Security Warning Callout */}
        <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 flex items-start space-x-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Restricted Access:</strong> Only approved administrator accounts can review, edit, publish, or archive plant specimens. Public registration is permanently closed.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3.5 rounded-xl">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Curator Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-sage-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="schoolazimpremji@gmail.com"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-sage-300 text-sm focus:border-forest-600 focus:ring-2 focus:ring-forest-100 outline-none text-forest-950"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-1">
              Passphrase / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-sage-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-sage-300 text-sm focus:border-forest-600 focus:ring-2 focus:ring-forest-100 outline-none text-forest-950"
              />
            </div>
            <p className="text-[11px] text-sage-500 mt-1">
              Allowed administrator: <code className="bg-sage-100 px-1 py-0.5 rounded text-forest-800 font-mono">schoolazimpremji@gmail.com</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-forest-800 text-white font-semibold text-sm hover:bg-forest-900 shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-sage-500">
          <Link href="/" className="hover:text-forest-800 underline">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
