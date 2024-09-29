import { PaginatedData } from '@/utils';

export interface PostParameter {
  page: number;
  pageSize: number;
}

export interface Author {
  name: string;
  email: string;
  profilePicture: string;
}

export interface PostData {
  id: string;
  body: string;
  image: string | null;
  author: Author;
}

export type PaginatedPosts = PaginatedData<PostData[]>;
