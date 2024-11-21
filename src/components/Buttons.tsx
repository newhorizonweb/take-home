import { FC } from "react";
import { XMarkIcon, RevertIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

export const ExpandButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      <XMarkIcon />
    </button>
  );
};

export const RevertButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      <RevertIcon />
    </button>
  );
};

export const ToggleButton: FC<Omit<ButtonProps, "children"> &
{ text: string, isActive?: boolean }> = ({ text, isActive, ...props }) => {
  return (
    <button 
      className={`main-btn text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1
        ${isActive ? 'btn-active' : ''}
      `}
      {...props}
    >
      {text}
    </button>
  );
};
