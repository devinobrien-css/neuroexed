import { motion } from 'framer-motion';
import { useState } from 'react';
import ProjectProfile from './ProjectProfile.component';
import { useProjectsQuery } from '../../../shared/hooks/projectHooks';
import { Project, ProjectMember } from '../../../shared/types/project.types';
import { Loader } from '../../../shared/components/Loader';
import { Icon } from '@iconify/react';

const ProjectIcon = (project: Project) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="dark:border-dark-border dark:bg-dark-surface w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl transition-all"
      whileHover={{ y: -5 }}
      style={{
        boxShadow: isExpanded
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      }}
      layout
    >
      {/* Project header with expand/collapse control */}
      <button
        className="dark:from-dark-bg/50 dark:to-dark-surface/80 dark:hover:from-dark-border/50 dark:hover:to-dark-bg/80 flex w-full items-center justify-between bg-gradient-to-r from-gray-50 to-white p-2 text-left transition-colors hover:from-gray-100 hover:to-gray-50 focus:outline-none focus:ring-2 focus:ring-tiffany-blue/50 sm:p-4"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={`${
          isExpanded ? 'Collapse' : 'Expand'
        } project details for ${project.title}`}
      >
        <div className="min-w-0 flex flex-1 items-start gap-2 sm:items-center sm:gap-4">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-tiffany-blue to-blue-500 text-white shadow-md sm:mt-0 sm:h-10 sm:w-10 sm:rounded-xl">
            <Icon
              icon={isExpanded ? 'tabler:folder-open' : 'tabler:folder'}
              className="h-3 w-3 sm:h-4 sm:w-4"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="dark:text-dark-text line-clamp-2 overflow-hidden font-raleway text-xs font-medium leading-tight text-gray-800 transition-colors group-hover:text-tiffany-blue sm:line-clamp-1 sm:text-lg md:text-2xl">
              {project.title}
            </h3>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-1 shrink-0 sm:ml-2"
        >
          <Icon
            icon="tabler:chevron-down"
            className="dark:text-dark-text-secondary h-4 w-4 text-gray-400 sm:h-6 sm:w-6"
            aria-hidden="true"
          />
        </motion.div>
      </button>

      {/* Project content - collapsible */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="dark:border-dark-border border-t border-gray-100 p-4 pt-0 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <p className="dark:text-dark-text-secondary text-sm leading-relaxed text-gray-700 sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Project members section with improved styling */}
          <div>
            <div className="mb-3 flex items-center gap-2 sm:mb-4">
              <Icon
                icon="tabler:users"
                className="h-4 w-4 text-tiffany-blue sm:h-5 sm:w-5"
              />
              <h4 className="dark:text-dark-text text-base font-medium text-gray-800 sm:text-lg">
                Team Members
              </h4>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4">
              {project.members.map((member: ProjectMember) => {
                return <ProjectProfile key={member.id} member={member} />;
              })}
            </div>

            {/* Project stats */}
            <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-6">
              <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs text-tiffany-blue dark:bg-blue-900/30 dark:text-blue-300 sm:px-4 sm:text-sm">
                <Icon
                  icon="tabler:calendar"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                />
                <span>Started: Ongoing</span>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-purple-50 px-3 py-2 text-xs text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 sm:px-4 sm:text-sm">
                <Icon
                  icon="tabler:users-group"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                />
                <span>{project.members.length} Team Members</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { data: projects, isLoading, isError } = useProjectsQuery();

  return (
    <section className="dark:bg-dark-bg py-12 sm:py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-8 text-center sm:mb-12"
      >
        <span className="mb-2 inline-block bg-gradient-to-r from-tiffany-blue to-blue-500 bg-clip-text text-xs font-semibold uppercase tracking-wider text-transparent sm:mb-3 sm:text-sm">
          Current Research
        </span>
        <h2 className="mb-4 font-raleway text-2xl font-light sm:mb-6 sm:text-3xl md:text-4xl">
          <span className="bg-gradient-to-r from-tiffany-blue to-blue-600 bg-clip-text text-transparent">
            Active Research Projects
          </span>
        </h2>
        <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600 sm:mb-6 sm:w-24"></div>
        <p className="dark:text-dark-text-secondary mx-auto max-w-2xl px-4 text-sm text-gray-600 sm:px-0 sm:text-base">
          Explore our ongoing research initiatives and collaborative projects
          that are pushing the boundaries of neuroscience and educational
          research.
        </p>
      </motion.div>

      <div className="container mx-auto px-4">
        {isLoading && (
          <div className="flex min-h-[300px] w-full items-center justify-center sm:min-h-[400px]">
            <Loader />
          </div>
        )}

        {isError && (
          <div className="flex min-h-[300px] w-full items-center justify-center sm:min-h-[400px]">
            <div className="px-4 text-center">
              <Icon
                icon="tabler:alert-circle"
                className="mx-auto mb-3 h-10 w-10 text-red-500 sm:mb-4 sm:h-12 sm:w-12"
              />
              <h3 className="dark:text-dark-text mb-2 text-lg font-medium text-gray-800 sm:text-xl">
                Error Loading Projects
              </h3>
              <p className="dark:text-dark-text-secondary text-sm text-gray-600 sm:text-base">
                Unable to load projects data. Please try again later.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !isError && projects && (
          <motion.div
            className="space-y-4 sm:space-y-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {projects.map((project: Project) => (
              <motion.div
                key={project.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <ProjectIcon {...project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
