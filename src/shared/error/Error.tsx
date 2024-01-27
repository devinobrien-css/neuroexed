import { ErrorSvg } from './ErrorSvg';

export const ErrorPage = () => {
  return (
    <>
      <div className="bg-landing bg-cover shadow-lg">
        <div className="flex w-full flex-col backdrop-blur-sm backdrop-brightness-50">
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
