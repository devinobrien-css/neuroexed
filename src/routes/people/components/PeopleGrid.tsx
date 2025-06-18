import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProfileCard } from './ProfileCard';
import { MemberResponse } from '../../../shared/types/member.types';
import { Icon } from '@iconify/react';

interface PeopleGridProps {
  people: MemberResponse[];
}

const PeopleGrid = ({ people }: PeopleGridProps) => {
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Updated filter options to match the lab_status field
  const filterOptions = [
    { id: 'all', label: 'All Team Members', icon: 'tabler:users-group' },
    { id: 'member', label: 'Current Members', icon: 'tabler:users' },
    { id: 'alumni', label: 'Alumni', icon: 'tabler:certificate' },
  ];

  // Updated filtering logic to match lab_status field
  const filteredPeople =
    filter === 'all'
      ? people
      : people.filter(
        (person) => person.lab_status?.toLowerCase() === filter.toLowerCase(),
      );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-white/80 p-2 shadow-sm backdrop-blur-sm">
          {filterOptions.map((option) => (
            <motion.button
              key={option.id}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                filter === option.id
                  ? 'bg-gradient-to-r from-tiffany-blue to-blue-600 text-white shadow-md'
                  : 'border border-gray-100 bg-white text-gray-700 hover:border-tiffany-blue/30 hover:bg-gray-50 hover:text-tiffany-blue'
              }`}
              onClick={() => setFilter(option.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon icon={option.icon} className="h-4 w-4" />
              {option.label}
            </motion.button>
          ))}

          {/* View toggle */}
          <div className="ml-auto flex overflow-hidden rounded-lg border border-gray-200 bg-white">
            <button
              className={`p-2.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-tiffany-blue/10 text-tiffany-blue'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Icon icon="tabler:layout-grid" className="h-5 w-5" />
            </button>
            <button
              className={`p-2.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-tiffany-blue/10 text-tiffany-blue'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <Icon icon="tabler:layout-list" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'flex flex-col gap-4'
        }
      >
        {filteredPeople.map((person, index) => (
          <ProfileCard
            key={`${person.first}-${person.last}-${index}`}
            person={person}
            index={index}
            viewMode={viewMode}
          />
        ))}
      </motion.div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Showing {filteredPeople.length} out of {people.length} team members
        </p>
      </div>
    </>
  );
};

export default PeopleGrid;
