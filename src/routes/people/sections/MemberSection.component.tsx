import { Icon } from '@iconify/react';
import Loader from '../../../shared/components/Loader';
import { ProfileCard } from './ProfileCard.component';
import { useState } from 'react';
import useMembers from '../../../shared/hooks/useMembers';
import { MemberResponse } from '../../../shared/types/member.types';

/** Fetches people data, renders list of members
 * @returns
 */
const MembersSection = () => {
  const [search, setSearch] = useState('');
  const { members } = useMembers();

  return (
    <>
      <div className="mx-auto my-32 max-w-screen-xl p-4">
        <p className="mb-4 text-center font-raleway text-6xl">
          Our Lab Members
        </p>
        <p className="mx-auto mb-8 text-center font-lato text-xl font-light md:w-2/5">
          Discover the faces behind our groundbreaking research and the unique
          perspectives that shape our journey.
        </p>
        <div></div>
        <div className="mx-auto flex w-full max-w-screen-md justify-between p-2">
          <p className="text-grey-700 mt-4 font-lato italic">
            click on a card to read more
          </p>
          <div className="flex">
            <Icon
              icon="fa6-solid:magnifying-glass"
              className="my-auto text-gray-500"
            />
            <input
              className="ml-2 bg-transparent font-lato text-xl text-gray-500 outline-none"
              placeholder={'Search for members...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {!members && (
          <div className="flex min-h-[400px] flex-col items-center">
            <Loader />
          </div>
        )}
        <div className="mx-auto flex max-w-screen-md flex-wrap gap-3 py-6">
          {members
            ?.filter(
              (member: MemberResponse) =>
                member.first
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase()) ||
                member.last.toLowerCase().includes(search.toLocaleLowerCase()),
            )
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
    </>
  );
};

export default MembersSection;
