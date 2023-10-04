import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { AiOutlineGif } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import Picker from "@emoji-mart/react";
import toast from "react-hot-toast";
import axios from "axios";
//
import Avatar from "./Avatar";
import Button from "./Button";
import FormItem from "./FormItem";
import FormImageUpload from "./FormImageUpload";
//
import useToggle from "@/hooks/useToggle";
import useCurrentUser from "@/hooks/useCurrentUser";
import useGetComments from "@/hooks/useGetComments";
import usePosts from "@/hooks/usePosts";

interface IProps {
  placeholder: string;
  isComment?: boolean;
  postid?: string;
  isReplay?: boolean;
  commentId?: string;
  mutatedReplay?: any;
  isNestedReplay?: boolean;
  mutatedNestedReplay?: any;
  replayId?: string;
}

export interface FormTab {
  icon: IconType;
  title: string;
}

const Tabs: FormTab[] = [
  {
    icon: IoImageOutline,
    title: "Image",
  },
  {
    icon: BsEmojiSmile,
    title: "Emoji",
  },
  {
    icon: AiOutlineGif,
    title: "GIF",
  },
];

const Form = ({
  placeholder,
  isComment,
  isReplay,
  commentId,
  mutatedReplay,
  postid,
  isNestedReplay,
  replayId,
  mutatedNestedReplay,
}: IProps) => {
  const [body, setBody] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [characterRemain, setCharacterRemain] = useState<number>(240);
  const [bodyLength, setBodyLength] = useState<number>(0);
  const [emoji, setEmoji] = useState(null);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");

  //
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const { postId } = router.query;
  // Lets say your url is http://localhost:3000/service?serviceId=1
  // console.log(router.pathname); // returns /service
  const path = router.asPath;
  // console.log(router.asPath); //returns /service?serviceId=1

  const { login } = useToggle();
  const { mutate: mutatePost } = usePosts();
  const { mutate: mutatedComment } = useGetComments(postId as string);
  //

  //
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length > 240) return;
      setBody(e.target.value);
      setBodyLength(e.target.value.length);
      setCharacterRemain(240 - e.target.value.length);
    },
    [setBody, setBodyLength, setCharacterRemain]
  );

  const onSubmit = useCallback(async () => {
    if (!currentUser) {
      login();
      return;
    }
    try {
      const url = isComment ? `/api/comment/comment?postId=${postId}` : `/api/posts/`;
      //
      if (isReplay) {
        setLoading(true);
        await axios.post(`/api/comment/replay/`, { body, commentId: commentId, postId: postid });
        toast.success("Replayed successfully");
        setBody("");
        mutatedReplay();
      }
      //
      else if (isNestedReplay) {
        setLoading(true);
        await axios.post(`/api/replay/nestedreplay/`, { body, replayId: replayId });
        toast.success("Nested replayed successfully");
        setBody("");
        mutatedNestedReplay();
      }
      //
      else {
        setLoading(true);
        await axios.post(url, {
          body,
          image: coverImage,
        });
        toast.success(isComment ? "Commented successfully" : "Posted successfully");
        setBody("");
        setCoverImage("");
        setSelectedTab("");
        //
        mutatePost();
        if (isComment) {
          mutatedComment();
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, [body, setBody, mutatePost, isComment, postId, currentUser, login, coverImage]);

  const handleEmoji = (emoji: any) => {
    setEmoji(emoji);
    setBody(body + emoji.native);
  };

  return (
    <div className="flex gap-4 mt-2 mx-5 sm:p-2 lg:p-5">
      <div className="p-2">
        <Avatar userId={currentUser?.user?.id} />
      </div>
      <div>
        <textarea
          disabled={loading}
          value={body}
          onChange={handleChange}
          // peer class, and use peer-* modifiers like peer-invalid
          className="w-full h-20 disabled:opacity-80 peer resize-none mt-3 
          p-2 rounded-md text-[18px] focus:outline-none ring-0 outline-none"
          placeholder={placeholder}
        />
        {bodyLength >= 130 && (
          <p
            className="text-red-500 text-center mx-32 border-2 border-dashed border-blue-400 
          rounded-full h-10 w-10"
          >
            {characterRemain}
          </p>
        )}

        <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-gray-300 transition" />
        <div className="flex  gap-2">
          {!isComment &&
            Tabs.map((tab, index) => (
              <FormItem
                key={index}
                tab={tab}
                selectedTab={tab.title === selectedTab}
                setSelectedTab={setSelectedTab}
              />
            ))}
        </div>

        {currentUser?.user && selectedTab === "Emoji" && (
          <div>
            <Picker set="twitter" onEmojiSelect={handleEmoji} />
          </div>
        )}

        {currentUser?.user && path === "/" && selectedTab === "Image" && (
          <FormImageUpload
            value={coverImage}
            onChange={(image) => setCoverImage(image)}
            label="click here to upload image"
            isHome
          />
        )}

        {currentUser?.user && path === "/" && selectedTab === "GIF" && <div></div>}

        <div className="flex justify-end mr-5 p-2">
          <Button
            label={isComment ? "Replay" : "Share"}
            disabled={loading || !body}
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
