export interface ProjectMember {
  id: string;
  email: string;
  first: string;
  last: string;
}

export interface Project {
  title: string;
  description: string;
  members: ProjectMember[];
}

export interface ProjectRequest {
  title: string;
  description: string;
  members: any[];
}

export const project = ({ title, description, members }: ProjectRequest) => {
  return {
    title: { S: title },
    data: {
      M: {
        title: { S: title },
        description: { S: description },
        members: { L: members },
      },
    },
  };
};

export const projectMember = ({ id, first, last, email }: ProjectMember) => {
  return {
    id: { S: id },
    first: { S: first },
    last: { S: last },
    email: { S: email },
  };
};
