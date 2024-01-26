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
