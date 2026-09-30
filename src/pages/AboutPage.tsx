import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Leaf, ShieldCheck, Globe, Sparkles, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4">
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#8C8275]">
            Ahmad Clothing • Manifeste
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-light tracking-tight">
            The Philosophy of Pure Silhouette
          </h1>
          <p className="text-base text-[#5A534A] font-light leading-relaxed max-w-2xl mx-auto">
            Ahmad Clothing stands as an architectural antidote to ephemeral trends. We craft lifetime garments from raw, ethical noble fibres and master tailoring.
          </p>
        </div>

        {/* Large Editorial Image */}
        <div className="bg-white border border-[#E5E0D8] p-3 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=85"
            alt="Maison Atelier Studio"
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Story Section */}
        <div className="bg-white border border-[#E5E0D8] p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-light">
            Our Artisanal Heritage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#5A534A] font-light leading-relaxed">
            <p>
              Every garment in our catalog begins with raw fiber provenance. We source Mongolian cashmere combing directly from cooperative herders in the Gobi desert, Suri alpaca from the Peruvian high Andes, and double-faced virgin wool spun in biellese mills in Northern Italy.
            </p>
            <p>
              Rather than producing in industrial excess, each silhouette is produced in serialized, limited lots. Our tailors honor bespoke architectural canvasing, hand-sewn horn buttons, and cupro linings that breathe seamlessly against the skin.
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E5E0D8] p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center mx-auto text-[#1A1A1A]">
              <Leaf className="w-5 h-5 stroke-1" />
            </div>
            <h3 className="font-serif text-lg text-[#1A1A1A]">100% Traceable Fibers</h3>
            <p className="text-xs text-[#5A534A] font-light">
              From organic French flax to certified eco-shearling, zero microplastics enter our weaving rooms.
            </p>
          </div>

          <div className="bg-white border border-[#E5E0D8] p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center mx-auto text-[#1A1A1A]">
              <Scissors className="w-5 h-5 stroke-1" />
            </div>
            <h3 className="font-serif text-lg text-[#1A1A1A]">Bespoke Longevity</h3>
            <p className="text-xs text-[#5A534A] font-light">
              Every coat and jacket includes lifetime alteration privileges at any of our worldwide boutique salons.
            </p>
          </div>

          <div className="bg-white border border-[#E5E0D8] p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center mx-auto text-[#1A1A1A]">
              <ShieldCheck className="w-5 h-5 stroke-1" />
            </div>
            <h3 className="font-serif text-lg text-[#1A1A1A]">Fair Guild Labor</h3>
            <p className="text-xs text-[#5A534A] font-light">
              Our atelier artisans receive master guild living wages, comprehensive healthcare, and multi-generational apprenticeships.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] hover:bg-black transition-colors"
          >
            Explore the Collection <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
