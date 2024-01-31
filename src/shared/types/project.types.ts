export interface Project {
  id: string;
  title: string;
  description: string;
  members: ProjectMember[];
  order: number;
}

export interface ProjectMember {
  id: string;
  first: string;
  last: string;
  email: string;
  profile_picture: string;
}
