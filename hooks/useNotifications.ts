import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useNotifications = (userId?: string) => {
  const { data, error, mutate, isLoading } = useSWR<Notification[]>(
    userId ? `/api/notification/${userId}` : null,
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
export default useNotifications;
