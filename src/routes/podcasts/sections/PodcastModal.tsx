import { useState } from 'react';
import { Podcast } from '../../../shared/types/podcast.types';
import { Modal } from '../../../shared/components/modals/Modal';

interface PodcastModalProps {
  podcast: Podcast;
  closeModal: () => void;
}

export const PodcastModal = ({ podcast, closeModal }: PodcastModalProps) => {
  const { title, date, season, episode, summary, contributors, transcript } =
    podcast;
  const [viewTranscript, setViewTranscript] = useState(false);

  return viewTranscript ? (
    <Modal className="space-y-4 p-12" closeModal={closeModal}>
      <p className="mx-auto block text-center text-xl font-light text-gray-600">
        {season}.{episode}{' '}
        <span className="font-lato text-lg font-bold text-black md:text-4xl">
          {title}
        </span>
      </p>
      <br />
      <audio controls id="download-me" className="mx-auto">
        <source
          src={`${import.meta.env.VITE_S3_PODCASTS}${season}.${episode}`}
          type="audio/mpeg"
        />
      </audio>
      <br />
      <button
        className="absolute left-4 top-4 rounded-lg bg-gray-300 p-2"
        onClick={() => setViewTranscript(false)}
      >
        back
      </button>
      <p className="h-96 overflow-scroll">{transcript}</p>
    </Modal>
  ) : (
    <Modal className="p-12" closeModal={closeModal}>
      <p className="font-light text-gray-600">
        {season}.{episode}{' '}
        <span className="font-lato text-xl font-bold text-black">{title}</span>
      </p>
      <p className="uppercase text-gray-500">{date}</p>
      <hr className="my-2" />
      <div className="gap-8 md:flex">
        <div className="md:w-1/2">
          <p className="text-md font-lato font-bold">Description</p>
          <p className="font-light text-gray-800">{summary}</p>
          <hr className="my-2" />
          <p className="text-md font-lato font-bold">Contributors</p>
          <div>
            {contributors?.map((person: string) => (
              <p key={person} className="font-light text-gray-800">
                {person}
              </p>
            ))}
          </div>
          <hr className="my-2" />
          <p className="text-md font-lato font-bold">Keywords</p>
          <div>
            {/* {
                keywords.map((keyword, index) => {
                    return <p key={index} className="text-gray-800 font-light">{keyword}</p>
                })
              } */}
          </div>
        </div>

        <div>
          <audio controls id="download-me">
            <source
              src={`${import.meta.env.VITE_S3_PODCASTS}${season}.${episode}`}
              type="audio/mpeg"
            />
          </audio>
          <br />
          <button
            className="w-full rounded-xl bg-gray-100 p-3 text-center font-lato"
            onClick={() => setViewTranscript(true)}
          >
            Read Transcript
          </button>
        </div>
      </div>
    </Modal>
  );
};
