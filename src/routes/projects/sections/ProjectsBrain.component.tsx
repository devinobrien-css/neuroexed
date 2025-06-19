import { useState } from 'react';
import { TriuneBrain } from '../../../shared/assets/img/TriuneBrain.component';
import { BRAIN_DATA, BrainSectionEnum } from './ProjectBrainData';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const ProjectsBrain = () => {
  const [selected, setSelected] = useState<BrainSectionEnum>(
    BrainSectionEnum.NEO,
  );

  const getBrainColor = (section: BrainSectionEnum) => {
    switch (section) {
      case BrainSectionEnum.NEO:
        return {
          gradient: 'from-blue-500 to-blue-600',
          bgGradient: 'from-blue-500/10 to-blue-600/5',
          border: 'border-blue-500/20',
          icon: 'tabler:brain',
        };
      case BrainSectionEnum.PALEO:
        return {
          gradient: 'from-red-500 to-red-600',
          bgGradient: 'from-red-500/10 to-red-600/5',
          border: 'border-red-500/20',
          icon: 'tabler:activity',
        };
      case BrainSectionEnum.REPT:
        return {
          gradient: 'from-emerald-500 to-emerald-600',
          bgGradient: 'from-emerald-500/10 to-emerald-600/5',
          border: 'border-emerald-500/20',
          icon: 'fluent-emoji-high-contrast:lizard',
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          bgGradient: 'from-gray-500/10 to-gray-600/5',
          border: 'border-gray-500/20',
          icon: 'tabler:brain',
        };
    }
  };

  const brainColor = getBrainColor(selected);

  const getBrainPosition = (section: BrainSectionEnum) => {
    switch (section) {
      case BrainSectionEnum.NEO:
        return '15%';
      case BrainSectionEnum.PALEO:
        return '40%';
      case BrainSectionEnum.REPT:
        return '70%';
      default:
        return '15%';
    }
  };

  const brainTabs = [
    {
      id: BrainSectionEnum.NEO,
      name: 'Neomammilian Layer',
      icon: 'tabler:brain',
    },
    {
      id: BrainSectionEnum.PALEO,
      name: 'Paleomammilian Layer',
      icon: 'tabler:activity',
    },
    {
      id: BrainSectionEnum.REPT,
      name: 'Reptillian Layer',
      icon: 'fluent-emoji-high-contrast:lizard',
    },
  ];

  return (
    <>
      <section className="dark:bg-dark-bg bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <span className="mb-3 inline-block bg-gradient-to-r from-tiffany-blue to-blue-500 bg-clip-text text-sm font-semibold uppercase tracking-wider text-transparent">
              Interactive Exploration
            </span>
            <h2 className="mb-6 font-raleway text-4xl font-light md:text-5xl">
              <span className="bg-gradient-to-r from-tiffany-blue to-blue-600 bg-clip-text text-transparent">
                The Triune Brain Model
              </span>
            </h2>
            <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600"></div>
            <p className="mx-auto max-w-3xl text-gray-600">
              Explore the three evolutionary layers of the brain and how they
              interact to influence learning, decision-making, and experiential
              education outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* Interactive brain visualization */}
            <div className="order-2 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-lg lg:order-1">
              <div className="relative flex items-center justify-center">
                {/* Decorative elements */}
                <motion.div
                  className="absolute -z-10 h-48 w-48 rounded-full bg-gradient-to-r from-tiffany-blue/10 to-blue-500/10"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ left: '15%', top: '10%' }}
                />
                <motion.div
                  className="absolute -z-10 h-32 w-32 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  style={{ right: '20%', bottom: '15%' }}
                />

                <TriuneBrain setState={setSelected} />

                {/* Pulse animation around selected region */}
                <motion.div
                  className={`absolute rounded-full bg-gradient-to-r ${brainColor.gradient} -z-10 opacity-20 blur-xl`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.25, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    width: '60%',
                    height: '60%',
                    top: getBrainPosition(selected),
                    left: '20%',
                  }}
                />
              </div>

              {/* Interactive tabs */}
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                {brainTabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      selected === tab.id
                        ? `bg-gradient-to-r ${
                            getBrainColor(tab.id).gradient
                          } text-white shadow-lg`
                        : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelected(tab.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon icon={tab.icon} className="h-5 w-5" />
                    {tab.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Brain information panel */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <div
                className={`rounded-3xl border ${brainColor.border} bg-gradient-to-br ${brainColor.bgGradient} relative overflow-hidden p-8`}
              >
                {/* Decorative icon */}
                <div className="absolute -bottom-10 -right-10 opacity-5">
                  <Icon icon={`${brainColor.icon}`} className="h-56 w-56" />
                </div>

                <div className="relative z-10">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${brainColor.gradient} mb-6 shadow-lg`}
                  >
                    <Icon
                      icon={`${brainColor.icon}`}
                      className="h-7 w-7 text-white"
                    />
                  </div>

                  <h3
                    className={`mb-4 bg-gradient-to-r bg-clip-text font-raleway text-3xl font-light text-transparent md:text-4xl ${brainColor.gradient}`}
                  >
                    {BRAIN_DATA[selected].title}
                  </h3>

                  <div className="space-y-4">
                    {BRAIN_DATA[selected].description
                      .split('\n')
                      .map((paragraph, idx) => (
                        <motion.p
                          key={`${paragraph.substring(0, 20)}-${idx}`}
                          className="dark:text-dark-text-secondary text-sm leading-relaxed text-gray-700"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * idx }}
                        >
                          {paragraph.trim()}
                        </motion.p>
                      ))}
                  </div>

                  <div className="mt-8">
                    {/* <motion.button
                      className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3 ${brainColor.gradient} font-medium text-white shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon icon="tabler:book" className="h-5 w-5" />
                      Learn More
                    </motion.button> */}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsBrain;
