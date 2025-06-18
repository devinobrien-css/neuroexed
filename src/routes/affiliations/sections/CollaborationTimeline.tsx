import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  partners: string[];
  icon: string;
  color: string;
  achievement: string;
}

const CollaborationTimeline = () => {
  const [activeEvent, setActiveEvent] = useState(0);

  const timelineEvents: TimelineEvent[] = [
    {
      year: '2020',
      title: 'Foundation Partnerships',
      description:
        'Established our first strategic partnerships with leading educational institutions and research foundations.',
      partners: ['Stanford University', 'MIT Research Lab', 'Gates Foundation'],
      icon: 'mdi:foundation',
      color: 'blue',
      achievement: 'First research grants secured',
    },
    {
      year: '2021',
      title: 'Global Expansion',
      description:
        'Expanded our network internationally, partnering with organizations across 15 countries.',
      partners: ['University of Oxford', 'Max Planck Institute', 'UNICEF'],
      icon: 'mdi:earth',
      color: 'purple',
      achievement: '15 countries reached',
    },
    {
      year: '2022',
      title: 'Technology Integration',
      description:
        'Formed strategic alliances with leading technology companies to enhance our digital capabilities.',
      partners: ['Google for Education', 'Microsoft Research', 'IBM Watson'],
      icon: 'mdi:chip',
      color: 'teal',
      achievement: 'AI research accelerated',
    },
    {
      year: '2023',
      title: 'Healthcare Collaborations',
      description:
        'Developed partnerships with major healthcare institutions to advance neuroscience research.',
      partners: ['Johns Hopkins', 'Mayo Clinic', 'WHO'],
      icon: 'mdi:hospital',
      color: 'green',
      achievement: '50+ clinical studies',
    },
    {
      year: '2024',
      title: 'Innovation Network',
      description:
        'Created a comprehensive innovation ecosystem with startups, corporations, and academic institutions.',
      partners: ['Y Combinator', 'Andreessen Horowitz', 'Nature Publishing'],
      icon: 'mdi:lightbulb',
      color: 'orange',
      achievement: '100+ innovations launched',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: {
      [key: string]: { bg: string; text: string; border: string };
    } = {
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        border: 'border-blue-500',
      },
      purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-600',
        border: 'border-purple-500',
      },
      teal: {
        bg: 'bg-teal-500',
        text: 'text-teal-600',
        border: 'border-teal-500',
      },
      green: {
        bg: 'bg-green-500',
        text: 'text-green-600',
        border: 'border-green-500',
      },
      orange: {
        bg: 'bg-orange-500',
        text: 'text-orange-600',
        border: 'border-orange-500',
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section
      id="collaboration-timeline"
      className="bg-gradient-to-b from-slate-50 to-white py-20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 font-medium text-blue-700">
            <Icon icon="mdi:timeline" className="mr-2 h-4 w-4" />
            Our Journey
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Evolution of Our Partnerships
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Trace the remarkable journey of how our collaborative network has
            grown and evolved over the years.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-200 via-purple-200 to-teal-200 md:block"></div>

          {/* Timeline events */}
          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => {
              const colors = getColorClasses(event.color);
              const isActive = activeEvent === index;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={event.year}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  onMouseEnter={() => setActiveEvent(index)}
                >
                  {/* Timeline node */}
                  <div className="absolute left-1/2 z-10 hidden -translate-x-1/2 md:block">
                    <div
                      className={`h-16 w-16 rounded-full ${
                        colors.bg
                      } flex items-center justify-center shadow-lg transition-all duration-300 ${
                        isActive ? 'scale-110 shadow-xl' : ''
                      }`}
                    >
                      <Icon icon={event.icon} className="h-8 w-8 text-white" />
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 animate-ping rounded-full bg-white opacity-30"></div>
                    )}
                  </div>

                  {/* Content card */}
                  <div
                    className={`w-full md:w-5/12 ${
                      isLeft ? 'md:pr-8' : 'md:pl-8'
                    }`}
                  >
                    <div
                      className={`rounded-2xl border-l-4 bg-white p-8 shadow-lg ${
                        colors.border
                      } transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                        isActive ? 'scale-105 shadow-2xl' : ''
                      }`}
                    >
                      {/* Mobile timeline node */}
                      <div className="mb-4 flex items-center md:hidden">
                        <div
                          className={`h-12 w-12 rounded-full ${colors.bg} mr-4 flex items-center justify-center`}
                        >
                          <Icon
                            icon={event.icon}
                            className="h-6 w-6 text-white"
                          />
                        </div>
                        <div className={`text-2xl font-bold ${colors.text}`}>
                          {event.year}
                        </div>
                      </div>

                      {/* Year badge (desktop) */}
                      <div className="hidden md:block">
                        <div
                          className={`inline-flex items-center rounded-full bg-gradient-to-r px-4 py-2 ${colors.bg.replace(
                            'bg-',
                            'from-',
                          )}/10 ${colors.bg.replace('bg-', 'to-')}/20 ${
                            colors.text
                          } mb-4 text-lg font-bold`}
                        >
                          {event.year}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-2xl font-bold text-gray-900">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-4 leading-relaxed text-gray-600">
                        {event.description}
                      </p>

                      {/* Achievement badge */}
                      <div
                        className={`inline-flex items-center rounded-full bg-gradient-to-r px-3 py-1 ${colors.bg.replace(
                          'bg-',
                          'from-',
                        )}/10 ${colors.bg.replace('bg-', 'to-')}/20 ${
                          colors.text
                        } mb-4 text-sm font-medium`}
                      >
                        <Icon icon="mdi:trophy" className="mr-2 h-4 w-4" />
                        {event.achievement}
                      </div>

                      {/* Partners */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                          Key Partners
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {event.partners.map((partner, partnerIndex) => (
                            <span
                              key={partnerIndex}
                              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                            >
                              {partner}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden w-5/12 md:block"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Future vision */}
        <div className="mt-20 text-center">
          <div className="rounded-3xl border border-gray-100 bg-gradient-to-r from-blue-50 via-purple-50 to-teal-50 p-12">
            <Icon
              icon="mdi:rocket"
              className="mx-auto mb-6 h-16 w-16 text-blue-600"
            />
            <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              The Future Awaits
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Our journey is far from over. We're continuously expanding our
              network, forging new partnerships, and creating innovative
              solutions for tomorrow's challenges.
            </p>
            <a
              href="https://www.linkedin.com/in/james-stellar-2139a218"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Join Our Mission
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationTimeline;
