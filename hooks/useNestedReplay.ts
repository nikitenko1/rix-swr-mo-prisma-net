import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useNestedReplay = (nestedreplayId: string) => {
  const { data, error, mutate, isLoading } = useSWR<NestedReplay>(
    nestedreplayId ? `/api/nestedreplay/${nestedreplayId}` : null,
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
export default useNestedReplay;
