import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Navbar from '../../../shared/components/Navbar';

const ProfessionalWisdomSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const stats = [
    { number: '2024', label: 'Publication Year', icon: 'tabler:calendar' },
    { number: 'Career', label: 'Preparation Focus', icon: 'tabler:briefcase' },
    { number: 'Practical', label: 'Guidance', icon: 'tabler:lightbulb' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-dark-bg">
      <Navbar />

      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 dark:from-dark-surface/50 dark:via-dark-border/30 dark:to-dark-surface/50">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23F59E0B\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* White fade at top */}
      <div className="absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-white to-transparent dark:from-dark-bg dark:to-transparent" />

      <div className="relative z-30 mx-auto max-w-7xl px-4 py-20">
        {/* Main Hero Section */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Book Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Floating Decorations */}
            <div className="absolute -inset-12 opacity-60">
              <motion.div
                className="absolute left-8 top-12 h-20 w-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 blur-xl"
                animate={{ y: [0, -15, 0], opacity: [0.6, 0.8, 0.6] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute right-12 top-20 h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 blur-lg"
                animate={{ y: [0, 20, 0], opacity: [0.5, 0.7, 0.5] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
              <motion.div
                className="absolute bottom-16 left-16 h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 blur-md"
                animate={{ y: [0, -10, 0], opacity: [0.4, 0.6, 0.4] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }}
              />
            </div>

            {/* Book Container */}
            <div className="relative mx-auto max-w-sm">
              <motion.div
                className="relative rounded-2xl bg-white shadow-2xl dark:bg-dark-surface"
                animate={{
                  rotateY: isHovered ? 8 : 0,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 p-1">
                  <div className="h-full w-full rounded-2xl bg-white dark:bg-dark-surface" />
                </div>

                {/* Book Image */}
                <div className="relative z-10 p-6">
                  <div className="aspect-[3/4] w-full bg-professional-wisdom bg-contain bg-center bg-no-repeat" />
                </div>

                {/* Professional Badge */}
                <motion.div
                  className="absolute -right-3 -top-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 p-3 text-white shadow-lg"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <Icon icon="tabler:briefcase" className="h-5 w-5" />
                </motion.div>
              </motion.div>

              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 blur-xl" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 text-sm font-medium text-amber-700 dark:from-amber-900/30 dark:to-orange-900/30 dark:text-amber-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Icon icon="tabler:briefcase" className="h-4 w-4" />
              Career Development Guide
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-raleway text-5xl font-light leading-tight lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Professional Wisdom
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl font-light text-gray-600 dark:text-dark-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              A Guide for College Students Navigating Their Career Journey
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                    <Icon icon={stat.icon} className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-dark-text">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-dark-text-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg leading-relaxed text-gray-700 dark:text-dark-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              Professional Wisdom provides essential guidance for college students as they navigate their career journey. This practical resource combines real-world insights with actionable advice to help students make informed decisions about their professional futures. From internships to networking, job searching to career pivots, this book offers the wisdom students need to succeed in today's competitive landscape.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-4 font-medium text-white shadow-lg transition-all"
                onClick={() =>
                  window.open(
                    'https://www.amazon.com/Professional-Wisdom-College-Students-Career/dp/1646872045',
                    '_blank',
                  )
                }
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon="tabler:shopping-cart" className="h-5 w-5" />
                Buy on Amazon
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-12 text-center font-raleway text-3xl font-light text-gray-800 dark:text-gray-300">
              What Readers Are Saying
            </h3>

            <div className="grid gap-8 md:grid-cols-2">
              {/* First Testimonial */}
              <motion.div
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-xl dark:from-dark-surface/80 dark:to-dark-border/60"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorations */}
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-amber-200/20 to-orange-200/20" />
                
                <div className="relative z-10">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-gradient-to-r from-amber-500 to-orange-600 p-3">
                      <Icon icon="tabler:quote" className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <blockquote className="mb-6 text-center text-lg italic text-gray-700 dark:text-dark-text-secondary">
                    "An invaluable resource that bridges the gap between academic learning and professional success. Essential reading for any college student serious about their career."
                  </blockquote>

                  <div className="text-center">
                    <cite className="flex items-center justify-center gap-2 text-lg font-medium text-gray-800 dark:text-dark-text">
                      <Icon
                        icon="tabler:user-circle"
                        className="h-5 w-5 text-amber-500"
                      />
                      Career Development Professional
                    </cite>
                    <p className="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">
                      University Career Services
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Second Testimonial */}
              <motion.div
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-yellow-50 p-8 shadow-xl dark:from-dark-surface/80 dark:to-dark-border/60"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorations */}
                <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-gradient-to-br from-orange-200/20 to-yellow-200/20" />
                
                <div className="relative z-10">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-gradient-to-r from-orange-500 to-yellow-600 p-3">
                      <Icon icon="tabler:star" className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <blockquote className="mb-6 text-center text-lg italic text-gray-700 dark:text-dark-text-secondary">
                    "Practical, actionable advice that every student needs. This book transformed how I approach my career planning and networking."
                  </blockquote>

                  <div className="text-center">
                    <cite className="flex items-center justify-center gap-2 text-lg font-medium text-gray-800 dark:text-dark-text">
                      <Icon
                        icon="tabler:user-circle"
                        className="h-5 w-5 text-orange-500"
                      />
                      Recent Graduate
                    </cite>
                    <p className="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">
                      Business Administration Major
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-4 font-raleway text-3xl font-light text-gray-800 dark:text-dark-text">
              Ready to Navigate Your Career Journey?
            </h3>
            <p className="mb-8 text-lg text-gray-600 dark:text-dark-text-secondary">
              Join thousands of students who have discovered practical wisdom for professional success
            </p>

            <motion.button
              className="group mx-auto flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 px-10 py-5 font-medium text-white shadow-xl transition-all"
              onClick={() =>
                window.open(
                  'https://www.amazon.com/Professional-Wisdom-College-Students-Career/dp/1646872045',
                  '_blank',
                )
              }
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="tabler:book" className="h-5 w-5" />
              Get Your Copy Today
              <Icon
                icon="tabler:arrow-right"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfessionalWisdomSection;