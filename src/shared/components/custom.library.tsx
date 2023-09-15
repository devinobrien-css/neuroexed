import { useState } from 'react';
import { BlogResponse } from '../types/blog.types';
import { Icon } from '@iconify/react';

export const BlogMd = ({
  media_title,
  media_type,
  media_date,
  media_source,
  media_content,
  className,
}: BlogResponse & { className?: string }) => {
  const [viewDescription, setView] = useState(false);
  return (
    <div
      className={`group mx-auto my-2 flex h-fit min-h-[250px] flex-col justify-between overflow-visible bg-white shadow transition-all hover:shadow-xl ${className}`}
    >
      <div className="shrink-0 p-4 text-left">
        <div>
          <div className="flex justify-between border-b">
            <p className={`flex pb-2 font-lato text-2xl font-light`}>
              {media_type === 'BLOG' ? (
                <>
                  <span>
                    <Icon icon="fluent:brain-circuit-20-regular" width={30} />
                  </span>
                  <span>Blog</span>
                </>
              ) : (
                <>
                  <span>
                    <Icon icon="ph:apple-podcasts-logo-duotone" width={30} />
                  </span>
                  <span>Podcast</span>
                </>
              )}
            </p>
            <p className="my-auto font-lato font-normal">
              {new Date(media_date).toDateString()}
            </p>
          </div>
          <p className={`p-2 font-lato text-2xl font-light`}>{media_title}</p>
        </div>
      </div>
      <div className=" text-left">
        <div
          className={`transition-all duration-300 ${
            viewDescription
              ? 'h-[170px] overflow-scroll'
              : 'h-0 overflow-hidden'
          }`}
        >
          <p className="p-2">{media_content}</p>
        </div>
        <div className="flex justify-center gap-x-4">
          <button
            className="my-4 block rounded-2xl bg-blue-50 px-3"
            onClick={() => setView(!viewDescription)}
          >
            {viewDescription ? 'hide' : 'view'} summary
          </button>
          <button
            className="my-4 block rounded-2xl bg-blue-50 px-3"
            onClick={() => (window.location.href = media_source)}
          >
            view the full post
          </button>
        </div>
      </div>
    </div>
  );
};

// export const BlogStyledMd = ({ data, index }) => {
//   return (
//     <div
//       className="group mx-auto my-2  flex h-min min-h-[280px] w-full cursor-pointer flex-col justify-between overflow-visible bg-white shadow transition-all hover:shadow-xl"
//       onClick={() => (window.location.href = data.media_source)}
//     >
//       <div className={`h-48 w-full overflow-clip border`}>
//         <img
//           alt="Blog neuron background"
//           src={`./img/backgrounds/bg-${index % 2}.png`}
//           className="w-full"
//         />
//       </div>
//       <div className="p-4 text-left">
//         <p className="font-lato text-2xl font-light">
//           {data.media_type === 'BLOG' ? 'Blog: ' : 'Podcast: '}
//           {data.media_title}
//         </p>
//         <p>{new Date(data.media_date).toDateString()}</p>
//       </div>
//       <div className="border-t-2 text-left">
//         <div className={`overflow-hidden transition-all duration-300 `}>
//           <p className="p-2">{data.media_content}</p>
//         </div>
//       </div>
//     </div>
//   );
// };
