import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Project } from '../types/project.types';

const useMockProjects = () => {
  const projects: Project[] = [
    {
      title: 'Test Project 1',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda architecto, nostrum fuga laudantium accusantium voluptate numquam repellendus dolorem explicabo corrupti labore sit harum.',
      members: [
        {
          id: '81092',
          email: 'email@gmail.com',
          first: 'Dave',
          last: 'profile',
        },
      ],
    },
    {
      title: 'Test Project 2',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda architecto, nostrum fuga laudantium accusantium voluptate numquam repellendus dolorem explicabo corrupti labore sit harum.',
      members: [
        {
          id: '231',
          email: 'email@gmail.com',
          first: 'Dave',
          last: 'profile',
        },
      ],
    },
  ];

  return {
    projects,
  };
};

export default useMockProjects;
