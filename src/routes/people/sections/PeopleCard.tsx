import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface PeopleCardProps {
  name: string;
  title: string;
  image?: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  index?: number;
}

export const PeopleCard = ({
  name,
  title,
  image = '/img/placeholder-headshot.jpg',
  bio,
  email,
  linkedin,
  twitter,
  website,
  index = 0,
}: PeopleCardProps) => {
  return (
    <motion.div
      className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="h-2 bg-gradient-to-r from-tiffany-blue to-blue-600"></div>
      <div className="p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
              <img
                src={image}
                alt={`${name} headshot`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/img/placeholder-headshot.jpg';
                }}
              />
            </div>

            {(email || linkedin || twitter || website) && (
              <div className="mt-4 flex justify-center gap-3">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                    aria-label={`Email ${name}`}
                  >
                    <Icon
                      icon="tabler:mail"
                      className="h-5 w-5 text-gray-700"
                    />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                    aria-label={`${name}'s LinkedIn profile`}
                  >
                    <Icon
                      icon="tabler:brand-linkedin"
                      className="h-5 w-5 text-gray-700"
                    />
                  </a>
                )}
                {twitter && (
                  <a
                    href={twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                    aria-label={`${name}'s Twitter profile`}
                  >
                    <Icon
                      icon="tabler:brand-twitter"
                      className="h-5 w-5 text-gray-700"
                    />
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                    aria-label={`${name}'s website`}
                  >
                    <Icon
                      icon="tabler:world"
                      className="h-5 w-5 text-gray-700"
                    />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3">
            <h3 className="mb-1 font-raleway text-2xl font-medium text-gray-800">
              {name}
            </h3>
            <p className="mb-4 font-light text-tiffany-blue">{title}</p>

            {bio && (
              <div className="prose prose-gray prose-sm max-w-none">
                <p className="leading-relaxed text-gray-600">{bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
