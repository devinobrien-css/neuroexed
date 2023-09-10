import { ComingSoon } from '../../shared/components/ComingSoon';
import Header from '../../shared/components/Header';
// import { PodcastList } from './sections/PodcastList';

/** Podcasts page
 * @returns
 */
const Podcasts = () => {
  return (
    <div className="">
      <Header
        title="ExperiencED Podcast"
        sub_title="These podcasts explore the process of learning from direct experiences in all of its forms."
      />
      {/* <PodcastList /> */}
      <ComingSoon />
    </div>
  );
};

export default Podcasts;
