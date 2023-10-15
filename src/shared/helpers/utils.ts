import { fetchData, putData } from '../api/dba';
import { BlogResponse } from '../types/blog.types';
import { MemberResponse } from '../types/member.types';
import { sort_order } from '../types/object_schema';
import { Project } from '../types/project.types';

export async function updateOders() {
  const people = (await fetchData('people')) as MemberResponse[];
  const projects = await fetchData('projects');
  const blogs = (await fetchData('blogs')) as BlogResponse[];
  const orders = (await fetchData('sort-orders')) as Record<string, string[]>;

  const personOrder = orders['people'];
  const projectOrder = orders['projects'];
  const blogOrder = orders['blogs'];

  const newMemberOrder: string[] = [];
  if (people?.length !== personOrder?.length) {
    people?.forEach((person) => {
      newMemberOrder.push(person.socials.email);
    });
    await putData(
      'sort-orders',
      sort_order(
        'people',
        newMemberOrder.map((u) => ({ S: u })),
      ),
    );
  }

  const newProjectOrder: string[] = [];
  if (projects?.length !== projectOrder?.length) {
    projects?.forEach((project: Project) => {
      newProjectOrder.push(project.title);
    });
    await putData(
      'sort-orders',
      sort_order(
        'projects',
        newProjectOrder.map((u: string) => ({ S: u })),
      ),
    );
  }

  const newBlogOrder: string[] = [];
  if (blogs?.length !== blogOrder?.length) {
    blogs?.forEach((blog) => {
      newBlogOrder.push(blog.media_title);
    });
    await putData(
      'sort-orders',
      sort_order(
        'blogs',
        newBlogOrder.map((u) => ({ S: u })),
      ),
    );
  }
}
