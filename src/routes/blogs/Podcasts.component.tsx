import { Icon } from '@iconify/react';

const links = [
  {
    name: 'Apple Podcasts',
    url: 'https://podcasts.apple.com/us/podcast/experienced/id1487375306',
    icon: 'cib:apple-podcasts',
  },
  {
    name: 'Simplecast',
    url: 'https://experienced.simplecast.com/',
    icon: 'simple-icons:podcastaddict',
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/show/3M2kS7kRCeL4STuuSFAoXd?si=3a8851e7904c40d8',
    icon: 'logos:spotify-icon',
  },
];

/** Podcasts page
 * @returns
 */
const Podcasts = () => {
  return (
    <div className="">
      <div className="my-16 px-2">
        <br />
        <p className="mx-auto text-justify font-lato font-light md:w-3/4">
          The ExperiencED Podcasts explore the process of learning from direct
          experiences in all of its forms. We interview people who have
          experienced something that has changed their life and we explore how
          they have learned from that experience. We also interview people who
          have studied the process of learning from direct experiences and
          explore their research.
        </p>
        <br />
        <br />
        <div className="mx-auto flex flex-wrap sm:flex-nowrap md:w-3/4">
          <img
            src="/img/experience.png"
            alt="podcasts"
            className="mx-auto block w-1/2 sm:mx-0 sm:w-1/4"
          />
          <div className="p-4 sm:py-0">
            <h2 className="text-4xl font-light ">ExperiencED</h2>
            <p className="text-xl font-light">
              Mary Churchill, Jim Stellar, Adrienne Dooley
            </p>
            <br />
            <div className="flex flex-wrap gap-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  className="mx-auto flex rounded border-2 border-blue-500 px-2 py-1 font-lato text-blue-500 transition-all hover:bg-blue-50 md:w-fit"
                  href={link.url}
                  target="_blank"
                  rel="noreferer noopener"
                  aria-label={`Listen on ${link.name}`}
                  type="button"
                >
                  <Icon icon={link.icon} className="my-auto mr-1" width={28} />
                  Listen on &nbsp;{' '}
                  <span className="font-semibold">{link.name}</span>
                  <Icon
                    icon="ph:arrow-left-bold"
                    className="my-auto rotate-[135deg]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        <br />
        <br />
        <p className="mx-auto text-justify font-lato font-light md:w-3/4">
          We believe that learning from direct experiences is a powerful way to
          learn and we want to explore how people can maximize their learning
          from direct experiences. We also want to explore how people can help
          others learn from direct experiences. We hope that these podcasts will
          help people learn how to learn from direct experiences and how to help
          others learn from direct experiences.
        </p>
        <br />
        <br />
        <div className="mx-auto md:w-3/4">
          <h2 className="text-4xl font-light">Latest Episodes</h2>
          <p className="text-xl font-light">
            Click on the episode to listen to the podcast.
          </p>
          <br />
          <iframe
            height="200px"
            width="100%"
            seamless
            src="https://player.simplecast.com/b03652d7-27c2-4912-8c37-a97e9169a040?dark=false"
          ></iframe>

          <iframe
            height="200px"
            width="100%"
            seamless
            src="https://player.simplecast.com/5dd43c08-dd42-4b8b-8889-7002aaaf0d1b?dark=false"
          ></iframe>

          <iframe
            height="200px"
            width="100%"
            seamless
            src="https://player.simplecast.com/8f24eb19-e78c-4001-a376-120be966c685?dark=false"
          ></iframe>
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
