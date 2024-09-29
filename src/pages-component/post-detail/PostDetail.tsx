'use client';

import { PostDetailProps } from './PostDetail.types';

function PostDetail(props: PostDetailProps) {
  return <div>{props.postId}</div>;
}

export default PostDetail;
