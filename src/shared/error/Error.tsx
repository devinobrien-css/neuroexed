import { motion } from 'framer-motion';
import { ErrorSvg } from './ErrorSvg';
import NeuralNetworkBackground from '../components/NeuralNetworkBackground';

export const ErrorPage = () => {
  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">
        {/* Neural Network Animation Background */}
        <NeuralNetworkBackground />

        <div className="absolute inset-0">
          {/* Gradient overlays for additional depth */}
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-tiffany-blue/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>

          <motion.div
            className="absolute -top-12 left-1/3 h-32 w-32 rounded-full bg-blue-400/20"
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute right-1/4 top-1/2 h-24 w-24 rounded-full bg-tiffany-blue/20"
            animate={{
              y: [0, -15, 0],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </div>

        <div className="relative z-10 flex w-full flex-col backdrop-blur-sm backdrop-brightness-50">
          <div className="m-auto w-fit py-12 md:w-2/3">
            <p className="text-center font-raleway text-white md:text-6xl">
              Unexpected Error
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <ErrorSvg />
        </div>
        <div className="my-auto w-1/2">
          <p className="text-[6rem] font-light text-gray-800">OOPS!</p>
          <p className="-mt-8 pl-2 text-[4rem] font-light text-gray-800">
            Something went wrong
          </p>
          <div className="my-4 p-2">
            <p>
              To report this error,{' '}
              <a href="" className="text-blue-600 hover:text-blue-800">
                click here.
              </a>{' '}
              If you continue to see this page, please contact us at{' '}
              <a href="" className="text-blue-600 hover:text-blue-800">
                our support email.
              </a>
            </p>
            <br />
            <p className="italic text-gray-600">
              Our server has already been notified of the incident. If you wish
              to provide additional information, you may file a ticket above.
              Alternatively, press the button below to reload the page.
              <br />
              <br />
              Thank you for your patience.
            </p>
          </div>
          <button
            className="mx-auto block rounded border-2 border-blue-500 px-6 py-2 text-lg font-bold text-blue-500 transition-all hover:bg-blue-400/50 hover:text-white"
            onClick={() => window.location.reload()}
          >
            click here to reload
          </button>
          <div className="pb-32" />
        </div>
      </div>
    </>
  );
};
