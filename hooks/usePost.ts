import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const usePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR<Post>(
    postId ? `/api/posts/${postId}` : null,
    fetcher
  );
  return {
    data,
    isLoading,
    error,
    // update the local data immediately and revalidate (refetch)
    // NOTE: key is not required when using useSWR's mutate as it's pre-bound
    mutate,
  };
};
export default usePost;
