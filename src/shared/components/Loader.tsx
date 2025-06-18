import { Icon } from '@iconify/react';

export const Loader = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-48">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
        {/* Inner pulsing brain icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            icon="mdi:brain"
            className="h-8 w-8 animate-pulse text-blue-600"
          />
        </div>
      </div>
      <p className="mt-4 animate-pulse font-lato text-lg font-medium text-gray-600">
        Loading neural networks...
      </p>
    </div>
  );
};
