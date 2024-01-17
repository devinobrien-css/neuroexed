import {
  fetchData,
  putData,
  removeData,
  updateData,
  uploadFileToBucket,
} from '../api/dba';
import { MemberFormInput, MemberResponse } from '../types/member.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const MEMBERS_TABLE_NAME = 'people';

/** Custom hook for members
 */
const useMembers = () => {
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
  const { data: members, refetch: refetchMembers } = useQuery({
    queryKey: ['MEMBERS'],
    queryFn: async () => {
      const res: MemberResponse[] = await fetchData(MEMBERS_TABLE_NAME);
      return res;
    },
    cacheTime: 10 * 60 * 60, // 10 hours
  });

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
  const { mutate: createMember } = useMutation<
    void,
    AxiosError,
    MemberFormInput
  >({
    mutationFn: async (data) => {
      await putData(MEMBERS_TABLE_NAME, {
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
        order: 0,
      });

      if (data.image?.length) {
        const fileName = `${data['Last Name'].toLowerCase()}.png`;
        uploadFileToBucket('profile_pictures', fileName, data.image);
      }

      refetchMembers();
    },
    onSuccess: () => toast.success('User has been created!'),
    onError: () => toast.error('User creation failed'),
  });

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

      refetchMembers();
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
      await refetchMembers();
      toast.success('User has been deleted!');
    },
    onError: () => toast.error('User deletion failed'),
  });

  return {
    members: members,
    refetchMembers,
    createMember: createMember,
    updateMember: mutateMember,
    deleteMember: deleteMember,
  };
};

export default useMembers;
