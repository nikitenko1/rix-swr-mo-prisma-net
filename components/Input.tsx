import { ChangeEvent } from "react";

interface IProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Input = ({ placeholder, value, type = "text", onChange, disabled, label }: IProps) => {
  return (
    <div className="w-full">
      {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="
            w-full
            p-4 
            text-lg 
            placeholder-gray-400
            border-2 border-gray-400 
            rounded-md
            outline-none
            text-black
            focus:border-sky-500
            focus:border-2
            transition
            disabled:bg-neutral-900
            disabled:opacity-70
            disabled:cursor-not-allowed
          "
      />
    </div>
  );
};

export default Input;
