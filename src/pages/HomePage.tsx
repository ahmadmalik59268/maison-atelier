import React from 'react';
import { Hero } from '../components/Hero';
import { NewArrivals } from '../components/NewArrivals';
import { SplitShowcase } from '../components/SplitShowcase';
import { CraftsmanshipPromise } from '../components/CraftsmanshipPromise';
import { EditorialSpotlight } from '../components/EditorialSpotlight';
import { GuildNewsletter } from '../components/GuildNewsletter';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Editorial Hero */}
      <Hero />

      {/* 2. Curated New Arrivals */}
      <NewArrivals initialCategory="all" />

      {/* 3. Category & Craftsmanship Dual Showcase (Split Banner) */}
      <SplitShowcase />

      {/* 4. The Atelier Promise / Haute Craftsmanship Standards */}
      <CraftsmanshipPromise />

      {/* 5. Editorial Storytelling & Runway Bento Spotlight */}
      <EditorialSpotlight />

      {/* 6. VIP Atelier Guild Previews */}
      <GuildNewsletter />
    </div>
  );
};
