import useMockPodcasts from '../../../shared/mocks/useMockPodcasts';
// import { Podcast as PodcastType } from '../../../shared/types/podcast.types';
import { Season } from './Season';

// const countSeasons = (podcasts: PodcastType[]): number => {
//   return -1;
// };

export const PodcastList = () => {
  const { podcasts } = useMockPodcasts();

  return (
    <div className="mx-auto my-32 max-w-screen-xl">
      <div className="flex flex-col gap-y-4">
        <Season season="1" podcasts={podcasts} />
        <Season season="1" podcasts={podcasts} />
        <Season season="1" podcasts={podcasts} />
        <Season season="1" podcasts={podcasts} />
        <Season season="1" podcasts={podcasts} />
      </div>
    </div>
  );
};
