import React from "react";
import ReplayItem from "./ReplayItem";
import useReplays from "@/hooks/useReplays";

interface IProps {
  commentId: string;
}

const ReplaysFeed = ({ commentId }: IProps) => {
  const { data: replays, mutate: mutatedReplay } = useReplays(commentId);

  return (
    <>
      {replays &&
        replays.map((replay: Replay) => (
          <>
            <ReplayItem replay={replay} key={replay.id} mutatedReplay={mutatedReplay} />
          </>
        ))}
    </>
  );
};

export default ReplaysFeed;
