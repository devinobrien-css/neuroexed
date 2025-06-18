import React from 'react';
import { Icon } from '@iconify/react';

const HeroSection = () => {
  const scrollToAffiliations = () => {
    const affiliationsSection = document.getElementById('affiliations-list');
    if (affiliationsSection) {
      affiliationsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-3 w-3 animate-pulse rounded-full bg-blue-400"></div>
        <div className="absolute right-1/3 top-1/3 h-2 w-2 animate-bounce rounded-full bg-purple-400"></div>
        <div className="absolute bottom-1/4 left-1/3 h-4 w-4 animate-ping rounded-full bg-teal-400"></div>
        <div className="absolute right-1/4 top-2/3 h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center rounded-full border border-blue-200/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-6 py-3 backdrop-blur-sm">
          <Icon
            icon="mdi:handshake-outline"
            className="mr-2 h-5 w-5 text-blue-600"
          />
          <span className="font-medium text-blue-700">Global Partnerships</span>
        </div>

        {/* Main heading */}
        <h1 className="mb-8 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
          <span className="block text-gray-900">Building the</span>
          <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text pb-2 text-transparent">
            Future Together
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed text-gray-600 md:text-2xl">
          Connecting minds, advancing knowledge, and creating meaningful impact
          through strategic partnerships with world-class organizations and
          institutions.
        </p>

        {/* Action buttons */}
        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={scrollToAffiliations}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <span className="relative z-10 flex items-center">
              Explore Partnerships
              <Icon
                icon="mdi:arrow-right"
                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-teal-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </button>

          <button className="group rounded-full border-2 border-gray-300 px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600">
            <span className="flex items-center">
              <Icon icon="mdi:play-circle-outline" className="mr-2 h-5 w-5" />
              Watch Story
            </span>
          </button>
        </div>

        {/* Stats preview */}
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-blue-600 md:text-4xl">
              8+
            </div>
            <div className="font-medium text-gray-600">Partners</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-teal-600 md:text-4xl">
              100K+
            </div>
            <div className="font-medium text-gray-600">Lives Impacted</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-cyan-600 md:text-4xl">
              10+
            </div>
            <div className="font-medium text-gray-600">Years Strong</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center text-gray-400">
          <span className="mb-2 text-sm font-medium">Scroll to explore</span>
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-gray-300">
            <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-gray-400"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
