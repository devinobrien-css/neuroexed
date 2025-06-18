import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-gray-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 rounded-full bg-tiffany-blue/30 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-96 w-96 translate-y-1/2 rounded-full bg-blue-500/30 blur-3xl"></div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 font-raleway text-4xl font-light text-white md:text-5xl">
              Join Our Research Community
            </h2>
            <p className="mb-10 text-xl text-gray-300">
              Interested in our research? Subscribe to our newsletter for the
              latest updates on our work, publications, and upcoming events.
            </p>

            <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="grow rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tiffany-blue"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-gradient-to-r from-tiffany-blue to-blue-500 px-8 py-3 font-medium text-white shadow-lg"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            <div className="p-6 text-center">
              <div className="mb-4 inline-flex rounded-full bg-white/10 p-4 backdrop-blur-sm">
                <Icon icon="tabler:mail" className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-white">
                Contact Us
              </h3>
              <p className="text-gray-300">
                Have questions about our research? Reach out to us at{' '}
                <a
                  href="mailto:info@neuroexed.org"
                  className="text-tiffany-blue hover:underline"
                >
                  info@neuroexed.org
                </a>
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="mb-4 inline-flex rounded-full bg-white/10 p-4 backdrop-blur-sm">
                <Icon icon="tabler:users" className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-white">
                Collaborate
              </h3>
              <p className="text-gray-300">
                Interested in collaborating with our lab? We're always looking
                for new research partners.
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="mb-4 inline-flex rounded-full bg-white/10 p-4 backdrop-blur-sm">
                <Icon icon="tabler:school" className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-white">
                Join Our Team
              </h3>
              <p className="text-gray-300">
                We have opportunities for students, researchers, and educators
                to join our diverse team.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
