import { Icon } from '@iconify/react';
import Loader from '../../../shared/components/Loader';
import Profile from './Profile.component';
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
    <div className="mx-auto my-32 max-w-screen-xl p-4">
      <p className="mb-4 text-center font-raleway text-6xl">Our Lab Members</p>
      <p className="mx-auto mb-8 text-center font-lato text-xl font-light md:w-2/5">
        Discover the faces behind our groundbreaking research and the unique
        perspectives that shape our journey.
      </p>
      <div className="flex w-1/3 rounded-xl p-2 shadow">
        <Icon
          icon="fa6-solid:magnifying-glass"
          className="my-auto text-gray-500"
        />
        <input
          className="ml-2 text-xl text-gray-500 outline-none"
          placeholder={`Search for members...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap justify-evenly">
        {!members ? (
          <div className="flex min-h-[400px] w-full flex-col items-center">
            <Loader />
          </div>
        ) : (
          members
            ?.filter(
              (member: MemberResponse) =>
                member.first
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase()) ||
                member.last.toLowerCase().includes(search.toLocaleLowerCase()),
            )
            .map((member: MemberResponse) => {
              return (
                <Profile
                  key={member.socials.email + member.first}
                  data={member}
                />
              );
            })
        )}
      </div>
    </div>
  );
};

export default MembersSection;
