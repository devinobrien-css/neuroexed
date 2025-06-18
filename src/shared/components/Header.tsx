import { motion } from 'framer-motion';
import NeuralNetworkBackground from './NeuralNetworkBackground';

interface HeaderProps {
  title: string;
  sub_title: string;
}

const Header = ({ title, sub_title }: HeaderProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 pt-16">
      {/* Neural Network Animation Background */}
      <NeuralNetworkBackground />

      <div className="absolute inset-0">
        {/* Existing gradient overlays can remain for additional depth */}
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-tiffany-blue/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>

        <motion.div
          className="absolute -top-12 left-1/3 h-32 w-32 rounded-full bg-blue-400/20"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute right-1/4 top-1/2 h-24 w-24 rounded-full bg-tiffany-blue/20"
          animate={{
            y: [0, -15, 0],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="font-raleway text-4xl font-light leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {title.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="mr-4 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <p className="mx-auto max-w-2xl font-lato text-xl font-light text-gray-100 md:text-2xl">
              {sub_title}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#blogs"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-gray-800 shadow-lg transition-all hover:bg-gray-100"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 9L12 16L5 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Explore Our Work
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 80"
          className="fill-white"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Header;
