export interface MemberFormInput {
  'First Name': string;
  'Last Name': string;
  'Collegiate Title': string;
  'Lab Title': string;
  'Year Joined': string;
  'Lab Status': boolean;
  Description: string;
  Email: string;
  Twitter: string;
  Instagram: string;
  Linkedin: string;
  image?: FileList;
  order: number;
}

export interface MemberSocials {
  twitter: string;
  instagram: string;
  linkedin: string;
  email: string;
}
export interface MemberResponse {
  email: string;
  first: string;
  last: string;
  collegiate_title: string;
  lab_title: string;
  year_joined: string;
  lab_status: boolean;
  description: string;
  socials: MemberSocials;
  order: number;
}
