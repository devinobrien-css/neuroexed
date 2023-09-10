import { useState } from 'react';
import { Podcast as PodcastType } from '../../../shared/types/podcast.types';
import { Icon } from '@iconify/react';
import { Podcast } from './Podcast';

interface Seasonprops {
  season: string;
  podcasts: PodcastType[];
}
export const Season = ({ season, podcasts }: Seasonprops) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <div className="rounded border p-2">
      <button className="flex w-full justify-between pr-4" onClick={toggleOpen}>
        <h2 className="my-auto font-light md:text-3xl">Season {season}</h2>
        <Icon
          icon="ep:arrow-up-bold"
          className={`my-auto transition ${open ? 'rotate-0' : 'rotate-180'}`}
          width={20}
        />
      </button>
      <div
        className={`transition-height ${
          open ? 'h-96 overflow-scroll' : 'h-0 overflow-hidden'
        }`}
      >
        {podcasts
          .filter((s) => s.season === season)
          .sort((a, b) => (a.episode > b.episode ? -1 : 1))
          .map((p) => (
            <Podcast podcast={p} />
          ))}
      </div>
    </div>
  );
};
