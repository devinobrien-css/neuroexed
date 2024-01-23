import {
  fetchData,
  putData,
  removeData,
  sanitizeFilename,
  updateData,
  uploadFileToBucket,
} from '../api/dba';
import { MemberFormInput, MemberResponse } from '../types/member.types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { createAPIMutation, createAPIQuery } from '../api/api';

const MEMBERS_TABLE_NAME = 'people';
export const MEMBERS_QUERY_KEY = ['/members'];

/** GET members
 * @returns MemberResponse[]
 * @example
 * [
 *  {
 *    first: 'John',
 *    last: 'Doe',
 *    collegiate_title: 'President',
 *    lab_title: 'Lab Manager',
 *    lab_status: 'Undergraduate',
 *    year_joined: '2020',
 *    description: 'This is a member',
 *    socials: {
 *      email: '',
 *      twitter: '',
 *      linkedin: '',
 *      instagram: '',
 *    }
 *  },
 * ]
 * @see src/shared/types/member.types.ts
 */
export const useMembersQuery = createAPIQuery<MemberResponse[]>({
  queryKey: MEMBERS_QUERY_KEY,
  queryFn: async () => {
    const res: MemberResponse[] = await fetchData(MEMBERS_TABLE_NAME);
    return res.sort((a, b) => a.order - b.order);
  },
});

/** POST member
 * @param {MemberFormInput} data - MemberFormInput
 * @returns void
 * @example
 * {
 *    first: 'John',
 *    last: 'Doe',
 *    collegiate_title: 'President',
 *    lab_title: 'Lab Manager',
 *    lab_status: 'Undergraduate',
 *    year_joined: '2020',
 *    slug: 'john-doe',
 *    description: 'This is a member',
 *    socials: {
 *      email: '',
 *      twitter: '',
 *      linkedin: '',
 *      instagram: '',
 *    }
 *  },
 */
export const useCreateMember = createAPIMutation<void, MemberFormInput>({
  mutationFn: async (member) => {
    await putData(MEMBERS_TABLE_NAME, {
      email: member.Email,
      first: member['First Name'],
      last: member['Last Name'],
      collegiate_title: member['Collegiate Title'],
      lab_title: member['Lab Title'],
      lab_status: member['Lab Status'],
      year_joined: member['Year Joined'],
      description: member.Description,
      twitter: member.Twitter,
      linkedin: member.Linkedin,
      instagram: member.Instagram,
      order: 0,
    });

    if (member.image?.length) {
      const fileName = `${member['Last Name'].toLowerCase()}.png`;
      uploadFileToBucket('profile_pictures', fileName, member.image);
    }
  },
});

/** PATCH member
 * @param {MemberFormInput} data - MemberFormInput
 * @returns void
 * @example
 * {
 *  first: 'John',
 *  last: 'Doe',
 *  collegiate_title: 'President',
 *  lab_title: 'Lab Manager',
 *  lab_status: 'Undergraduate',
 *  year_joined: '2020',
 *  slug: 'john-doe',
 *  description: 'This is a member',
 *  socials: {
 *   email: '',
 *   twitter: '',
 *   linkedin: '',
 *   instagram: '',
 *  }
 * },
 * @see src/shared/types/member.types.ts
 */
export const useUpdateMember = createAPIMutation<void, MemberFormInput>({
  mutationFn: async (member) => {
    await updateData(MEMBERS_TABLE_NAME, {
      email: member.Email,
      first: member['First Name'],
      last: member['Last Name'],
      collegiate_title: member['Collegiate Title'],
      lab_title: member['Lab Title'],
      lab_status: member['Lab Status'],
      year_joined: member['Year Joined'],
      description: member.Description,
      twitter: member.Twitter,
      linkedin: member.Linkedin,
      instagram: member.Instagram,
      order: member.order,
    });

    if (member.image?.length) {
      const fileName = sanitizeFilename(`${member['Lab Status']} ${member['Last Name'].toLowerCase()} ${member['Last Name'].toLowerCase()}`);
      uploadFileToBucket('profile_pictures', fileName, member.image);
    }
  },
});

const uploadMemberImage = async (file: FileList , fileName: string) => {
  const form = new FormData();
  form.append(
    'data',
    JSON.stringify({
      name: fileName,
    }),
  );

  form.append('file', file[0], fileName);
  const reader = new FileReader();
  reader.readAsDataURL(file[0]);

  reader.onload = async () =>
    await axios
    .post(import.meta.env.VITE_NEURO_S3_API, {
      file: file,
      fileName: fileName,
      bucket: import.meta.env.VITE_S3_BUCKET,
    })
}

/** Custom hook for members
 */
const useMembers = () => {
  /** POST a member
   * @param {MemberFormInput} data - MemberFormInput
   * @returns void
   * @example
   * {
   *    first: 'John',
   *    last: 'Doe',
   *    collegiate_title: 'President',
   *    lab_title: 'Lab Manager',
   *    lab_status: 'Undergraduate',
   *    year_joined: '2020',
   *    slug: 'john-doe',
   *    description: 'This is a member',
   *    socials: {
   *      email: '',
   *      twitter: '',
   *      linkedin: '',
   *      instagram: '',
   *    }
   *  },
   */
  const { mutate: mutateMember } = useMutation<
    void,
    AxiosError,
    MemberFormInput
  >({
    mutationFn: async (data) => {
      await updateData(MEMBERS_TABLE_NAME, {
        email: data.Email,
        first: data['First Name'],
        last: data['Last Name'],
        collegiate_title: data['Collegiate Title'],
        lab_title: data['Lab Title'],
        lab_status: data['Lab Status'],
        year_joined: data['Year Joined'],
        description: data.Description,
        twitter: data.Twitter,
        linkedin: data.Linkedin,
        instagram: data.Instagram,
        order: data.order,
      });

      if (data.image?.length) {
        const fileName = `${data['Last Name'].toLowerCase()}.png`;
        uploadFileToBucket('profile_pictures', fileName, data.image);
      }
    },
    onSuccess: () => toast.success('User has been updated!'),
    onError: () => toast.error('User update failed'),
  });

  /** DELETE a member
   * @param {string} email_to_remove - email of member to delete
   * @returns void
   * @example deleteMember('email@gmail.com')
   * @see src/shared/types/member.types.ts
   */
  const { mutate: deleteMember } = useMutation({
    mutationFn: async (email_to_remove: string) => {
      await removeData(MEMBERS_TABLE_NAME, {
        email: { S: email_to_remove },
      });
    },
    onSuccess: async () => {
      toast.success('User has been deleted!');
    },
    onError: () => toast.error('User deletion failed'),
  });

  return {
    updateMember: mutateMember,
    deleteMember: deleteMember,
  };
};

export default useMembers;
