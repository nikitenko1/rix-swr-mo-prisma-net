import { CircleLoader } from "react-spinners";
import CommentItem from "./CommentItem";
import useGetComments from "@/hooks/useGetComments";

interface IProps {
  postId: string;
}

const CommentsFeed = ({ postId }: IProps) => {
  const { data: comments, isLoading, mutate: mutatedComment } = useGetComments(postId as string);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full" key={"loading"}>
          <CircleLoader color="#3B82F6" size={50} />
        </div>
      ) : (
        <>
          {comments &&
            comments.map((comment: _Comment) => (
              <>
                <CommentItem key={comment.id} comment={comment} mutatedComment />
              </>
            ))}
        </>
      )}
    </>
  );
};
export default CommentsFeed;
