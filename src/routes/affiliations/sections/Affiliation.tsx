import { Affiliate } from '../../../shared/types/affiliate.types';
import { Icon } from '@iconify/react';

export const Affiliation = ({ affiliate }: { affiliate: Affiliate }) => {
  return (
    <div className="md:w-/12 group relative mx-auto my-6 w-full max-w-[380px]">
      <a
        className="block cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
        href={affiliate.source}
        target="_blank"
        rel="noreferrer noopener"
      >
        {/* Card border glow effect */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-tiffany-blue via-purple-600 to-cyan-500 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"></div>

        <div className="relative bg-white">
          {/* Header section with gradient */}
          <div className="relative h-4 bg-gradient-to-r from-tiffany-blue via-purple-500 to-cyan-500"></div>

          {/* Image container */}
          <div className="relative overflow-hidden">
            <img
              src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/affiliations/${affiliate.slug.toLowerCase()}.png`}
              className="h-48 w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              alt={`Website of ${affiliate.name}`}
            />

            {/* Overlay with neural network pattern */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-transparent to-purple-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            {/* Floating action button */}
            <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white">
              <Icon
                icon="mdi:launch"
                className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:rotate-12"
              />
            </div>
          </div>

          {/* Content section */}
          <div className="space-y-4 p-6">
            {/* Organization name */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
                {affiliate.name}
              </h3>

              {/* Animated underline */}
              <div className="mx-auto mt-2 h-1 w-0 rounded-full bg-gradient-to-r from-tiffany-blue to-purple-500 transition-all duration-500 group-hover:w-20"></div>
            </div>

            {/* Partnership badge */}
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 text-sm font-medium text-blue-700">
                <Icon icon="mdi:handshake" className="h-4 w-4" />
                <span>Partnership</span>
              </div>
            </div>

            {/* Visit website CTA */}
            <div className="flex items-center justify-center space-x-2 text-sm font-medium text-gray-500 transition-colors duration-300 group-hover:text-blue-600">
              <Icon icon="mdi:web" className="h-4 w-4" />
              <span>Visit Website</span>
              <Icon
                icon="mdi:arrow-right"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
