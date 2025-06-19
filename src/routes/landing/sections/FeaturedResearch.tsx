import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const FeaturedResearch = () => {
  const navigate = useNavigate();

  const researchAreas = [
    {
      title: 'Experiential Learning',
      description:
        'Investigating how direct experiences shape brain development and enhance learning outcomes in educational settings.',
      icon: 'tabler:brain',
      color: 'bg-gradient-to-br from-blue-500 to-tiffany-blue',
    },
    {
      title: 'Cognitive-Emotional Integration',
      description:
        'Studying how emotions and cognitive processes interact in the brain during learning and decision-making.',
      icon: 'tabler:heart',
      color: 'bg-gradient-to-br from-purple-500 to-blue-600',
    },
    {
      title: 'Neuroplasticity',
      description:
        'Exploring how the brain changes and adapts through experience and how we can leverage this for better education.',
      icon: 'tabler:search',
      color: 'bg-gradient-to-br from-emerald-500 to-blue-500',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(10,186,181,0.08),transparent_70%)]"></div>

      <div className="max-w-8xl container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 font-raleway text-4xl font-light md:text-5xl">
              <span className="bg-gradient-to-r from-tiffany-blue to-blue-600 bg-clip-text text-transparent">
                Featured Research Areas
              </span>
            </h2>
            <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600"></div>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Our lab explores the fascinating intersection of neuroscience and
              education, focusing on how the brain learns from direct
              experiences and how this knowledge can improve educational
              practices.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {researchAreas.map((area, index) => (
            <motion.div key={index} variants={item} className="group relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-tiffany-blue/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-dark-border dark:bg-dark-surface">
                <div
                  className={`${area.color} mb-6 inline-flex rounded-xl p-3 text-white`}
                >
                  <Icon icon={area.icon} width={28} height={28} />
                </div>
                <h3 className="mb-4 font-raleway text-2xl font-medium text-gray-800 dark:text-dark-text">
                  {area.title}
                </h3>
                <p className="text-gray-600 dark:text-dark-text-secondary">{area.description}</p>

                <div className="mt-6 flex items-center">
                  <button
                    className="group inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800"
                    onClick={() => {
                      navigate('/projects');
                    }}
                  >
                    Learn more
                    <Icon
                      icon="tabler:arrow-right"
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedResearch;
