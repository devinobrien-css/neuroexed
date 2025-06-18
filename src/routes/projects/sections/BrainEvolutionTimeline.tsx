import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

// Timeline data for brain evolution exploration
const TIMELINE_DATA = [
  {
    era: '500 MYA',
    period: 'Early Vertebrates',
    brainType: 'reptilian',
    color: 'emerald',
    icon: 'fluent-emoji-high-contrast:lizard',
    title: 'The Reptilian Foundation',
    description:
      'The emergence of the brainstem and basic survival circuits. This ancient brain controlled breathing, heart rate, and fundamental survival instincts.',
    discoveries: [
      'Basic motor control systems',
      'Autonomic nervous system',
      'Fight-or-flight responses',
      'Territorial behaviors',
    ],
    significance: 'Established the foundation for all higher brain functions',
  },
  {
    era: '200 MYA',
    period: 'Early Mammals',
    brainType: 'paleomammalian',
    color: 'red',
    icon: 'tabler:activity',
    title: 'The Emotional Brain Emerges',
    description:
      'The limbic system evolved, bringing emotions, memory formation, and social bonding capabilities to early mammals.',
    discoveries: [
      'Hippocampus for memory',
      'Amygdala for emotions',
      'Social bonding mechanisms',
      'Reward and punishment systems',
    ],
    significance:
      'Created the capacity for learning from experience and emotional decision-making',
  },
  {
    era: '65 MYA',
    period: 'Primate Evolution',
    brainType: 'neomammalian',
    color: 'blue',
    icon: 'tabler:brain',
    title: 'The Thinking Brain',
    description:
      'The neocortex expanded dramatically, enabling abstract thought, language, planning, and complex problem-solving.',
    discoveries: [
      'Language processing centers',
      'Abstract reasoning',
      'Tool use and creation',
      'Self-awareness and consciousness',
    ],
    significance:
      'Enabled human civilization, science, and educational systems',
  },
  {
    era: '1960s',
    period: 'Modern Discovery',
    brainType: 'integration',
    color: 'purple',
    icon: 'tabler:microscope',
    title: 'The Triune Brain Model',
    description:
      'Paul MacLean\'s groundbreaking research revealed how these three brain systems work together, revolutionizing neuroscience education.',
    discoveries: [
      'Brain hierarchy understanding',
      'Evolutionary psychology',
      'Educational neuroscience',
      'Integrated learning approaches',
    ],
    significance:
      'Transformed how we understand learning, behavior, and human development',
  },
];

export const BrainEvolutionTimeline = () => {
  const [selectedTimeline, setSelectedTimeline] = useState(0);

  const getColorClasses = (color: string) => {
    switch (color) {
    case 'emerald':
      return {
        gradient: 'from-emerald-500 to-emerald-600',
        bgGradient: 'from-emerald-500/10 to-emerald-600/5',
        border: 'border-emerald-500/20',
        dot: 'bg-emerald-500',
        line: 'bg-emerald-200',
      };
    case 'red':
      return {
        gradient: 'from-red-500 to-red-600',
        bgGradient: 'from-red-500/10 to-red-600/5',
        border: 'border-red-500/20',
        dot: 'bg-red-500',
        line: 'bg-red-200',
      };
    case 'blue':
      return {
        gradient: 'from-blue-500 to-blue-600',
        bgGradient: 'from-blue-500/10 to-blue-600/5',
        border: 'border-blue-500/20',
        dot: 'bg-blue-500',
        line: 'bg-blue-200',
      };
    case 'purple':
      return {
        gradient: 'from-purple-500 to-purple-600',
        bgGradient: 'from-purple-500/10 to-purple-600/5',
        border: 'border-purple-500/20',
        dot: 'bg-purple-500',
        line: 'bg-purple-200',
      };
    default:
      return {
        gradient: 'from-gray-500 to-gray-600',
        bgGradient: 'from-gray-500/10 to-gray-600/5',
        border: 'border-gray-500/20',
        dot: 'bg-gray-500',
        line: 'bg-gray-200',
      };
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-sm font-semibold uppercase tracking-wider text-transparent">
            Evolution Timeline
          </span>
          <h2 className="mb-6 font-raleway text-4xl font-light md:text-5xl">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Journey Through Brain Evolution
            </span>
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
          <p className="mx-auto max-w-3xl text-gray-600">
            Discover how millions of years of evolution shaped the triune brain
            model and revolutionized our understanding of learning and
            cognition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Timeline Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="mb-6 text-xl font-semibold text-gray-800">
                Evolution Timeline
              </h3>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200"></div>

                {TIMELINE_DATA.map((item, index) => {
                  const colors = getColorClasses(item.color);
                  const isSelected = selectedTimeline === index;

                  return (
                    <motion.div
                      key={`${item.era}-${item.period}`}
                      className="relative mb-8 cursor-pointer"
                      onClick={() => setSelectedTimeline(index)}
                      whileHover={{ x: 4 }}
                    >
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-4 h-4 w-4 rounded-full border-4 border-white shadow-md transition-all ${
                          isSelected ? colors.dot : 'bg-gray-300'
                        }`}
                      ></div>

                      {/* Content */}
                      <div className="ml-12">
                        <div
                          className={`rounded-lg border p-4 transition-all ${
                            isSelected
                              ? `${colors.border} ${colors.bgGradient} shadow-lg`
                              : 'border-gray-200 bg-white hover:shadow-md'
                          }`}
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <Icon
                              icon={item.icon}
                              className={`h-5 w-5 ${
                                isSelected ? 'text-gray-700' : 'text-gray-500'
                              }`}
                            />
                            <span
                              className={`text-sm font-bold ${
                                isSelected ? 'text-gray-800' : 'text-gray-600'
                              }`}
                            >
                              {item.era}
                            </span>
                          </div>
                          <div
                            className={`text-sm ${
                              isSelected ? 'text-gray-700' : 'text-gray-600'
                            }`}
                          >
                            {item.period}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content Panel */}
          <div className="lg:col-span-2">
            <motion.div
              key={selectedTimeline}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              {(() => {
                const item = TIMELINE_DATA[selectedTimeline];
                const colors = getColorClasses(item.color);

                return (
                  <div
                    className={`relative h-full overflow-hidden rounded-3xl border ${colors.border} bg-gradient-to-br ${colors.bgGradient} p-8`}
                  >
                    {/* Decorative background icon */}
                    <div className="absolute -bottom-10 -right-10 opacity-5">
                      <Icon icon={item.icon} className="h-56 w-56" />
                    </div>

                    <div className="relative z-10 h-full">
                      {/* Header */}
                      <div className="mb-8">
                        <div
                          className={`inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${colors.gradient} mb-4 shadow-lg`}
                        >
                          <Icon
                            icon={item.icon}
                            className="h-8 w-8 text-white"
                          />
                        </div>

                        <div className="mb-2 flex items-center gap-3">
                          <span
                            className={`rounded-full bg-gradient-to-r ${colors.gradient} px-3 py-1 text-sm font-bold text-white`}
                          >
                            {item.era}
                          </span>
                          <span className="text-sm text-gray-600">
                            {item.period}
                          </span>
                        </div>

                        <h3
                          className={`mb-4 bg-gradient-to-r ${colors.gradient} bg-clip-text font-raleway text-3xl font-light text-transparent md:text-4xl`}
                        >
                          {item.title}
                        </h3>

                        <p className="leading-relaxed text-gray-700">
                          {item.description}
                        </p>
                      </div>

                      {/* Key Discoveries */}
                      <div className="mb-8">
                        <h4 className="mb-4 text-lg font-semibold text-gray-800">
                          Key Discoveries & Features
                        </h4>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {item.discoveries.map((discovery, idx) => (
                            <motion.div
                              key={`${discovery}-${idx}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 * idx }}
                              className="flex items-center gap-3 rounded-lg bg-white/60 p-3"
                            >
                              <div
                                className={`h-2 w-2 rounded-full bg-gradient-to-r ${colors.gradient}`}
                              ></div>
                              <span className="text-sm text-gray-700">
                                {discovery}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Significance */}
                      <div
                        className={`rounded-xl border ${colors.border} bg-white/40 p-6`}
                      >
                        <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-800">
                          <Icon icon="tabler:lightbulb" className="h-5 w-5" />
                          Educational Significance
                        </h4>
                        <p className="leading-relaxed text-gray-700">
                          {item.significance}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        </div>

        {/* Interactive Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h4 className="mb-4 text-center text-lg font-semibold text-gray-800">
              Evolution Progress
            </h4>
            <div className="relative h-3 rounded-full bg-gray-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 via-red-500 to-purple-500"
                initial={{ width: '0%' }}
                animate={{
                  width: `${
                    ((selectedTimeline + 1) / TIMELINE_DATA.length) * 100
                  }%`,
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              ></motion.div>
            </div>
            <div className="mt-4 flex justify-between text-xs text-gray-600">
              <span>Reptilian Brain</span>
              <span>Paleomammalian</span>
              <span>Neomammalian</span>
              <span>Modern Understanding</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
