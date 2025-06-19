import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemberResponse } from '../../../shared/types/member.types';
import { Icon } from '@iconify/react';
import { SafeProfilePicture } from '../../../shared/components/common/SafeProfilePicture';

interface ProfileCardProps {
  person: MemberResponse;
  index: number;
  viewMode: 'grid' | 'list';
}

export const ProfileCard = ({ person, index, viewMode }: ProfileCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profilePicture = `${import.meta.env.VITE_S3_PROFILE_PICTURES}${
    person.profile_picture
  }`;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.05 },
    },
  };

  return (
    <>
      <motion.div
        variants={item}
        className={`group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:border-dark-border dark:bg-dark-surface ${
          viewMode === 'list' ? 'flex' : ''
        }`}
        whileHover={{ y: -5 }}
      >
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-tiffany-blue to-blue-500 transition-transform duration-300 group-hover:scale-x-100"></div>

        <div className={viewMode === 'list' ? 'w-1/4' : ''}>
          <div className="relative h-96 overflow-hidden bg-gradient-to-br from-blue-400/20 to-tiffany-blue/20">
            <SafeProfilePicture
              image={profilePicture}
              firstName={person.first}
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Status badge - showing lab_status and lab_title */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
              <div className="flex flex-col gap-1">
                {person.lab_status && (
                  <span
                    className={`w-fit rounded-full px-2 py-0.5 text-xs ${
                      person.lab_status === 'Member'
                        ? 'bg-green-500/80 text-white'
                        : 'bg-blue-500/80 text-white'
                    }`}
                  >
                    {person.lab_status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={viewMode === 'list' ? 'flex w-3/4 flex-col p-6' : 'p-6'}
        >
          <div className="mb-3">
            <h3 className="font-raleway text-xl font-medium text-gray-800 transition-colors group-hover:text-tiffany-blue dark:text-dark-text">
              {person.first} {person.last}
            </h3>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
              {person.collegiate_title && (
                <span className="block font-medium">
                  {person.collegiate_title}
                </span>
              )}
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {person.email}
                </a>
              )}
            </p>
          </div>

          {/* Show description if available */}
          {person.description && (
            <div className="mb-4">
              <p className="line-clamp-3 text-sm font-light leading-relaxed text-gray-600">
                {person.description}
              </p>
            </div>
          )}

          {/* Show year joined if available */}
          {person.year_joined && (
            <div className="mb-3 flex items-center gap-1">
              <Icon icon="tabler:calendar" className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500">
                Joined {new Date(person.year_joined).getFullYear()}
              </span>
            </div>
          )}

          {/* Social links at bottom of card */}
          <div
            className={`mt-auto flex items-center ${
              viewMode === 'list' ? 'justify-end' : 'justify-between'
            }`}
          >
            <div className="flex space-x-2">
              {person.socials?.email && (
                <motion.a
                  href={`mailto:${person.socials.email}`}
                  className="rounded-full bg-gray-50 p-2 text-gray-600 transition-colors hover:bg-tiffany-blue/10 hover:text-tiffany-blue dark:bg-dark-border dark:text-dark-text-secondary dark:hover:bg-tiffany-blue/20"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Email ${person.first} ${person.last}`}
                >
                  <Icon icon="tabler:mail" className="h-4 w-4" />
                </motion.a>
              )}
              {person.socials?.linkedin && (
                <motion.a
                  href={person.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-50 p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:bg-dark-border dark:text-dark-text-secondary dark:hover:bg-blue-600/20 dark:hover:text-blue-400"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon="tabler:brand-linkedin" className="h-4 w-4" />
                </motion.a>
              )}
              {person.socials?.twitter && (
                <motion.a
                  href={person.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-50 p-2 text-gray-600 transition-colors hover:bg-blue-400/10 hover:text-blue-400 dark:bg-dark-border dark:text-dark-text-secondary dark:hover:bg-blue-400/20"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon="tabler:brand-twitter" className="h-4 w-4" />
                </motion.a>
              )}
              {person.socials?.instagram && (
                <motion.a
                  href={person.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-50 p-2 text-gray-600 transition-colors hover:bg-pink-500/10 hover:text-pink-500 dark:bg-dark-border dark:text-dark-text-secondary dark:hover:bg-pink-500/20"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon="tabler:brand-instagram" className="h-4 w-4" />
                </motion.a>
              )}
            </div>

            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 text-sm font-medium text-tiffany-blue transition-colors group-hover:text-blue-600"
              whileHover={{ x: 2 }}
            >
              View Profile
              <Icon icon="tabler:arrow-right" className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Profile Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white shadow-2xl dark:bg-dark-surface"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-600 backdrop-blur-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-dark-bg/80 dark:text-dark-text dark:hover:bg-dark-border"
                aria-label="Close modal"
              >
                <Icon icon="tabler:x" className="h-5 w-5" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left sidebar with background pattern */}
                <div className="overflow-hidden md:w-1/3">
                  <div className="relative h-64 bg-gradient-to-br from-tiffany-blue to-blue-600 md:h-full">
                    {/* Background pattern */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle, rgba(255,255,255,0.6) 2px, transparent 2px)',
                        backgroundSize: '20px 20px',
                      }}
                    ></div>

                    {/* Profile image */}
                    <div className="flex h-full items-center justify-center p-8">
                      <div className="overflow-hidden rounded-xl border-4 border-white shadow-lg">
                        <SafeProfilePicture
                          image={profilePicture}
                          firstName={person.first}
                          className="h-60 w-60 object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content area */}
                <div className="p-8 md:w-2/3 dark:text-dark-text">
                  <h2 className="mb-1 font-raleway text-3xl font-light text-gray-800 dark:text-dark-text">
                    {person.first} {person.last}
                  </h2>

                  {/* Roles section */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {person.lab_title && (
                      <span className="rounded-full bg-tiffany-blue/10 px-3 py-1 text-sm text-tiffany-blue">
                        {person.lab_title}
                      </span>
                    )}
                    {person.collegiate_title && (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        {person.collegiate_title}
                      </span>
                    )}
                    {person.lab_status && (
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          person.lab_status === 'Member'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {person.lab_status}
                      </span>
                    )}
                  </div>

                  {/* Bio/description section */}
                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-medium text-gray-700">
                      About
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {person.description || 'No description available.'}
                    </p>
                  </div>

                  {/* Year joined */}
                  {person.year_joined && (
                    <div className="mb-6">
                      <h3 className="mb-2 text-lg font-medium text-gray-700">
                        Lab History
                      </h3>
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="tabler:calendar"
                          className="h-5 w-5 text-tiffany-blue"
                        />
                        <span>
                          Joined in {new Date(person.year_joined).getFullYear()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Contact information */}
                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-medium text-gray-700">
                      Contact & Connect
                    </h3>
                    <div className="space-y-2">
                      {person.email && (
                        <div className="flex items-center gap-2">
                          <Icon
                            icon="tabler:mail"
                            className="h-5 w-5 text-tiffany-blue"
                          />
                          <a
                            href={`mailto:${person.email}`}
                            className="text-tiffany-blue hover:underline"
                          >
                            {person.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="flex gap-3">
                    {person.socials?.linkedin && (
                      <a
                        href={person.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-blue-600 p-3 text-white transition-colors hover:bg-blue-700"
                      >
                        <Icon
                          icon="tabler:brand-linkedin"
                          className="h-5 w-5"
                        />
                      </a>
                    )}
                    {person.socials?.twitter && (
                      <a
                        href={person.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-blue-400 p-3 text-white transition-colors hover:bg-blue-500"
                      >
                        <Icon icon="tabler:brand-twitter" className="h-5 w-5" />
                      </a>
                    )}
                    {person.socials?.instagram && (
                      <a
                        href={person.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-pink-500 p-3 text-white transition-colors hover:bg-pink-600"
                      >
                        <Icon
                          icon="tabler:brand-instagram"
                          className="h-5 w-5"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
