import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

interface StatProps {
  value: number;
  label: string;
  duration?: number;
  delay?: number;
}

const StatCounter = ({
  value,
  label,
  duration = 2000,
  delay = 0,
}: StatProps) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    let start: number;
    let animationFrame: number;

    if (inView) {
      const startTime = performance.now();

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setCount(Math.floor(progress * value));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };

      setTimeout(() => {
        animationFrame = requestAnimationFrame(step);
      }, delay);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView, value, duration, delay]);

  return (
    <div ref={ref} className="text-center">
      <p className="mb-2 text-5xl font-light text-gray-900">
        <span>{count}</span>
        <span className="text-tiffany-blue">+</span>
      </p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 25, label: 'Research Publications' },
    { value: 12, label: 'Active Projects' },
    { value: 30, label: 'Team Members' },
    { value: 8, label: 'Years of Research' },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-7xl"
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCounter
                key={index}
                value={stat.value}
                label={stat.label}
                delay={index * 200}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
