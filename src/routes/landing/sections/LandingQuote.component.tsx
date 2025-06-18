import { motion } from 'framer-motion';
import { Brain } from '../../../shared/assets/img/Brain';

const LandingQuote = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="relative mx-auto flex max-w-screen-2xl flex-col lg:flex-row">
        <div className="p-4 py-12 sm:p-8 sm:py-24 md:px-16 lg:py-48">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-8 lg:mb-16"
          >
            <div className="mx-auto max-w-xl md:mx-0">
              <div className="flex">
                <div className="mr-2 shrink-0">
                  <span className="block h-8 w-1.5 rounded bg-tiffany-blue sm:h-12"></span>
                </div>
                <div>
                  <p className="mx-auto text-center font-lato text-xl font-light leading-tight text-gray-800 sm:text-2xl md:text-left md:text-3xl lg:text-4xl">
                    "The heart has reasons of which reason does not know."
                  </p>
                  <p className="mt-3 text-right text-sm font-light text-gray-600 sm:mt-4 sm:text-base md:text-left lg:text-lg">
                    - Blaise Pascale, 1623-62, mathematician, physicist,
                    philosopher
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="max-w-3xl">
              <p className="text-center text-base font-light leading-relaxed sm:text-lg md:w-full md:text-left lg:text-xl">
                <span className="font-bold text-tiffany-blue">
                  The Stellar Research Lab
                </span>{' '}
                is made up of an interdisciplinary team of neuroscience
                enthusiasts. A common interest in the importance of experiential
                learning and the brain basis of decision making unites us to
                explore this challenging yet exciting area.
              </p>
              <div className="mt-6 rounded-r-lg border-l-4 border-tiffany-blue bg-gray-50 p-4 shadow-sm sm:mt-8 sm:p-6">
                <p className="text-center text-sm font-light sm:text-base md:text-left lg:text-lg">
                  Because of our unique, oftentimes non-neuroscientist
                  backgrounds, the lab is able to approach topics from
                  nontraditional point of view to compose unique assortments of
                  blogs, papers, podcasts and books for the fellow curious
                  mind...
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mr-4 flex justify-center lg:my-auto">
          <Brain className="h-[90vw] w-[90vw] sm:h-[40vw] sm:w-[40vw] lg:h-[30vw] lg:w-[30vw]" />
        </div>
      </div>
    </div>
  );
};

export default LandingQuote;
