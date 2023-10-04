import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import FormImageUpload from "../FormImageUpload";
import Input from "../Input";
import Modal from "./Modal";
//
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

const EditModal = () => {
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //
  const { data: currentUser } = useCurrentUser();
  const editModal = useEditModal();
  const { mutate: editUser } = useUser(currentUser?.user?.id);

  useEffect(() => {
    setProfileImage(currentUser?.user?.profileImage);
    setCoverImage(currentUser?.user?.coverImage);
    setName(currentUser?.user?.name);
    setBio(currentUser?.user?.bio);
  }, [
    currentUser?.user?.name,
    currentUser?.user?.bio,
    currentUser?.user?.profileImage,
    currentUser?.user?.coverImage,
  ]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length > 50) return;
      else if (event.target.value.length < 3) return;
      setName(event.target.value);
    },
    [setName]
  );

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/edit`, { name, bio, profileImage, coverImage });
      editUser();
      toast.success("Profile updated successfully");
      editModal.onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  }, [name, bio, profileImage, coverImage, editUser, editModal.onClose]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <FormImageUpload
        value={coverImage}
        onChange={(image) => setCoverImage(image)}
        label="Cover Image"
      />

      <FormImageUpload
        value={profileImage}
        onChange={(image) => setProfileImage(image)}
        label="Profile Image"
      />
      <Input
        onChange={handleChange}
        value={name}
        placeholder="Name"
        type="text"
        disabled={isLoading}
      />
      <textarea
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        placeholder="Bio"
        className="pl-2 w-full h-20 disabled:opacity-80 resize-none mt-3 p-2 rounded-lg text-[20px]
         placeholder-gray-400 focus:outline-none ring-0 outline-none border-2 border-gray-400"
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      actionLabel="Edit"
      isOpen={editModal.isOpen}
      title="Edit Profile"
      body={bodyContent}
    />
  );
};

export default EditModal;
