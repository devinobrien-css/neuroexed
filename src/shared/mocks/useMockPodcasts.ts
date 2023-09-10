import { Podcast } from '../types/podcast.types';

const useMockPodcasts = () => {
  const podcasts: Podcast[] = [
    {
      title: 'Sample Podcast',
      episode: '1',
      season: '1',
      date: '08/02/2021',
      summary:
        'Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu',
      transcript:
        'Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu',
      contributors: ['contributor 1', 'contributor 2'],
    },
    {
      title: 'Sample Podcast',
      episode: '2',
      season: '1',
      date: '08/02/2021',
      summary:
        'Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu',
      transcript:
        'Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu',
      contributors: ['contributor 1', 'contributor 2'],
    },
    {
      title: 'Sample Podcast',
      episode: '3',
      season: '1',
      date: '08/02/2021',
      summary:
        'Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu',
      transcript:
        'Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu',
      contributors: ['contributor 1', 'contributor 2'],
    },
    {
      title: 'Sample Podcast',
      episode: '4',
      season: '1',
      date: '08/02/2021',
      summary:
        'Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu',
      transcript:
        'Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu',
      contributors: ['contributor 1', 'contributor 2'],
    },
    {
      title: 'Sample Podcast',
      episode: '5',
      season: '1',
      date: '08/02/2021',
      summary:
        'Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu',
      transcript:
        'Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu Lorem epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu epsom dolor sit amet espiritu',
      contributors: ['contributor 1', 'contributor 2'],
    },
  ];

  return {
    podcasts,
  };
};

export default useMockPodcasts;
