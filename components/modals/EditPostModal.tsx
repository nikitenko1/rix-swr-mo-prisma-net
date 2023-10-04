import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
//
import Avatar from "../Avatar";
import Modal from "./Modal";
//
import usePostEditModal from "@/hooks/useEditPostModal";
import usePost from "@/hooks/usePost";

const EditPostModal = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { isOpen, onClose } = usePostEditModal();
  const { data: post, mutate } = usePost(postId as string);

  const [body, setBody] = useState<string>("");

  useEffect(() => {
    if (post) {
      setBody(post.body);
    }
  }, [post]);

  const [loading, setLoading] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<number>(140);
  const [bodyLength, setBodyLength] = useState<number>(0);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length > 140) return;
      setBody(e.target.value);
      setBodyLength(e.target.value.length);
      setRemaining(140 - e.target.value.length);
    },
    [setBody, setBodyLength, setRemaining]
  );

  const handleEdit = useCallback(async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/posts/${postId}`, { body });
      toast.success("Post Updated");
      setBody("");
      mutate();
      setLoading(false);
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message);
      setLoading(false);
    }
  }, [body, postId, mutate]);
  const bodyContent = (
    <div className="flex gap-4 mt-2">
      <div>
        <Avatar userId={post?.userId as string} />
      </div>
      <div className="w-full">
        <textarea
          disabled={loading}
          value={body}
          onChange={handleChange}
          className="w-full h-20 disabled:opacity-80 peer resize-none mt-3  p-2 rounded-lg text-[20px]
           placeholder-gray-400 focus:outline-none ring-0 outline-none"
        />
        {bodyLength >= 130 && (
          <p
            className="text-red-500 text-center mx-32 border-2 border-solid border-blue-400 
          rounded-full h-10 w-10"
          >
            {remaining}
          </p>
        )}
        <hr className="opacity-0 peer-focous:oopacity-100 h-[1px] w-full border-gray-300 transition" />
        <div className="flex justify-end"></div>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Post"
        body={bodyContent}
        actionLabel="Edit"
        onSubmit={handleEdit}
      />
    </>
  );
};
export default EditPostModal;
