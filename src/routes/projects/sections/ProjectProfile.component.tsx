import { motion, AnimatePresence } from 'framer-motion';
import { SafeProfilePicture } from '../../../shared/components/common/SafeProfilePicture';
import { ProjectMember } from '../../../shared/types/project.types';
import { Icon } from '@iconify/react';
import { useState } from 'react';

interface ProjectProfileProps {
  member: ProjectMember;
  index?: number;
}

const ProjectProfile = ({ member, index = 0 }: ProjectProfileProps) => {
  const memberProfilePicture = `${import.meta.env.VITE_S3_PROFILE_PICTURES}${
    member.profile_picture
  }`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Main card component */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="dark:border-dark-border dark:bg-dark-surface group h-full w-[100px] overflow-hidden rounded-2xl border border-gray-100 bg-white"
        style={{
          boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.15)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Colored top bar with avatar */}
        <div className="relative flex h-12 justify-center bg-gradient-to-r from-blue-600 to-tiffany-blue">
          <div className="absolute h-full w-full opacity-20">
            {/* Simple dot pattern for background texture */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '12px 12px',
              }}
            ></div>
          </div>

          {/* Profile image with position that overlaps sections */}
          <div className="absolute -bottom-6 h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-white dark:border-dark-surface dark:bg-dark-surface">
            <SafeProfilePicture
              image={memberProfilePicture}
              firstName={member.first}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Content section */}
        <div className="px-3 pb-2 pt-8">
          {/* Name and role */}
          <div className="mb-2 text-center">
            <h3 className="mb-1 font-raleway text-sm font-medium text-gray-800 dark:text-dark-text">
              {member.first} {member.last}
            </h3>{' '}
          </div>
        </div>

        {/* Interactive footer section */}
        <div className="mt-auto border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 p-2 dark:border-dark-border dark:from-dark-bg/50 dark:to-dark-border/50">
          <div className="flex items-center justify-between">
            {/* Social links */}
            <div className="flex space-x-1">
              {member.email && (
                <motion.a
                  href={`mailto:${member.email}`}
                  className="rounded-full border border-gray-100 bg-white p-1.5 text-gray-600 shadow-sm hover:text-tiffany-blue dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-secondary dark:hover:text-tiffany-blue"
                  aria-label={`Email ${member.first} ${member.last}`}
                  whileHover={{
                    y: -2,
                    boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon="tabler:mail" className="h-3 w-3" />
                </motion.a>
              )}
            </div>

            {/* View profile button */}
            <motion.button
              onClick={handleViewDetails}
              className="flex items-center gap-1 text-xs font-medium text-tiffany-blue hover:text-blue-600 dark:text-tiffany-blue dark:hover:text-blue-400"
              whileHover={{ x: 2 }}
            >
              <span>Profile</span>
              <Icon icon="tabler:arrow-right" className="h-3 w-3" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modal - with enhanced design */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="dark:bg-dark-surface relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white shadow-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-600 backdrop-blur-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close modal"
              >
                <Icon icon="tabler:x" className="h-5 w-5" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left sidebar with background pattern */}
                <div className="overflow-hidden md:w-1/3">
                  <div className="relative h-56 bg-gradient-to-br from-tiffany-blue to-blue-600 md:h-full">
                    {/* Background pattern - simple dot pattern */}
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
                      <div className="overflow-hidden rounded-full border-4 border-white shadow-lg">
                        <SafeProfilePicture
                          image={memberProfilePicture}
                          firstName={member.first}
                          className="h-48 w-48 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content area */}
                <div className="p-8 md:w-2/3">
                  <h2 className="mb-1 font-raleway text-3xl font-light text-gray-800">
                    {member.first} {member.last}
                  </h2>
                  {/* Contact information */}
                  <div className="mb-6">
                    <h3 className="mb-2 font-medium text-gray-700">Contact</h3>
                    <div className="space-y-2">
                      {member.email && (
                        <div className="flex items-center gap-2">
                          <Icon
                            icon="tabler:mail"
                            className="h-5 w-5 text-tiffany-blue"
                          />
                          <a
                            href={`mailto:${member.email}`}
                            className="text-tiffany-blue hover:underline"
                          >
                            {member.email}
                          </a>
                        </div>
                      )}
                    </div>
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

export default ProjectProfile;
