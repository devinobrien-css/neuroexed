import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useTheme } from '../../hooks/useTheme';

interface DarkModeToggleProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ 
  className = '', 
  size = 'medium' 
}) => {
  const { toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    small: 'w-12 h-6 p-0.5',
    medium: 'w-14 h-7 p-0.5',
    large: 'w-16 h-8 p-1'
  };

  const iconSizes = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6'
  };

  const thumbSizes = {
    small: 'h-5 w-5',
    medium: 'h-6 w-6',
    large: 'h-6 w-6'
  };

  const getThumbOffset = () => {
    switch (size) {
    case 'small': return 24;
    case 'medium': return 28;
    case 'large': return 32;
    default: return 28;
    }
  };

  return (
    <motion.button
      className={`
        relative inline-flex items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-tiffany-blue focus:ring-offset-2
        ${isDark 
          ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
          : 'bg-gradient-to-r from-gray-200 to-gray-300'
        }
        ${sizeClasses[size]}
        ${className}
      `}
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Track */}
      <motion.div
        className={`
          flex items-center justify-center rounded-full bg-white shadow-md dark:bg-dark-surface
          ${thumbSizes[size]}
        `}
        layout
        animate={{
          x: isDark ? getThumbOffset() : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30
        }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: 1,
            rotate: isDark ? 360 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut'
          }}
        >
          <Icon
            icon={isDark ? 'tabler:moon-filled' : 'tabler:sun-filled'}
            className={`${iconSizes[size]} ${isDark ? 'text-blue-600' : 'text-yellow-500'}`}
          />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};
