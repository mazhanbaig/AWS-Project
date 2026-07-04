'use client';

import Link from 'next/link';
import Button from '@/components/Button';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-white">
        <div className="container-wide pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              Now available in select regions
            </div>
            <h1 className="section-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
              The fastest way to get
              <br />
              <span className="text-brand-600">where you&apos;re going</span>
            </h1>
            <p className="section-subheading mx-auto mb-10 text-surface-500 text-lg sm:text-xl">
              Create an account, request a unicorn, and ride off into success —
              all from your browser.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto min-w-[200px] text-base">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/signin">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] text-base">
                  I already have an account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — web app flow */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">How to get started</h2>
            <p className="section-subheading mx-auto">
              Three simple steps to your first unicorn ride.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-2xl font-bold mx-auto mb-5 group-hover:bg-brand-100 transition-colors">
                1
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2">Create an account</h3>
              <p className="text-sm text-surface-500 leading-relaxed max-w-xs mx-auto">
                Sign up with your email and password. We&apos;ll send you a verification code to confirm
                your identity.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-2xl font-bold mx-auto mb-5 group-hover:bg-brand-100 transition-colors">
                2
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2">Sign in &amp; pick a location</h3>
              <p className="text-sm text-surface-500 leading-relaxed max-w-xs mx-auto">
                Log in to your account, then click anywhere on the map to set your pickup
                location.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-2xl font-bold mx-auto mb-5 group-hover:bg-brand-100 transition-colors">
                3
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2">Request a unicorn</h3>
              <p className="text-sm text-surface-500 leading-relaxed max-w-xs mx-auto">
                Tap &quot;Request Unicorn&quot; and watch your ride arrive. Giddy up — you&apos;re on
                your way!
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/register">
              <Button size="lg">Start Now — It&apos;s Free</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28 bg-surface-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading mb-6">Our Story</h2>
            <div className="prose prose-surface max-w-none">
              <p className="text-surface-600 leading-relaxed text-lg">
                Wild Rydes was started by a former hedge fund analyst and a software developer.
                The two long-time friends happened upon the idea after attending a silent yoga
                retreat in Nevada. After gazing upon the majestic herds of unicorns prancing across
                    a surreal Nevada sunset, they saw an opportunity to marry society&apos;s demand for
                    faster transportation to underutilized beasts of labor through an on-demand app.
              </p>
              <p className="text-surface-600 leading-relaxed text-lg mt-4">
                Today, Wild Rydes has thousands of unicorns in its network fulfilling hundreds of
                rydes each day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <svg className="w-8 h-8 mx-auto mb-6 text-brand-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179z" />
            </svg>
            <blockquote className="text-xl md:text-2xl text-surface-700 font-medium leading-relaxed mb-6">
              &ldquo;I was almost late to my ultimate frisbee tournament in Dolores Park. But Wild
              Rydes got me there from the marina in under five minutes.&rdquo;
            </blockquote>
            <cite className="text-sm text-surface-400 not-italic">— Satisfied Wild Rydes User</cite>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 md:py-28 bg-surface-950 text-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm font-medium mb-6">
              Coming Soon
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
              Kraken Explorer &amp; Dragon Flyght
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
              We&apos;re looking to provide you a full service package from air, land, and to sea.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="section-heading mb-4">Ready to ride?</h2>
            <p className="section-subheading mx-auto mb-8">
              Join thousands of happy riders. Sign up in under a minute.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/signin">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  Sign in instead
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
