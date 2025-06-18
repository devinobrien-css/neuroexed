import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedBrain from '../../../shared/components/AnimatedBrain';

const LandingRedirect = () => {
  const navigate = useNavigate();

  const redirectItems = [
    {
      title: 'Papers',
      description: 'Our papers and articles on The Other Lobe',
      icon: 'tabler:file-text',
      onClick: () => (window.location.href = 'https://www.otherlobe.com'),
      color:
        'from-blue-500/20 to-blue-600/10 hover:from-blue-500/30 hover:to-blue-600/20',
      iconBg: 'bg-blue-400/80',
    },
    {
      title: 'Books',
      description: 'Our recent publications',
      icon: 'tabler:book',
      onClick: () => navigate('publications'),
      color:
        'from-emerald-500/20 to-emerald-600/10 hover:from-emerald-500/30 hover:to-emerald-600/20',
      iconBg: 'bg-emerald-400/80',
    },
    {
      title: 'Podcasts',
      description: 'Our podcasts with guest speakers',
      icon: 'tabler:microphone',
      onClick: () =>
        (window.location.href = 'https://experienced.simplecast.com/'),
      color:
        'from-purple-500/20 to-purple-600/10 hover:from-purple-500/30 hover:to-purple-600/20',
      iconBg: 'bg-purple-400/80',
    },
    {
      title: 'People',
      description: 'The members of our lab team',
      icon: 'tabler:users',
      onClick: () => navigate('people'),
      color:
        'from-amber-500/20 to-amber-600/10 hover:from-amber-500/30 hover:to-amber-600/20',
      iconBg: 'bg-amber-400/80',
    },
    {
      title: 'Projects',
      description: 'Our collaborative work broken down into clusters',
      icon: 'tabler:clipboard-text',
      onClick: () => navigate('projects'),
      color:
        'from-red-500/20 to-red-600/10 hover:from-red-500/30 hover:to-red-600/20',
      iconBg: 'bg-red-400/80',
    },
    {
      title: 'Affiliates',
      description: 'Our affiliates and collaborators',
      icon: 'tabler:building-community',
      onClick: () => navigate('affiliations'),
      color:
        'from-indigo-500/20 to-indigo-600/10 hover:from-indigo-500/30 hover:to-indigo-600/20',
      iconBg: 'bg-indigo-400/80',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-16 md:py-32">
      {/* Background design elements */}
      <div className="absolute inset-0 -z-10">
        {/* Neural network background pattern */}
        <div className="absolute left-0 top-0 h-full w-full bg-[url('/img/neural-pattern.png')] bg-repeat opacity-5"></div>

        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,222,222,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(77,171,247,0.1),transparent_60%)]"></div>

        {/* Animated particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute h-1 w-1 rounded-full bg-blue-400/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="mb-4 font-raleway text-4xl font-light text-white md:text-6xl">
            Start{' '}
            <span className="bg-gradient-to-r from-tiffany-blue to-blue-400 bg-clip-text text-transparent">
              Exploring
            </span>{' '}
            Our Lab
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-500"></div>
          <p className="mx-auto max-w-2xl text-lg font-light text-gray-300">
            Discover our research, publications, team members and more
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          {/* Enlarged Brain Animation - Takes center stage */}
          <motion.div
            className="relative order-1 lg:order-1 lg:col-span-7"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedBrain />
          </motion.div>

          {/* Navigation Cards - Now secondary and to the side */}
          <motion.div
            className="order-2 lg:order-2 lg:col-span-5"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Simplified Card Grid - Now with dark theme */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {redirectItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-200 hover:border-tiffany-blue/30 hover:shadow-md"
                  variants={item}
                  whileHover={{ y: -3 }}
                >
                  <button
                    onClick={item.onClick}
                    className="flex h-full w-full flex-col items-center p-4 text-center lg:items-start lg:p-5 lg:text-left"
                  >
                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg} text-white shadow-lg`}
                    >
                      <Icon icon={item.icon} className="h-5 w-5" />
                    </div>

                    <h3 className="mb-1 text-base font-medium text-white transition-colors group-hover:text-tiffany-blue">
                      {item.title}
                    </h3>

                    <p className="text-xs font-light text-gray-400">
                      {item.description}
                    </p>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Main focus call-to-action */}
            <motion.div
              className="mt-6 text-center lg:text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button
                onClick={() => navigate('/projects')}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all hover:translate-y-[-2px] hover:shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Discover Our Research
                <Icon
                  icon="tabler:arrow-right"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingRedirect;
