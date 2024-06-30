import { Icon } from '@iconify/react';
import { ProfileCard } from './ProfileCard.component';
import { useState } from 'react';
import { useMembersQuery } from '../../../shared/hooks/memberHooks';
import { MemberResponse } from '../../../shared/types/member.types';
import { Loader } from '../../../shared/components/Loader';

/** Fetches people data, renders list of members
 * @returns
 */
const MembersSection = () => {
  const [search, setSearch] = useState('');
  const [alumSearch, setAlumSearch] = useState('');

  const { data: members, isLoading } = useMembersQuery();

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
    </div>
  );
};

export default MembersSection;
