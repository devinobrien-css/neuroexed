import { Icon } from '@iconify/react';
import useMockPodcasts from '../../../shared/mocks/useMockPodcasts';
import { Podcast as PodcastType } from '../../../shared/types/podcast.types';
import { Podcast } from './Podcast';
import { useState } from 'react';
import { Season } from './Season';

const countSeasons = (podcasts: PodcastType[]): number => {
  // const seasons = podcasts.

  return -1;
};

export const PodcastList = () => {
  const { podcasts } = useMockPodcasts();

  return (
    <div className="mx-auto my-32 max-w-screen-xl">
      <h1 className="mb-4 text-center font-raleway text-6xl font-light">
        Explore Our Lab's Podcasts
      </h1>
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
