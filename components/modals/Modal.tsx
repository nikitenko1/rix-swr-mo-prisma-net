import { ReactElement, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
//
import Button from "../Button";

interface IProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  customError?: string;
}
const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
}: IProps) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    } else {
      onSubmit();
    }
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="justify-center items-center flex 
          overflow-x-hidden overflow-y-auto 
          fixed inset-0 z-50 outline-none focus:outline-none
          bg-neutral-800 bg-opacity-70"
      >
        <div className="relative w-full lg:w-3/6 md:top-10 mx-auto lg:max-w-3xl h-24 min-h-full">
          {/*content*/}
          <div
            className="
            border-0 rounded-lg shadow-lg 
            flex flex-col w-full 
            bg-gray-300 outline-none focus:outline-none
            "
          >
            {/*header*/}
            <div
              className="
              flex items-center justify-between p-10"
            >
              <h3 className="text-3xl font-semibold text-black">{title}</h3>
              <button
                className="
                  p-1 ml-auto border-0 text-white hover:scale-105
                  hover:text-red-600 transition"
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-10 flex-auto">{body}</div>
            {/*footer*/}
            <div className="flex flex-col gap-2 p-10">
              <Button
                disabled={disabled}
                label={actionLabel}
                secondary
                fullWidth
                large
                onClick={handleSubmit}
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
