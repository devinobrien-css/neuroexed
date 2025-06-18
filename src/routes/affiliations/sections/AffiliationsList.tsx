import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { Loader } from '../../../shared/components/Loader';
import useAffiliates from '../../../shared/hooks/useAffiliates';
import { Affiliate } from '../../../shared/types/affiliate.types';
import { Affiliation } from './Affiliation';

const AffiliationsList = () => {
  const { affiliates } = useAffiliates();
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [filter, setFilter] = useState<
    'all' | 'university' | 'research' | 'tech' | 'healthcare'
  >('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'date'>('name');

  const scrollToTimeline = () => {
    const timelineSection = document.getElementById('collaboration-timeline');
    if (timelineSection) {
      timelineSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Helper function to categorize affiliates based on their name/source
  const categorizeAffiliate = (affiliate: Affiliate): string => {
    const name = affiliate.name.toLowerCase();
    const source = affiliate.source.toLowerCase();

    if (
      name.includes('university') ||
      name.includes('college') ||
      name.includes('school') ||
      source.includes('edu')
    ) {
      return 'university';
    }
    if (
      name.includes('research') ||
      name.includes('lab') ||
      name.includes('institute')
    ) {
      return 'research';
    }
    if (
      name.includes('tech') ||
      name.includes('software') ||
      name.includes('digital') ||
      name.includes('ai')
    ) {
      return 'tech';
    }
    if (
      name.includes('health') ||
      name.includes('medical') ||
      name.includes('hospital') ||
      name.includes('clinic')
    ) {
      return 'healthcare';
    }
    return 'other';
  };

  // Filter and search logic
  const filteredAndSortedAffiliates = useMemo(() => {
    if (!affiliates) return [];

    const filtered = affiliates.filter((affiliate: Affiliate) => {
      // Search filter
      const matchesSearch =
        affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affiliate.source.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      if (filter === 'all') return matchesSearch;

      const category = categorizeAffiliate(affiliate);
      return matchesSearch && category === filter;
    });

    // Sort
    filtered.sort((a: Affiliate, b: Affiliate) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return categorizeAffiliate(a).localeCompare(categorizeAffiliate(b));
        case 'date':
          // Since we don't have date data, sort by name as fallback
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [affiliates, searchTerm, filter, sortBy]);

  // Calculate category counts based on actual data
  const categoryCounts = useMemo(() => {
    if (!affiliates)
      return { all: 0, university: 0, research: 0, tech: 0, healthcare: 0 };

    const counts = {
      all: affiliates.length,
      university: 0,
      research: 0,
      tech: 0,
      healthcare: 0,
    };

    affiliates.forEach((affiliate: Affiliate) => {
      const category = categorizeAffiliate(affiliate);
      if (category in counts) {
        counts[category as keyof typeof counts]++;
      }
    });

    return counts;
  }, [affiliates]);

  const categories = [
    {
      key: 'all' as const,
      label: 'All Partners',
      icon: 'mdi:view-grid',
      count: categoryCounts.all,
    },
    {
      key: 'university' as const,
      label: 'Universities',
      icon: 'mdi:school',
      count: categoryCounts.university,
    },
    {
      key: 'research' as const,
      label: 'Research Labs',
      icon: 'mdi:flask',
      count: categoryCounts.research,
    },
    {
      key: 'tech' as const,
      label: 'Tech Companies',
      icon: 'mdi:laptop',
      count: categoryCounts.tech,
    },
    {
      key: 'healthcare' as const,
      label: 'Healthcare',
      icon: 'mdi:heart-pulse',
      count: categoryCounts.healthcare,
    },
  ];

  if (!affiliates) {
    return (
      <div className="min-h-96 flex w-full flex-col items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-lg text-gray-600">
            Loading our amazing partners...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Filter and View Controls */}
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        {/* Category Filters */}
        {/* <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setFilter(category.key)}
              className={`group flex items-center space-x-2 rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
                filter === category.key
                  ? 'scale-105 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'
              }`}
            >
              <Icon
                icon={category.icon}
                className={`h-5 w-5 transition-transform duration-300 ${
                  filter === category.key
                    ? 'text-white'
                    : 'text-gray-500 group-hover:text-blue-600'
                }`}
              />
              <span>{category.label}</span>
              <span
                className={`rounded-full px-2 py-1 text-xs font-bold ${
                  filter === category.key
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div> */}
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col items-center gap-4 sm:flex-row">
          <div className="relative max-w-md flex-1">
            <Icon
              icon="mdi:magnify"
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'name' | 'type' | 'date')
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="name">Sort by Name</option>
            <option value="type">Sort by Type</option>
            <option value="date">Sort by Date</option>
          </select>

          {/* View Mode Toggle */}
          {/* <div className="flex items-center space-x-2 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Icon icon="mdi:view-grid" className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-300 ${
                viewMode === 'masonry'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Icon icon="mdi:view-masonry" className="h-4 w-4" />
              <span className="hidden sm:inline">Masonry</span>
            </button>
          </div> */}
        </div>

        {/* Results Counter */}
        <div className="flex items-center text-sm text-gray-600">
          <Icon icon="mdi:view-list" className="mr-2 h-4 w-4" />
          <span>
            Showing {filteredAndSortedAffiliates.length} of{' '}
            {affiliates?.length ?? 0} partners
          </span>
        </div>
      </div>

      {/* Affiliations Grid */}
      {filteredAndSortedAffiliates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Icon
            icon="mdi:magnify-off"
            className="mb-4 h-16 w-16 text-gray-300"
          />
          <h3 className="mb-2 text-xl font-semibold text-gray-700">
            No partners found
          </h3>
          <p className="mb-6 max-w-md text-gray-500">
            {searchTerm
              ? `No partners match "${searchTerm}". Try adjusting your search or filters.`
              : 'No partners match your current filters. Try selecting a different category.'}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilter('all');
            }}
            className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
          className={`transition-all duration-500 ${
            viewMode === 'grid'
              ? 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'masonry-container columns-1 md:columns-2 lg:columns-3 xl:columns-4'
          }`}
        >
          {filteredAndSortedAffiliates.map(
            (affiliate: Affiliate, index: number) => (
              <div
                key={affiliate.name}
                className={`${
                  viewMode === 'masonry'
                    ? 'masonry-item break-inside-avoid'
                    : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                }}
              >
                <Affiliation affiliate={affiliate} />
              </div>
            ),
          )}
        </div>
      )}

      {/* Load More */}
      {/* <div className="pt-12 text-center">
        <button className="group rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <span className="flex items-center">
            Load More Partners
            <Icon
              icon="mdi:arrow-down"
              className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1"
            />
          </span>
        </button>
      </div> */}

      {/* Partnership CTA */}
      <div className="rounded-3xl border border-gray-100 bg-gradient-to-r from-blue-50 via-purple-50 to-teal-50 p-12 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex -space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
              <Icon icon="mdi:handshake" className="h-6 w-6 text-white" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500">
              <Icon icon="mdi:lightbulb" className="h-6 w-6 text-white" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500">
              <Icon icon="mdi:rocket" className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
          Become a Partner
        </h3>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Join our growing network of innovators and changemakers. Together, we
          can create meaningful impact and drive the future of education and
          research.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="https://www.linkedin.com/in/james-stellar-2139a218"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-center font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Apply for Partnership
          </a>
          <button
            onClick={scrollToTimeline}
            className="rounded-full border-2 border-gray-300 px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-blue-500 hover:text-blue-600"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Keyframes for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Masonry layout improvements */
        .masonry-container {
          column-fill: balance;
        }
        
        .masonry-item {
          display: inline-block;
          width: 100%;
          margin-bottom: 2rem;
          break-inside: avoid;
          page-break-inside: avoid;
        }
        
        /* Ensure proper spacing in masonry */
        @media (min-width: 768px) {
          .masonry-container {
            column-gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AffiliationsList;
