import { motion } from 'framer-motion';
import { useState } from 'react';
import { Icon } from '@iconify/react';

const ProjectsValues = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const values = [
    {
      title: 'The Experiential Development of Professional Wisdom',
      content: `Student development of "so-called" soft-skills, professional
      knowledge, entrepreneurship, and even wisdom through experiential
      education is seen as a natural progression with age and with
      experiential activities. This project examines how learning from
      experience in conjunction with a strong academic curriculum can
      develop expertise in a skill and thinking area. Knowing the modern
      view of neuroplasticity, it also looks at factors such as
      engagement that produce brain and behavioral changes. Knowing
      modern neuroscience, it looks at cognitive-emotional integration
      as below.`,
      icon: 'bulb',
    },
    {
      title: 'Cognitive-Emotional Brain Circuit Integration and Reflection',
      content: `Reflection facilitates the integration of emotion with cognition
      in producing student maturity from experiential education. While
      focused on the neuroscience of brain areas and networks from brain
      scanner studies, this project also learns from other fields such
      as art/music, social psychology/sociology, philosophy, etc. A
      particular interest is in the two-way communication between
      unconscious (mammalian brain) and conscious (primate brain)
      decision-making brain circuits and its enhancement over time. We
      also are interested in parallels to mindfulness and growth mindset
      practices.`,
      icon: 'brain-circuit',
    },
    {
      title: 'Diversity and inclusion',
      content: `Using experiential education thinking to promote students taking
      agency in working with diverse groups of college students for a
      diverse world is the focus of this project. Several members of the
      lab recently produced a book on this topic, using student and
      alumni stories to illustrate basic social neuroscience principles
      of relevant unconscious decision-making. There is no question that
      diversity/inclusion generally is a compelling issue of our time
      inside and outside of the college experience and is an ongoing
      interest of the lab.`,
      icon: 'diversity',
    },
    {
      title: 'Engaged Teaching',
      content: `Applying lessons from experiential education and the above
      projects, the goal here is to better reach, engage, and promote
      active learning in all classroom students, ranging from those who
      are passionate about the topic to those who may lack confidence or
      are otherwise less engaged. We are currently using a balanced
      hybrid, flipped-classroom teaching model with group work and
      continuous student feedback in an introductory psychology class
      that the lab director teaches every semester and which has
      research assistance from lab members.`,
      icon: 'teaching',
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

  const iconMap = {
    bulb: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-3 7h6c.55 0 1 .45 1 1s-.45 1-1 1h-6c-.55 0-1-.45-1-1s.45-1 1-1zm0 3h6c.55 0 1 .45 1 1s-.45 1-1 1h-6c-.55 0-1-.45-1-1s.45-1 1-1z',
    'brain-circuit':
      'M14,8c0,2.21-1.79,4-4,4s-4-1.79-4-4c0-2.21,1.79-4,4-4S14,5.79,14,8z M10,14c-4.42,0-8,1.79-8,4v2h16v-2 C18,15.79,14.42,14,10,14z',
    diversity:
      'M16 2c-3.31 0-6 2.69-6 6 0 3.07 2.32 5.59 5.14 5.97l.86.03.86-.03c2.82-.38 5.14-2.9 5.14-5.97 0-3.31-2.69-6-6-6zm0 10h-2V8h-2V6h2V4h2v2h2v2h-2v2zm-4 4H8v2H6v-2H4v-2h2v-2h2v2h2v2zm11.86-2.07l-2.83-2.83a.996.996 0 0 0-1.41 0L10 20.69l-5.66-5.66a.996.996 0 0 0-1.41 0L0 18.31l1.06 1.06 2.83 2.83L5 23.31l1.41-1.41L10 17.31l1.41 1.41 1.41-1.41z',
    teaching:
      'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
  };

  return (
    <section className="relative overflow-hidden py-28">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
        <div className="absolute left-0 top-0 h-full w-full bg-[url('/img/neural-pattern.png')] bg-repeat opacity-5"></div>

        {/* Animated dots representing neural connections */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-white opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Moving neural connection lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
            style={{
              width: `${Math.random() * 30 + 20}%`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 70}%`,
              rotate: `${Math.random() * 60 - 30}deg`,
            }}
            animate={{
              opacity: [0, 0.15, 0],
              x: ['-50%', '100%'],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto max-w-7xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-3 inline-block bg-gradient-to-r from-tiffany-blue to-blue-500 bg-clip-text text-sm font-semibold uppercase tracking-wider text-transparent">
            Our Philosophy
          </span>
          <h2 className="mb-6 font-raleway text-5xl font-light text-white md:text-6xl">
            Core Research Values
          </h2>
          <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-500"></div>
          <p className="mx-auto max-w-2xl text-lg font-light text-gray-300">
            Our lab's foundational principles guide our research and shape our
            approach to understanding the intersection of neuroscience and
            education.
          </p>
        </motion.div>

        {/* Interactive values navigation */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {values.map((value, index) => (
            <motion.button
              key={index}
              className={`rounded-xl px-5 py-3 text-sm font-medium transition-all ${
                activeIndex === index
                  ? 'bg-white text-gray-800'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {value.title.split(' ').slice(0, 2).join(' ')}...
            </motion.button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          {/* Value cards - larger active card with animations */}
          <motion.div
            className="col-span-full md:col-span-3"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            key={activeIndex}
          >
            <div className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[2px]">
              <div className="relative h-full p-8 md:p-10">
                {/* Animated icon */}
                <motion.div
                  className="absolute right-6 top-6 h-24 w-24 text-white/10"
                  initial={{ opacity: 0.05, scale: 0.9, rotate: -10 }}
                  animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <svg viewBox="0 0 24 24" className="h-full w-full">
                    <path d={iconMap[values[activeIndex].icon]} />
                  </svg>
                </motion.div>

                <div className="relative z-10">
                  <div className="mb-6 flex items-start">
                    <div className="mr-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-tiffany-blue to-blue-500">
                      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
                        <path d={iconMap[values[activeIndex].icon]} />
                      </svg>
                    </div>
                    <h3 className="font-raleway text-2xl font-light text-white transition-colors group-hover:text-tiffany-blue md:text-3xl">
                      {values[activeIndex].title}
                    </h3>
                  </div>

                  <motion.p
                    className="pl-0 font-lato text-lg font-light leading-relaxed text-gray-200 md:pl-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {values[activeIndex].content}
                  </motion.p>

                  {/* <motion.div
                    className="mt-8 pl-0 md:pl-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <button className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 font-medium text-white transition-colors hover:bg-white/20">
                      Learn More{' '}
                      <Icon icon="tabler:arrow-right" className="h-4 w-4" />
                    </button>
                  </motion.div> */}
                </div>

                {/* Decorative gradient line */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-tiffany-blue via-blue-500 to-transparent"></div>
              </div>
            </div>
          </motion.div>

          {/* Mini cards for non-active values */}
          <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2 md:grid-cols-1">
            {values
              .filter((_, i) => i !== activeIndex)
              .slice(0, 2)
              .map((value, index) => (
                <motion.div
                  key={index}
                  className="cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[2px]"
                  onClick={() => setActiveIndex(values.indexOf(value))}
                  whileHover={{
                    y: -4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6">
                    <div className="mb-3 flex items-center">
                      <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                          <path d={iconMap[value.icon]} />
                        </svg>
                      </div>
                      <h3 className="font-raleway text-lg text-white">
                        {value.title}
                      </h3>
                    </div>
                    <p className="line-clamp-2 pl-0 text-sm text-gray-300">
                      {value.content}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsValues;
