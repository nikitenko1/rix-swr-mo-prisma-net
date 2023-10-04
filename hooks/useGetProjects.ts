import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useGetProjects = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<Project[]>(
    userId ? `/api/users/project?userId=${userId}` : "/api/users/project",
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
export default useGetProjects;
