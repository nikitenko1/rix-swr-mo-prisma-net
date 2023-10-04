import PostItem from "./PostItem";
import usePosts from "@/hooks/usePosts";

interface IProps {
  userId?: string;
}

const PostFeed = ({ userId }: IProps) => {
  const { data: posts, mutate } = usePosts(userId);

  return (
    <>
      {posts &&
        posts.map((post: any) => (
          <PostItem key={post.id} post={post} userId={userId} mutate={mutate} />
        ))}
      {posts instanceof Array && posts.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl font-bold text-gray-500">No posts yet</h1>
        </div>
      )}
    </>
  );
};
export default PostFeed;
