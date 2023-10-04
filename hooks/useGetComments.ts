import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useGetComments = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR<_Comment[]>(
    postId ? `/api/comment/comment?postId=${postId}` : null,
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
export default useGetComments;
