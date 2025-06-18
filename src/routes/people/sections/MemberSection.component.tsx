import { Icon } from '@iconify/react';
import { ProfileCard } from './ProfileCard.component';
import { PeopleCard } from './PeopleCard';
import { useState } from 'react';
import { useMembersQuery } from '../../../shared/hooks/memberHooks';
import { MemberResponse } from '../../../shared/types/member.types';
import { Loader } from '../../../shared/components/Loader';
import { motion } from 'framer-motion';

/** Fetches people data, renders list of members
 * @returns
 */
const MembersSection = () => {
  const [search, setSearch] = useState('');
  const [alumSearch, setAlumSearch] = useState('');

  const { data: members, isLoading } = useMembersQuery();

  const people = [
    {
      name: 'James Stellar',
      title: 'Director & Professor of Behavioral Neuroscience',
      bio: 'Dr. Stellar is a professor of Behavioral Neuroscience with research interests in the brain mechanisms of reward and motivation. His current focus is on the neuroscience of experiential education and its role in student learning and development.',
      email: 'jstellar@example.edu',
      linkedin: 'https://linkedin.com/in/jamesstellar',
      website: 'https://www.albany.edu/~jstellar/',
    },
    {
      name: 'Adrienne Decker',
      title: 'Research Associate',
      bio: 'Adrienne is pursuing her research on the cognitive neuroscience of learning and memory, with a particular focus on how experiential education influences brain development and knowledge retention.',
      email: 'adecker@example.edu',
    },
    {
      name: 'Michael Johnson',
      title: 'Graduate Research Assistant',
      bio: "Michael's research explores the neural correlates of decision-making, with special interest in how real-world experiences shape the developing brain's approach to problem-solving.",
      twitter: 'https://twitter.com/mjohnson',
    },
    {
      name: 'Sarah Martinez',
      title: 'Research Coordinator',
      bio: "Sarah coordinates the lab's research initiatives, focusing on diversity and inclusion in experiential education. Her work examines how diverse populations experience and benefit from different educational approaches.",
      linkedin: 'https://linkedin.com/in/sarahmartinez',
    },
  ];

  return (
    <div className="mx-auto my-12 max-w-screen-xl p-4">
      <p className="mx-auto mb-4 max-w-screen-md font-raleway text-6xl">
        Our Current Members
      </p>
      <p className="mx-auto mb-2 max-w-screen-md font-lato text-xl font-light">
        Discover the faces behind our groundbreaking research and the unique
        perspectives that shape our journey.
      </p>
      <div className="mx-auto flex w-full max-w-screen-md justify-between p-2">
        <p className="text-grey-700 font-lato italic">
          click on a card to read more
        </p>
        <div className="flex">
          <Icon
            icon="fa6-solid:magnifying-glass"
            className="my-auto text-gray-500"
          />
          <input
            className="ml-2 bg-transparent font-lato text-xl font-light text-gray-500 outline-none"
            placeholder={'Search for members...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <br />
      <div className="mx-auto flex max-w-screen-md flex-wrap gap-3 py-6">
        {isLoading && <Loader />}

        {members
          ?.filter(
            (member: MemberResponse) =>
              member.first.toLowerCase().includes(search.toLocaleLowerCase()) ||
              member.last.toLowerCase().includes(search.toLocaleLowerCase()),
          )
          ?.filter((member: MemberResponse) => member.lab_status !== 'Alumni')
          .map((member: MemberResponse) => {
            return (
              <ProfileCard
                key={member.socials.email + member.first}
                member={member}
                className="mx-auto w-4/5 max-w-xs md:w-[24%]"
              />
            );
          })}
      </div>

      <p className="mx-auto mb-4 max-w-screen-md font-raleway text-6xl">
        Our Alumni
      </p>
      <p className="mx-auto mb-2 max-w-screen-md font-lato text-xl font-light">
        The Stellar Research Lab has been home to many brilliant minds over the
        years. Here are some of our alumni.
      </p>

      <div className="mx-auto flex w-full max-w-screen-md justify-between">
        <p className="text-grey-700 font-lato italic">
          click on a card to read more
        </p>
        <div className="flex">
          <Icon
            icon="fa6-solid:magnifying-glass"
            className="my-auto text-gray-500"
          />
          <input
            className="ml-2 bg-transparent font-lato text-xl font-light text-gray-500 outline-none"
            placeholder={'Search for alumni...'}
            value={alumSearch}
            onChange={(e) => setAlumSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-md flex-wrap gap-3 py-6">
        {members
          ?.filter(
            (member: MemberResponse) =>
              member.first
                .toLowerCase()
                .includes(alumSearch.toLocaleLowerCase()) ||
              member.last
                .toLowerCase()
                .includes(alumSearch.toLocaleLowerCase()),
          )
          ?.filter((member: MemberResponse) => member.lab_status === 'Alumni')
          .map((member: MemberResponse) => {
            return (
              <ProfileCard
                key={member.socials.email + member.first}
                member={member}
                className="mx-auto w-4/5 max-w-xs md:w-[24%]"
              />
            );
          })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="mb-6 font-raleway text-4xl font-light md:text-5xl">
          <span className="bg-gradient-to-r from-tiffany-blue to-blue-600 bg-clip-text text-transparent">
            Meet Our Team
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-gray-600">
          Our interdisciplinary team brings together experts from neuroscience,
          education, psychology, and related fields to explore the intersection
          of brain science and learning.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {people.map((person, index) => (
          <PeopleCard
            key={person.name}
            name={person.name}
            title={person.title}
            bio={person.bio}
            email={person.email}
            linkedin={person.linkedin}
            twitter={person.twitter}
            website={person.website}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default MembersSection;
