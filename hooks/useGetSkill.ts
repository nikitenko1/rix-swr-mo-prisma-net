import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useGetSkill = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<Skill[]>(
    userId ? `/api/users/skill?userId=${userId}` : "/api/users/skill",
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
export default useGetSkill;
