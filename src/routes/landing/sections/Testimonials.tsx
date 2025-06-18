import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        'The research from NeuroExed has been instrumental in reshaping our approaches to experiential learning in higher education. Their insights on brain function and decision-making have practical applications that benefit both educators and students.',
      author: 'Dr. Rebecca Martinez',
      title: 'Director of Education Innovation, Stanford University',
      image: '/img/testimonial1.jpg',
    },
    {
      quote:
        'NeuroExed\'s work on cognitive-emotional integration has transformed how we think about student development. Their interdisciplinary approach brings a fresh perspective to educational neuroscience that few other labs can match.',
      author: 'Professor James Wilson',
      title: 'Chair of Neuroscience Department, UCLA',
      image: '/img/testimonial2.jpg',
    },
    {
      quote:
        'The team at NeuroExed has been an incredible partner in our efforts to design more effective learning experiences. Their research on how the brain processes experiential learning provided the foundation for our curriculum redesign.',
      author: 'Dr. Sarah Johnson',
      title: 'Chief Learning Officer, Educational Innovation Institute',
      image: '/img/testimonial3.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 font-raleway text-4xl font-light md:text-5xl">
            <span className="bg-gradient-to-r from-tiffany-blue to-blue-600 bg-clip-text text-transparent">
              What People Are Saying
            </span>
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600"></div>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white p-8 shadow-xl md:p-12"
            >
              <div className="relative">
                <svg
                  className="absolute -left-12 -top-12 h-24 w-24 -rotate-180 text-gray-100"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                <div className="relative z-10">
                  <p className="mb-8 text-xl font-light leading-relaxed text-gray-800 md:text-2xl">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  <div className="flex items-center">
                    <div className="mr-4 shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-tiffany-blue text-xl font-bold text-white">
                        {testimonials[currentIndex].author.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {testimonials[currentIndex].author}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonials[currentIndex].title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={prevTestimonial}
              className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
              aria-label="Previous testimonial"
            >
              <Icon icon="tabler:chevron-left" className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    currentIndex === index ? 'bg-tiffany-blue' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
              aria-label="Next testimonial"
            >
              <Icon icon="tabler:chevron-right" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
