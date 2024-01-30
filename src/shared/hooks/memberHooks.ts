import { fetchData, putData, removeData, updateData } from '../api/dba';
import { MemberFormInput, MemberResponse } from '../types/member.types';
import { createAPIMutation, createAPIQuery } from '../api/api';
import { prepareImageUpload, sanitizeFilename } from '../api/util';

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
    const isUploadingImage =
      member.image?.length && member.image[0] instanceof File;

    const fileName = sanitizeFilename(
      `${new Date().getTime()}-${member['First Name'].toLowerCase()}-${member[
        'Last Name'
      ].toLowerCase()}`,
    );

    const imageData =
      member.image?.[0] && (await prepareImageUpload(member.image, fileName));

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
      ...(isUploadingImage ? { ...imageData } : {}),
    });
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
 *  },
 *  image: FileList,
 *  file_name: 'john-doe',
 *  order: 0,
 * },
 * @see src/shared/types/member.types.ts
 */
export const useUpdateMember = createAPIMutation<void, MemberFormInput>({
  mutationFn: async (member) => {
    const isUploadingImage =
      member.image?.length && member.image[0] instanceof File;

    const fileName = sanitizeFilename(
      `${new Date().getTime()}-${member['First Name'].toLowerCase()}-${member[
        'Last Name'
      ].toLowerCase()}`,
    );

    const imageData =
      member.image?.[0] && (await prepareImageUpload(member.image, fileName));

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
      ...(isUploadingImage ? { ...imageData } : {}),
    });
  },
});

/** DELETE a member
 * @param {string} email_to_remove - email of member to delete
 * @returns void
 * @example deleteMember('email@gmail.com')
 * @see src/shared/types/member.types.ts
 */
export const useDeleteMember = createAPIMutation<void, string>({
  mutationFn: async (email) => {
    await removeData(MEMBERS_TABLE_NAME, {
      email: { S: email },
    });
  },
});
