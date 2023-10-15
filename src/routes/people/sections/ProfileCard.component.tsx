import { useState } from 'react';
import { MemberResponse } from '../../../shared/types/member.types';
import cx from 'classnames';
import { Modal } from '../../../shared/components/modals/Modal';
import { Icon } from '@iconify/react';

interface ProfileCardProps {
  member: MemberResponse;
  className?: string;
}
export const ProfileCard = ({ member, className }: ProfileCardProps) => {
  const [modal, setModal] = useState<boolean>();

  return (
    <>
      {modal && (
        <Modal
          closeModal={() => setModal(false)}
          className="h-screen w-full md:h-fit md:w-1/3"
        >
          <div className="flex justify-evenly bg-paynes-grey p-2">
            <br />
            <br />
            <br />
            <br />
          </div>
          <img
            className="-my-20 mx-auto h-36 w-36 rounded-full object-cover object-center brightness-75"
            src={`${import.meta.env.VITE_S3_PROFILE_PICTURES}${member.last
              .toLowerCase()
              // eslint-disable-next-line quotes
              .replace("'", '')}.png`}
            alt={`Lab Member ${member.first} ${member.last}`}
          />
          <br />
          <br />
          <br />
          <div className="p-2">
            <p className="truncate text-left font-lato text-2xl font-light">
              {member.first} {member.last}
            </p>
            <p className="text-left font-light text-gray-600 ">
              {member.lab_title}
            </p>
            <p className="text-left font-light text-gray-600 ">
              Member since {new Date(member.year_joined).getFullYear()}
            </p>
            <p className="font-light text-paynes-grey">-</p>
            <p className="max-h-48 overflow-y-scroll text-left font-light text-gray-600">
              {member.description}
            </p>
          </div>
          <br />
          <div className="flex justify-evenly bg-charcoal p-2">
            <Icon
              icon="line-md:instagram"
              width={40}
              className="cursor-pointer text-white"
            />
            <Icon
              icon="line-md:linkedin"
              width={40}
              className="cursor-pointer text-white"
            />
            <Icon
              icon="line-md:email"
              width={40}
              className="cursor-pointer text-white"
            />
            <Icon
              icon="line-md:twitter"
              width={40}
              className="cursor-pointer text-white"
            />
          </div>
        </Modal>
      )}
      <button
        className={cx(
          className,
          'group relative bg-white shadow transition-all ease-in-out hover:grayscale',
        )}
        onClick={() => setModal(true)}
      >
        <img
          className="h-64 w-full object-cover object-center brightness-75"
          src={`${import.meta.env.VITE_S3_PROFILE_PICTURES}${member.last
            .toLowerCase()
            // eslint-disable-next-line quotes
            .replace("'", '')}.png`}
          alt={`Lab Member ${member.first} ${member.last}`}
        />
        <div className="p-1">
          <p className="truncate text-left font-lato text-2xl font-light">
            {member.first} {member.last}
          </p>
          <p className="text-left font-light text-gray-600 ">
            Member since {new Date(member.year_joined).getFullYear()}
          </p>
        </div>
        <p className="absolute top-1/3 w-full text-center font-lato text-white opacity-0 group-hover:opacity-100">
          view profile
        </p>
      </button>
    </>
  );
};
