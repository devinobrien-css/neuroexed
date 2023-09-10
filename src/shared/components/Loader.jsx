import { Icon } from '@iconify/react';

const Loader = () => {
  return (
    <div className="flex w-full flex-col p-48">
      <Icon icon="line-md:loading-twotone-loop" className="m-auto" width={50} />
      <p className="m-auto font-lato">loading</p>
    </div>
  );
};

export default Loader;
