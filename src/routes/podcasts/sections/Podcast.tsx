import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Podcast as PodcastType } from '../../../shared/types/podcast.types';
import { PodcastModal } from './PodcastModal';
import { useNavigate } from 'react-router-dom';

export const Podcast = ({ podcast }: { podcast: PodcastType }) => {
  const { title, episode, season, date, summary } = podcast;
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {modal && (
        <PodcastModal
          podcast={podcast}
          closeModal={() => {
            setModal(false);
            navigate('/podcasts');
          }}
        />
      )}
      <div className="mx-auto my-4 transform cursor-pointer border-b-2 border-t-2 bg-white p-3 transition-all hover:shadow-xl">
        <div>
          <hr />
          <div className="p-2">
            <div className="flex">
              <div className="w-full">
                <p className="text-4xl font-light text-gray-600">
                  {season}.{episode}{' '}
                  <span className="font-lato text-xl font-normal text-black">
                    {title}
                  </span>
                </p>
                <p className=" font-sans text-lg font-light italic text-gray-500">
                  Released on {new Date(date).toLocaleDateString()}
                </p>
              </div>
              <div className="my-auto flex h-full w-1/4 justify-between">
                <div
                  className="group relative cursor-pointer rounded-full p-2 hover:bg-gray-200 hover:shadow active:shadow-xl"
                  onClick={() => {
                    navigate(`${season}.${episode}`);
                    setModal(true);
                  }}
                >
                  <Icon icon="bx:headphone" width={25} />
                  listen
                  <p className="absolute bottom-7 right-full z-50 w-0 overflow-hidden rounded bg-gray-200 p-0 opacity-0 transition-all group-hover:w-12 group-hover:p-2 group-hover:opacity-100">
                    listen
                  </p>
                </div>

                <div className="group relative cursor-pointer rounded-full p-2 hover:bg-gray-200 hover:shadow active:shadow-xl">
                  <Icon icon="material-symbols:ios-share-rounded" width="25" />{' '}
                  share
                  <p className="absolute bottom-7 right-full z-50 w-0 overflow-hidden rounded bg-gray-200 p-0 opacity-0 transition-all group-hover:w-12 group-hover:p-2 group-hover:opacity-100">
                    share
                  </p>
                </div>

                <div
                  className="group relative cursor-pointer rounded-full p-2 hover:bg-gray-200 hover:shadow active:shadow-xl"
                  onClick={(e) => {
                    setModal(false);
                    e.preventDefault();
                    const link = document.createElement('a');
                    link.href = `${
                      import.meta.env.VITE_S3_PODCASTS
                    }${season}.${episode}`;
                    link.download = `${title}.mp3`;
                    link.click();
                  }}
                >
                  <Icon icon="material-symbols:download-rounded" width="25" />
                  download
                  <p className="absolute bottom-7 right-full w-0 overflow-hidden rounded bg-gray-200 p-0 text-center opacity-0 transition-all group-hover:w-24 group-hover:p-2 group-hover:opacity-100">
                    download
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <p className="text-gray-500">{summary}</p>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};
