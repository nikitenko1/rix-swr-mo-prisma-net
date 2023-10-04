import useGetNestedReplays from "@/hooks/useGetNestedReplays";
import NestedItem from "./NestedItem";

interface IProps {
  replayId: string;
}

const NestedReplayFeed = ({ replayId }: IProps) => {
  const { data: nestedReplays, mutate: nestedMutatedReplay } = useGetNestedReplays(
    replayId as string
  );

  return (
    <>
      {nestedReplays &&
        nestedReplays?.map((replay: NestedReplay) => (
          <>
            <NestedItem
              key={replay.id}
              nestedReplay={replay}
              nestedMutatedReplay={nestedMutatedReplay}
            />
          </>
        ))}
    </>
  );
};
export default NestedReplayFeed;
