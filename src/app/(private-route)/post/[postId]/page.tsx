import PostDetail from '@/pages-component/post-detail';

function PostDetailPage({ params }: { params: { postId: string } }) {
  return <PostDetail postId={params.postId} />;
}

export default PostDetailPage;
