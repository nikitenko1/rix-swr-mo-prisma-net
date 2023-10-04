import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import axios from "axios";
import toast from "react-hot-toast";
import useToggle from "./useToggle";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: user } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchPost } = usePost(postId);
  const { mutate: mutateFetchPosts } = usePosts(userId);
  const { login } = useToggle();

  // useMemo will only recompute the memoized value when one of the deps has changed
  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likesId || [];
    return list.includes(user?.user.id);
  }, [fetchedPost, user]);

  const toggleLike = useCallback(async () => {
    if (!user) {
      return login();
    }
    try {
      let request;
      if (hasLiked) {
        request = () => axios.delete(`/api/like/`, { params: { postId } });
      } else {
        request = () => axios.post(`/api/like/`, { postId });
      }
      await request();
      mutateFetchPost();
      mutateFetchPosts();
      toast.success("Success");
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message);
    }
  }, [user, hasLiked, postId, mutateFetchPost, mutateFetchPosts, login]);
  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
