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
      className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl transition-all"
      whileHover={{ y: -5 }}
      style={{
        boxShadow: isExpanded
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      }}
      layout
    >
      {/* Project header with expand/collapse control */}
      <div
        className="flex cursor-pointer items-center justify-between bg-gradient-to-r from-gray-50 to-white p-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-tiffany-blue to-blue-500 text-white shadow-md">
            <Icon
              icon={isExpanded ? 'tabler:folder-open' : 'tabler:folder'}
              className="h-4 w-4"
            />
          </div>
          <p className="font-raleway font-medium text-gray-800 transition-colors group-hover:text-tiffany-blue md:text-2xl">
            {project.title}
          </p>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon icon="tabler:chevron-down" className="h-6 w-6 text-gray-400" />
        </motion.div>
      </div>

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
        <div className="border-t border-gray-100 p-6 pt-0">
          <div className="mb-6">
            <p className="leading-relaxed text-gray-700">
              {project.description}
            </p>
          </div>

          {/* Project members section with improved styling */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Icon icon="tabler:users" className="h-5 w-5 text-tiffany-blue" />
              <h4 className="text-lg font-medium text-gray-800">
                Team Members
              </h4>
            </div>

            <div className="flex gap-4">
              {project.members.map((member: ProjectMember) => {
                return <ProjectProfile key={member.id} member={member} />;
              })}
            </div>

            {/* Project stats */}
            <div className="mt-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-tiffany-blue">
                <Icon icon="tabler:calendar" className="h-4 w-4" />
                <span>Started: {project.start_date || 'Ongoing'}</span>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm text-purple-600">
                <Icon icon="tabler:users-group" className="h-4 w-4" />
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
    <section className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
      >
        <span className="mb-3 inline-block bg-gradient-to-r from-tiffany-blue to-blue-500 bg-clip-text text-sm font-semibold uppercase tracking-wider text-transparent">
          Current Research
        </span>
        <h2 className="mb-6 font-raleway text-3xl font-light md:text-4xl">
          <span className="bg-gradient-to-r from-tiffany-blue to-blue-600 bg-clip-text text-transparent">
            Active Research Projects
          </span>
        </h2>
        <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600"></div>
        <p className="mx-auto max-w-2xl text-gray-600">
          Explore our ongoing research initiatives and collaborative projects
          that are pushing the boundaries of neuroscience and educational
          research.
        </p>
      </motion.div>

      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex min-h-[400px] w-full items-center justify-center">
            <Loader />
          </div>
        ) : isError ? (
          <div className="flex min-h-[400px] w-full items-center justify-center">
            <div className="text-center">
              <Icon
                icon="tabler:alert-circle"
                className="mx-auto mb-4 h-12 w-12 text-red-500"
              />
              <h3 className="mb-2 text-xl font-medium text-gray-800">
                Error Loading Projects
              </h3>
              <p className="text-gray-600">
                Unable to load projects data. Please try again later.
              </p>
            </div>
          </div>
        ) : (
          <motion.div
            className="space-y-6"
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
            {projects?.map((project: Project, index) => (
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
