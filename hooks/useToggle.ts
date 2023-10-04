import { useCallback, useState } from "react";
import useLoginModal from "./useLoginModal";
import useRegisterModal from "./useRegisterModal";

const useToggle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const RegistrationModal = useRegisterModal();
  const loginModal = useLoginModal();

  // useCallback will return a memoized version of the callback that only changes if one of the inputs
  const register = useCallback(() => {
    if (loading) return;
    loginModal.onClose();
    RegistrationModal.onOpen();
  }, [loading, loginModal, RegistrationModal]);
  // useCallback will return a memoized version of the callback that only changes if one of the inputs
  const login = useCallback(() => {
    if (loading) return;
    RegistrationModal.onClose();
    loginModal.onOpen();
  }, [loading, loginModal, RegistrationModal]);

  return { register, login, loading, setLoading };
};

export default useToggle;
