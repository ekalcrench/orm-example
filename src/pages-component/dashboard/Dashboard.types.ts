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
  author: Author;
  body: string;
  comments: any[];
  createdDate: string;
  id: string;
  image: string | null;
  lastModifiedDate: string;
}

export type PaginatedPosts = PaginatedData<PostData[]>;
