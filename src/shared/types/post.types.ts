export interface Post {
  title: string;
  content: string;
  date: string;
  author?: string;
  image?: string;
}
export const post = ({ title, date, content }: Post) => {
  return {
    title: { S: title },
    date: { S: date },
    data: {
      M: {
        content: { S: content },
        title: { S: title },
        date: { S: date },
      },
    },
  };
};
