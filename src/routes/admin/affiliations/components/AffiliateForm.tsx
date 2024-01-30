import { useFormContext } from 'react-hook-form';
import { Affiliate } from '../../../../shared/types/affiliate.types';

export const AffiliateForm = ({ isOpen }: { isOpen: boolean }) => {
  const {
    register,
    // formState: { errors },
  } = useFormContext<Affiliate>();

  return (
    <div
      className={`flex flex-col gap-y-4 transition-all ${
        isOpen ? 'h-[100%] py-10 opacity-100' : 'h-0 overflow-hidden opacity-0'
      }`}
    >
      <div className="rounded-lg border bg-white p-2 shadow hover:shadow-lg">
        <p className="font-lato text-2xl font-normal">Company Information</p>
        <div className="flex flex-col gap-y-2">
          <hr />
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-2">
              <label>
                <p className="font-lato  text-lg font-light">
                  Affiliation Name
                </p>
                <input
                  {...register('name', {
                    required: 'required',
                  })}
                  placeholder="Affiliate name..."
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400 "
                />
              </label>
              <label>
                <p className="font-lato  text-lg font-light">
                  Affiliation Slug
                  <span className="text-sm italic text-gray-500">
                    {' '}
                    (this is the name of the image file without the
                    extension[.png])
                  </span>
                </p>
                <input
                  {...register('slug', {
                    required: 'required',
                  })}
                  placeholder="Affiliate slug..."
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400 "
                />
              </label>
              <label>
                <p className="font-lato  text-lg font-light">
                  Affiliation Source
                </p>
                <input
                  {...register('source', {
                    required: 'required',
                    pattern: {
                      value: /https?:\/\/.+/,
                      message: 'must be a valid url',
                    },
                  })}
                  placeholder="Affiliate source..."
                  className="w-full bg-transparent italic text-blue-400 underline outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400"
                />
              </label>
            </div>
            <div className="">
              {/* TODO: Upload Affiliation Image Component */}
              <label>
                <p className="font-lato  text-lg font-light">
                  Affiliation Image
                </p>
                <input
                  type="file"
                  accept=".png"
                  {...register('image', {
                    required: 'required',
                  })}
                  placeholder="Affiliate image..."
                  className="w-full bg-transparent outline-none placeholder:font-light placeholder:italic placeholder:text-gray-400 "
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
