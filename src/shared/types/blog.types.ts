export const blog = (
  id: string,
  media_title: string,
  media_type: string,
  media_date: string,
  media_source: string,
  media_content: string,
  order: number,
) => {
  const blog = {
    title: { S: id },
    data: {
      M: {
        media_type: { S: media_type },
        media_title: { S: media_title },
        media_date: { S: media_date },
        media_source: { S: media_source },
        media_content: { S: media_content },
        order: { N: order },
      },
    },
  };

  return blog;
};

export interface BlogFormInput {
  id: string;
  title: string;
  type: string;
  date: string;
  source: string;
  content: string;
  order: number;
}

export interface BlogResponse {
  id: string;
  media_title: string;
  media_type: string;
  media_date: string;
  media_source: string;
  media_content: string;
  order: number;
}
