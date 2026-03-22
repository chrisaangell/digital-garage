'use client'

import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [collectorType, setCollectorType] = useState('')
  const [collectionSize, setCollectionSize] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, collectorType, collectionSize }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-black to-black" />
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-32">

          {/* Logo / Brand */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-red-600 rounded-sm flex items-center justify-center">
              <span className="text-white font-black text-lg">DG</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">The Digital Garage</span>
          </div>

          {/* Hero Content */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-sm font-medium">Early Access Now Open</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-none tracking-tight mb-6">
              The Bloomberg<br />
              <span className="text-red-500">for Diecast.</span>
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl">
              Authenticate. Value. Vault. Trade. The first platform built for serious diecast collectors — with real-time price data, AI-powered authentication, and a digital portfolio that actually shows off your collection.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-12">
              {[
                { label: 'Market Size', value: '$5B+' },
                { label: 'Avg. Collector Value', value: '$12,000' },
                { label: 'eBay Fee Savings', value: '7%' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-2xl mx-auto px-6 py-20">
          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-black mb-4">You&apos;re in the garage.</h2>
              <p className="text-zinc-400 text-lg">We&apos;ll reach out when early access opens. Expect something worth waiting for.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-4xl font-black mb-4">Get Early Access</h2>
                <p className="text-zinc-400">Join the waitlist. First in, first to authenticate free.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                <select
                  value={collectorType}
                  onChange={(e) => setCollectorType(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                >
                  <option value="" className="text-zinc-600">I&apos;m a... (optional)</option>
                  <option value="speculator">Speculator / Investor</option>
                  <option value="set-completer">Set Completer</option>
                  <option value="customizer">Customizer</option>
                  <option value="casual">Casual Collector</option>
                </select>

                <select
                  value={collectionSize}
                  onChange={(e) => setCollectionSize(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                >
                  <option value="">Collection size (optional)</option>
                  <option value="under-50">Under 50 cars</option>
                  <option value="50-500">50 – 500 cars</option>
                  <option value="500-plus">500+ cars</option>
                  <option value="whale">1,000+ cars (Whale 🐋)</option>
                </select>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-500 disabled:bg-zinc-700 text-white font-bold py-4 rounded-lg transition-colors text-lg"
                >
                  {loading ? 'Joining...' : 'Join the Waitlist →'}
                </button>

                <p className="text-center text-zinc-600 text-sm">No spam. No BS. Just the platform you&apos;ve been waiting for.</p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-black text-center mb-16">Built different.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🔬',
              title: 'AI Authentication',
              desc: 'Macro imaging + AI analysis verifies loose cars instantly. Never get burned on a reproduction again.',
            },
            {
              icon: '📈',
              title: 'Live Price Ticker',
              desc: 'Real-time valuations from eBay sold listings, Heritage Auctions, and internal trades. Know what your collection is worth right now.',
            },
            {
              icon: '🔄',
              title: 'Smart Swap',
              desc: 'Multi-party trade matching. Complete your set without cash — the platform finds the chain so you don\'t have to.',
            },
            {
              icon: '🏦',
              title: 'Digital Vault',
              desc: 'Store your grails in climate-controlled security. Trade the digital title instantly — no shipping, no risk.',
            },
            {
              icon: '🎯',
              title: 'Digital Garage',
              desc: 'Your collection, beautifully displayed. Share your Garage link and let offers come to you.',
            },
            {
              icon: '💰',
              title: 'Lower Fees',
              desc: '6% vs eBay\'s 13%. On a $500 sale that\'s $35 back in your pocket. Every. Single. Time.',
            },
          ].map((feature) => (
            <div key={feature.title} className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 hover:border-red-900 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center">
              <span className="text-white font-black text-xs">DG</span>
            </div>
            <span className="text-zinc-600 text-sm">The Digital Garage © 2025</span>
          </div>
          <p className="text-zinc-700 text-sm">Built for collectors. By collectors.</p>
        </div>
      </footer>
    </main>
  )
}
