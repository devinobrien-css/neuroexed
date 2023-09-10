import React from 'react';

export const BlogMd = ({ data }) => {
  return (
    <div
      className="group mx-auto my-2 flex h-min min-h-[280px] w-full cursor-pointer flex-col justify-between overflow-visible bg-white shadow transition-all hover:shadow-xl"
      onClick={() => (window.location.href = data.media_source)}
    >
      <div className="p-4 text-left">
        <p className="font-lato text-2xl font-light">
          {data.media_type === 'BLOG' ? 'Blog: ' : 'Podcast: '}
          {data.media_title}
        </p>
        <p>{new Date(data.media_date).toDateString()}</p>
      </div>
      <div className="border-t-2 text-left">
        <div className={`overflow-hidden transition-all duration-300 `}>
          <p className="p-2">{data.media_content}</p>
        </div>
      </div>
    </div>
  );
};

export const BlogStyledMd = ({ data, index }) => {
  return (
    <div
      className="group mx-auto my-2  flex h-min min-h-[280px] w-full cursor-pointer flex-col justify-between overflow-visible bg-white shadow transition-all hover:shadow-xl"
      onClick={() => (window.location.href = data.media_source)}
    >
      <div className={`h-48 w-full overflow-clip border`}>
        <img
          alt="Blog neuron background"
          src={`./img/backgrounds/bg-${index % 2}.png`}
          className="w-full"
        />
      </div>
      <div className="p-4 text-left">
        <p className="font-lato text-2xl font-light">
          {data.media_type === 'BLOG' ? 'Blog: ' : 'Podcast: '}
          {data.media_title}
        </p>
        <p>{new Date(data.media_date).toDateString()}</p>
      </div>
      <div className="border-t-2 text-left">
        <div className={`overflow-hidden transition-all duration-300 `}>
          <p className="p-2">{data.media_content}</p>
        </div>
      </div>
    </div>
  );
};
