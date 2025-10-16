import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface AffiliateProps {
  name: string;
  description: string;
  logo: string;
  website: string;
  collaboration: string;
}

const AffiliateCard = ({
  name,
  description,
  logo,
  website,
  collaboration,
}: AffiliateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
    >
      <div className="p-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-lg bg-gray-100 p-4 sm:mx-0">
            <img
              src={logo}
              alt={`${name} logo`}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = '/img/placeholder-logo.png';
              }}
            />
          </div>

          <div className="flex-1">
            <h3 className="mb-2 text-2xl font-light text-gray-800">{name}</h3>
            <p className="mb-4 text-gray-600">{description}</p>

            <div className="mb-4 border-l-4 border-tiffany-blue py-1 pl-4">
              <p className="font-medium text-gray-700">Collaboration Focus:</p>
              <p className="text-gray-600">{collaboration}</p>
            </div>

            <motion.a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-tiffany-blue to-blue-600 px-4 py-2 text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-tiffany-blue/25"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 10px 25px -5px rgba(10, 186, 181, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flex items-center justify-center"
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <Icon 
                  icon="tabler:external-link" 
                  className="h-5 w-5 drop-shadow-sm" 
                />
              </motion.div>
              <span className="font-medium">Visit Website</span>
              <motion.div
                className="h-0.5 w-0 bg-white/50 group-hover:w-full"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const AffiliationsSection = () => {
  const affiliates = [
    {
      name: 'World Association of Cooperative Education',
      description:
        'WACE is the only international professional organization dedicated to developing, expanding, branding and advocating for cooperative & work-integrated education programs within industry and educational institutions.',
      logo: '/img/wace-logo.png',
      website: 'https://waceinc.org/',
      collaboration:
        'Research partnerships on experiential education models and outcomes assessment.',
    },
    {
      name: 'Center for Sympathetic Intelligence',
      description:
        'The Center for Sympathetic Intelligence focuses on human connection and understanding through the lens of neuroscience and psychology.',
      logo: '/img/csi-logo.png',
      website: 'https://thecenterforsympatheticintelligence.org/',
      collaboration:
        'Joint research on cognitive-emotional integration in learning environments.',
    },
    {
      name: 'IQ4',
      description:
        'IQ4 is transforming the learning economy by bridging the gap between academia and industry, preparing students for successful careers.',
      logo: '/img/iq4-logo.png',
      website: 'https://www.iq4.com/',
      collaboration:
        'Development of experiential learning platforms and assessment tools.',
    },
  ];

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <h2 className="mb-6 font-raleway text-3xl font-light md:text-4xl">
          Our Research Partners & Collaborators
        </h2>
        <p className="text-gray-600">
          We work closely with these organizations to advance research in
          neuroscience, experiential education, and cognitive development. Our
          collaborations span across academia, industry, and non-profit sectors.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {affiliates.map((affiliate, index) => (
          <AffiliateCard key={index} {...affiliate} />
        ))}
      </div>
    </section>
  );
};
