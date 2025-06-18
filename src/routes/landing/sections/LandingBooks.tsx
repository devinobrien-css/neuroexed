import { motion } from 'framer-motion';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export const LandingBooks = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const books = [
    {
      title: 'Diversity at College',
      image: './img/diversity.png',
      description: `In 2020, eight lab members and recent college graduates produced
        a book, Diversity at College: Real Stories of Students
        Conquering Bias and Making Higher Education more Inclusive. The
        book is fully co-authored (not edited) and applies lessons from
        experiential education and social neuroscience thinking to five
        key student-centered stories, such as implicit bias or
        stereotype threat. The book was named as finalist for the 2021
        Indie book awards in the social change category and serves as a
        basis for recent panel discussions.`,
      url: 'https://www.amazon.com/Diversity-College-Conquering-Education-Inclusive/dp/1646870352',
      color: 'from-tiffany-blue to-blue-600',
      lightColor: 'from-purple-100 to-blue-100',
      icon: 'material-symbols:diversity-3-rounded',
      award: {
        name: '2021 Indie Book Awards Finalist',
        image: './img/indie-award.png',
      },
    },
    {
      title: 'Education That Works',
      image: './img/education.png',
      description: `Experiential Education complements the classical academic nature
        of the classroom-based college experience by bringing in direct
        experience with industry, non-profits, and governments. In 2017,
        Stellar wrote a book on this topic, Education that Works: The
        Neuroscience of Building a more Effective Higher Education. The
        book argues that due to how the brain works, students develop
        insight, maturity, and even a passion for their career growth,
        as well as key work-place skills and abilities that make them of
        good students, good citizens, and good employees.`,
      url: 'https://www.amazon.com/Education-That-Works-Neuroscience-Effective/dp/1940858216',
      color: 'from-teal-600 to-blue-600',
      lightColor: 'from-teal-100 to-blue-100',
      icon: 'tabler:school',
      award: null,
    },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Dynamic background */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-700 ${books[activeIndex].color}`}
        ></div>

        {/* Animated background shapes */}
        <motion.div
          className={`absolute -left-16 top-20 h-64 w-64 rounded-full bg-gradient-to-r ${books[activeIndex].color} opacity-10 blur-3xl`}
          animate={{
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className={`absolute bottom-20 right-20 h-80 w-80 rounded-full bg-gradient-to-r ${books[activeIndex].color} opacity-10 blur-3xl`}
          animate={{
            y: [0, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 font-raleway text-4xl font-light md:text-5xl">
            <span className="bg-gradient-to-r from-tiffany-blue to-blue-600 bg-clip-text text-transparent">
              Our Publications
            </span>
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600"></div>
          <p className="mx-auto max-w-2xl text-gray-600">
            Explore our books that blend neuroscience insights with educational
            practices, offering innovative perspectives on learning and
            development.
          </p>

          {/* Book selection tabs */}
          <div className="mt-8 flex justify-center space-x-2">
            {books.map((book, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full px-4 py-2 transition-all ${
                  activeIndex === idx
                    ? `bg-gradient-to-r ${book.color} text-white shadow-lg`
                    : `bg-gradient-to-r ${book.lightColor} text-gray-700 hover:text-gray-900`
                }`}
              >
                {book.title}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Book image with 3D effect and animations */}
          <motion.div
            key={`image-${activeIndex}`}
            initial={{ opacity: 0, rotateY: -20, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 20, scale: 0.9 }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="relative mx-auto"
          >
            {/* 3D book shadow */}
            {/* <div className="absolute -right-4 bottom-0 -z-10 h-[92%] w-[90%] rounded bg-black/20 blur-xl"></div> */}

            {/* The book */}
            <motion.div
              className="perspective-1000 relative"
              whileHover={{
                rotateY: 10,
                scale: 1.05,
                transition: { duration: 0.5 },
              }}
            >
              {/* Book cover */}
              <div className="relative float-right w-1/2 overflow-hidden">
                <img
                  src={books[activeIndex].image}
                  alt={`${books[activeIndex].title} book cover`}
                  className="h-auto"
                />

                {/* Glossy overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30"></div>
              </div>

              {/* Book spine */}
              <div
                className={`absolute inset-y-0 left-0 w-4 bg-gradient-to-r${books[activeIndex].color} -translate-x-2 rounded-l-lg`}
              ></div>

              {/* Award badge if applicable */}
              {books[activeIndex].award && (
                <motion.div
                  className="absolute -right-6 -top-6 h-28 w-28"
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <div className="relative h-full w-full">
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white p-2 shadow-lg">
                      <img
                        src={books[activeIndex].award?.image || ''}
                        alt={books[activeIndex].award?.name || 'Award'}
                        className="h-16 w-16 object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Book details */}
          <motion.div
            key={`details-${activeIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <div
              className={`self-start rounded-full bg-gradient-to-r p-3 ${books[activeIndex].color} mb-6 text-white`}
            >
              <Icon
                icon={`${books[activeIndex].icon}`}
                width={28}
                height={28}
              />
            </div>

            <h3 className="mb-6 font-raleway text-3xl font-light text-gray-800 md:text-4xl">
              {books[activeIndex].title}
            </h3>

            {/* Animated text reveal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <p className="mb-8 leading-relaxed text-gray-600">
                {books[activeIndex].description}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <motion.a
                  href={books[activeIndex].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 bg-gradient-to-r px-6 py-3 ${books[activeIndex].color} rounded-full text-white shadow-lg`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon icon="tabler:shopping-cart" className="h-5 w-5" />
                  Purchase on Amazon
                </motion.a>

                <motion.button
                  className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-100"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon icon="tabler:book-open" className="h-5 w-5" />
                  Preview Pages
                </motion.button>
              </div>

              {/* Book details tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  <Icon icon="tabler:calendar" className="h-4 w-4" />
                  {activeIndex === 0 ? '2020' : '2017'}
                </div>
                <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  <Icon icon="tabler:book" className="h-4 w-4" />
                  {activeIndex === 0 ? '208 pages' : '192 pages'}
                </div>
                <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  <Icon icon="tabler:users" className="h-4 w-4" />
                  {activeIndex === 0 ? '8 authors' : '1 author'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Book quotes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-24"
        >
          <div
            className={`relative mx-auto max-w-4xl rounded-xl bg-gradient-to-br p-8 ${books[activeIndex].lightColor} shadow-lg`}
          >
            <div className="absolute -left-6 -top-6">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                className={`text-gradient-to-r ${books[activeIndex].color} opacity-30`}
              >
                <path
                  fill="currentColor"
                  d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.871 3.871 0 0 1-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5a3.871 3.871 0 0 1-2.748-1.179z"
                />
              </svg>
            </div>

            <blockquote className="relative z-10 italic text-gray-700">
              {activeIndex === 0
                ? 'An illuminating exploration of how colleges can support diversity. The book succeeds in its presentation of realistic and attainable tactics schools can implement based on the contributors\' experiences.'
                : 'At a time when states across the nation are mandating experiential learning in higher education, this beautiful book educates and inspires us about the unique power of experiential learning to transform students\' visions and decisions about their best futures.'}
            </blockquote>

            <div className="mt-4 flex justify-end">
              <p className="font-medium text-gray-800">
                {activeIndex === 0
                  ? '— Kirkus Reviews'
                  : '— Vita Rabinowitz, Provost and Vice Chancellor of CUNY'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
