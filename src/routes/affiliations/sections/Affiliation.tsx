import React, { useState } from 'react';
import { Affiliate } from '../../../shared/types/affiliate.types';
import { Icon } from '@iconify/react';

export const Affiliation = ({ affiliate }: { affiliate: Affiliate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate a random gradient based on the affiliate name
  const generateGradient = (name: string) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-purple-500 to-pink-600',
      'from-teal-500 to-blue-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-indigo-500 to-purple-600',
    ];
    const index = name.length % gradients.length;
    return gradients[index];
  };

  const gradientClass = generateGradient(affiliate.name);

  return (
    <div
      className="group relative h-fit w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-teal-600/20 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-10"></div>

      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-500 group-hover:shadow-2xl">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Gradient Background */}
          <div
            className={
              'absolute inset-0 bg-gradient-to-br bg-gradient-to-r from-tiffany-blue/60 via-purple-600/50'
            }
          ></div>

          {/* Organization Image */}
          <img
            src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/affiliations/${affiliate.slug.toLowerCase()}.png`}
            className={`h-full w-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            alt={`${affiliate.name} logo`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />

          {/* Overlay Pattern */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10"></div>

          {/* Floating Elements */}
          <div className="absolute right-4 top-4 space-y-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300">
              <Icon icon="mdi:star" className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Action Button */}
          <div className="absolute bottom-4 right-4">
            <a
              href={affiliate.source}
              target="_blank"
              rel="noreferrer noopener"
              className="group/btn flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white"
            >
              <Icon
                icon="mdi:arrow-top-right"
                className="h-5 w-5 text-gray-700 transition-transform duration-300 group-hover/btn:rotate-12"
              />
            </a>
          </div>

          {/* Partnership Badge */}
          <div className="absolute left-4 top-4">
            <div className="rounded-full bg-white/90 px-3 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold text-gray-700">
                Partner
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 p-6">
          {/* Organization Name */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
              {affiliate.name}
            </h3>

            {/* Animated Underline */}
            <div className="h-1 w-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 group-hover:w-16"></div>
          </div>

          {/* Partnership Details */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:handshake" className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">
                Strategic Partner
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon icon="mdi:clock" className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500">Active</span>
            </div>
          </div>

          {/* Collaboration Areas */}
          {/* <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700">
              Collaboration Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Research', 'Education', 'Innovation'].map((area, index) => (
                <span
                  key={area}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 transition-colors duration-300 hover:bg-blue-100 hover:text-blue-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div> */}

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">5+</div>
              <div className="text-xs text-gray-500">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">2</div>
              <div className="text-xs text-gray-500">Years</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-teal-600">12K+</div>
              <div className="text-xs text-gray-500">Impact</div>
            </div>
          </div> */}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500 transition-colors duration-300 group-hover:text-blue-600">
              <Icon icon="mdi:web" className="h-4 w-4" />
              <span>Visit Website</span>
            </div>
            <Icon
              icon="mdi:arrow-right"
              className="h-5 w-5 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
            />
          </div>
        </div>

        {/* Hover Effects */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        {/* Neural Network Animation */}
        {isHovered && (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/4 top-1/4 h-1 w-1 animate-ping rounded-full bg-blue-400"></div>
            <div className="absolute right-1/3 top-1/3 h-1 w-1 animate-pulse rounded-full bg-purple-400"></div>
            <div className="absolute bottom-1/3 left-1/3 h-1 w-1 animate-bounce rounded-full bg-teal-400"></div>
          </div>
        )}
      </div>
    </div>
  );
};
