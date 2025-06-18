import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import ProjectProfile from './ProjectProfile.component';
import { ProjectMember } from '../../../shared/types/project.types';
import { fetchData } from '../../../shared/hooks/dba';
import { Loader } from '../../../shared/components/Loader';

const ProjectMembersList = () => {
  const [filter, setFilter] = useState('all');
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProjectMembers = async () => {
      try {
        setLoading(true);
        // Use the original API endpoint
        const data = await fetchData<ProjectMember[]>(
          '/project_members',
          'GET',
        );
        setMembers(data);
      } catch (err) {
        console.error('Error fetching project members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getProjectMembers();
  }, []);

  // Filter members based on selected filter and the original data structure
  const filteredMembers =
    filter === 'all'
      ? members
      : members.filter((member) => member.member_type === filter);

  const filterOptions = [
    { id: 'all', label: 'All Members', icon: 'users' },
    { id: 'faculty', label: 'Faculty', icon: 'school' },
    { id: 'staff', label: 'Staff', icon: 'briefcase' },
    { id: 'graduate', label: 'Graduate Students', icon: 'certificate' },
    { id: 'undergraduate', label: 'Undergraduate Students', icon: 'books' },
  ];

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-24">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-0 top-0 h-64 w-full bg-gradient-to-b from-gray-100 to-transparent"></div>
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-gradient-to-br from-tiffany-blue/5 to-blue-500/5"></div>
        <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block bg-gradient-to-r from-tiffany-blue to-blue-500 bg-clip-text text-sm font-semibold uppercase tracking-wider text-transparent">
            The People Behind The Science
          </span>
          <h2 className="mb-6 font-raleway text-4xl font-light md:text-5xl">
            <span className="bg-gradient-to-r from-tiffany-blue to-blue-600 bg-clip-text text-transparent">
              Meet Our Research Team
            </span>
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600"></div>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Our interdisciplinary team brings together researchers from
            neuroscience, education, psychology, and related fields to explore
            how the brain learns from experience.
          </p>
        </motion.div>

        {/* Filter controls with animated highlights */}
        <div className="relative mb-12">
          <motion.div
            className="mx-auto flex max-w-3xl flex-wrap justify-center rounded-2xl bg-white p-2 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {filterOptions.map((option, index) => (
              <motion.button
                key={option.id}
                className={`relative m-1 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all ${
                  filter === option.id
                    ? 'text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                style={{
                  backgroundImage:
                    filter === option.id
                      ? 'linear-gradient(120deg, #0abab5, #3b82f6)'
                      : 'none',
                }}
                onClick={() => setFilter(option.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Icon icon={`tabler:${option.icon}`} className="h-5 w-5" />
                {option.label}

                {filter === option.id && (
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-tiffany-blue to-blue-500"
                    layoutId="activePill"
                    transition={{ type: 'spring', duration: 0.6 }}
                  ></motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader />
            </motion.div>
          </div>
        ) : error ? (
          <motion.div
            className="mx-auto max-w-2xl rounded-3xl border border-red-100 bg-white py-20 text-center shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <Icon
                icon="tabler:alert-triangle"
                className="h-10 w-10 text-red-500"
              />
            </div>
            <h3 className="mb-3 text-2xl font-medium text-gray-800">
              Error Loading Team Members
            </h3>
            <p className="mx-auto mb-8 max-w-md text-gray-600">{error}</p>
            <motion.button
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-tiffany-blue to-blue-500 px-6 py-3 font-medium text-white shadow-lg"
              onClick={() => window.location.reload()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="tabler:refresh" className="h-5 w-5" />
              Try Again
            </motion.button>
          </motion.div>
        ) : filteredMembers.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredMembers.map((member, index) => (
              <ProjectProfile key={member.id} member={member} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="mx-auto max-w-2xl rounded-3xl border border-gray-100 bg-white/80 py-20 text-center shadow-xl backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
              <Icon
                icon="tabler:users-off"
                className="h-10 w-10 text-gray-400"
              />
            </div>
            <h3 className="mb-3 text-2xl font-medium text-gray-800">
              No Team Members Found
            </h3>
            <p className="mb-8 text-gray-600">
              No team members match your current filter criteria.
            </p>
            <motion.button
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-tiffany-blue to-blue-500 px-6 py-3 font-medium text-white shadow-lg"
              onClick={() => setFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="tabler:users" className="h-5 w-5" />
              View All Members
            </motion.button>
          </motion.div>
        )}

        {/* Call to action banner */}
        {filteredMembers.length > 0 && (
          <motion.div
            className="relative mt-20 overflow-hidden rounded-3xl bg-gradient-to-r from-gray-800 to-gray-900 p-10 text-white shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full w-full opacity-10"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  backgroundSize: '30px 30px',
                }}
              ></div>
              <motion.div
                className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-gradient-to-r from-tiffany-blue/20 to-blue-500/20 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
              <div>
                <h3 className="mb-4 font-raleway text-3xl font-light">
                  Interested in Joining Our Lab?
                </h3>
                <p className="max-w-xl text-gray-300">
                  We're always looking for passionate researchers, students, and
                  collaborators to join our interdisciplinary team exploring the
                  frontiers of neuroscience and education.
                </p>
              </div>
              <motion.button
                className="inline-flex shrink-0 items-center gap-3 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-500 px-8 py-4 font-medium text-white shadow-lg transition-all hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon icon="tabler:user-plus" className="h-5 w-5" />
                <span>Apply Now</span>

                {/* Background animation */}
                <motion.div
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500 to-tiffany-blue"
                  animate={{
                    x: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 10,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectMembersList;
