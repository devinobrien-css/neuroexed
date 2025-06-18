import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface Stat {
  icon: string;
  label: string;
  value: number;
  suffix: string;
  color: string;
  bgColor: string;
}

const PartnershipsStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);

  const stats: Stat[] = [
    {
      icon: 'mdi:account-group',
      label: 'Global Partners',
      value: 52,
      suffix: '+',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: 'mdi:earth',
      label: 'Countries Reached',
      value: 28,
      suffix: '',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: 'mdi:chart-line',
      label: 'Active Projects',
      value: 134,
      suffix: '+',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
    },
    {
      icon: 'mdi:heart',
      label: 'Lives Impacted',
      value: 125000,
      suffix: '+',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(
        stats.map((stat) => Math.floor(stat.value * easeOutProgress)),
      );

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedValues(stats.map((stat) => stat.value));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <section
      id="stats-section"
      className="bg-gradient-to-r from-gray-50 to-blue-50/30 py-20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Impact by the Numbers
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our partnerships have created measurable impact across the globe,
            touching lives and advancing knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-gray-50/50"></div>
              <div
                className={`absolute right-4 top-4 h-12 w-12 ${stat.bgColor} rounded-full opacity-20 transition-opacity duration-300 group-hover:opacity-30`}
              ></div>

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center ${stat.bgColor} mb-6 rounded-2xl transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon icon={stat.icon} className={`h-8 w-8 ${stat.color}`} />
                </div>

                {/* Number */}
                <div className="mb-4">
                  <span
                    className={`text-4xl font-bold md:text-5xl ${stat.color} block`}
                  >
                    {formatNumber(animatedValues[index])}
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  {stat.label}
                </h3>

                {/* Progress bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color.replace(
                      'text-',
                      'from-',
                    )} to-opacity-60 rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: isVisible ? '100%' : '0%',
                      transitionDelay: `${index * 200}ms`,
                    }}
                  ></div>
                </div>

                {/* Hover indicator */}
                <div className="mt-4 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Icon
                    icon="mdi:arrow-right"
                    className="h-5 w-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-teal-400/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 rounded-full border border-gray-100 bg-white px-8 py-4 shadow-lg">
            <span className="font-medium text-gray-700">
              Want to be part of our network?
            </span>
            <button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Join Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipsStats;
