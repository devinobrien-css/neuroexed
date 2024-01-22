import { useState } from 'react';
import {
  MemberResponse,
  MemberSocials,
} from '../../../shared/types/member.types';
import cx from 'classnames';
import { Modal } from '../../../shared/components/modals/Modal';
import { Icon } from '@iconify/react';
import { SafeProfilePicture } from '../../../shared/components/common/SafeProfilePicture';

interface ProfileCardProps {
  member: MemberResponse;
  className?: string;
}
export const ProfileCard = ({ member, className }: ProfileCardProps) => {
  const [modal, setModal] = useState<boolean>();

  const socialIcons = {
    email: 'line-md:email',
    twitter: 'line-md:twitter',
    instagram: 'line-md:instagram',
    linkedin: 'line-md:linkedin',
  };

  const userProfilePicture = `${
    import.meta.env.VITE_S3_PROFILE_PICTURES
  }${member.last
    .toLowerCase()
    // eslint-disable-next-line quotes
    .replace("'", '')}.png`;

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
          {/* <img
            className="-my-20 mx-auto h-36 w-36 rounded-full object-cover object-center brightness-75"
            src={`${import.meta.env.VITE_S3_PROFILE_PICTURES}${member.last
              .toLowerCase()
              // eslint-disable-next-line quotes
              .replace("'", '')}.png`}
            alt={`Lab Member ${member.first} ${member.last}`}
          /> */}

          <SafeProfilePicture
            className="-my-20 mx-auto h-36 w-36 rounded-full object-cover object-center brightness-75"
            firstName={member.first}
            image={userProfilePicture}
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
          <div className="relative flex justify-evenly bg-charcoal p-2">
            <div className="flex w-4/5 justify-evenly">
              {Object.keys(socialIcons).map((social: string) => {
                if (member.socials[social as keyof MemberSocials] !== '') {
                  return (
                    <a
                      key={social}
                      className="cursor-pointer transition-all hover:scale-110"
                      rel="noreferrer noopener"
                      target="_blank"
                      href={
                        (social === 'email' ? 'mailto:' : '') +
                        member.socials[social as keyof MemberSocials]
                      }
                    >
                      <Icon
                        icon={socialIcons[social as keyof MemberSocials]}
                        className="cursor-pointer text-white"
                        width={40}
                      />
                    </a>
                  );
                }
                return null;
              })}
            </div>
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
        <p className="absolute z-50 bg-oxford-blue/50 p-1 font-lato text-tiffany-blue">
          {member.lab_status}
        </p>
        <SafeProfilePicture
          className="h-64 w-full object-cover object-center brightness-75"
          firstName={member.first}
          image={`${import.meta.env.VITE_S3_PROFILE_PICTURES}${member.last
            .toLowerCase()
            // eslint-disable-next-line quotes
            .replace("'", '')}.png`}
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
