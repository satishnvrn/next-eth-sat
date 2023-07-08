import { MouseEventHandler } from 'react';

interface buttonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: React.ReactNode;
  classes?: string;
}

export default function Button({
  onClick,
  disabled,
  children,
  classes,
}: buttonProps) {
  return (
    <button
      className={`px-3 py-1.5 text-sm text-white duration-150 bg-blue-600 rounded-lg hover:bg-blue-700 active:shadow-lg disabled:opacity-25 max-h-10 self-center ${classes}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
