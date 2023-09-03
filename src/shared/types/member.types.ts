export interface MemberFormInput {
  "First Name": string;
  "Last Name": string;
  "Collegiate Title": string;
  "Lab Title": string;
  "Year Joined": string;
  "Lab Status": boolean;
  Description: string;
  Email: string;
  Twitter: string;
  Instagram: string;
  Linkedin: string;
  image?: FileList;
}

export const defaultMemberFormValues = (member: Record<string, any>) => {
  return {
    "First Name": member.first.S,
    "Last Name": member.last.S,
    "Collegiate Title": member.collegiate_title.S,
    "Lab Title": member.lab_title.S,
    "Year Joined": member.year_joined.S,
    Description: member.description.S,
    Email: member.socials.M.email.S,
    Twitter: member.socials.M.twitter.S,
    Instagram: member.socials.M.instagram.S,
    Linkedin: member.socials.M.linkedin.S,
  };
};

export const member = (
  first_name: string,
  last_name: string,
  collegiate_title: string,
  lab_title: string,
  year_joined: string,
  description: string,
  socials: Record<string, string>,
) => {
  return {
    email: { S: socials.email },
    data: {
      M: {
        first: { S: first_name },
        last: { S: last_name },
        slug: { S: socials.email.split("@")[0] },
        collegiate_title: { S: collegiate_title },
        lab_title: { S: lab_title },
        year_joined: { S: year_joined },
        description: { S: description },
        socials: {
          M: {
            email: { S: socials.email },
            twitter: { S: socials.twitter },
            linkedin: { S: socials.linkedin },
            instagram: { S: socials.instagram },
          },
        },
      },
    },
  };
};
