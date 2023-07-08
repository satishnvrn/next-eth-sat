import { ChangeEventHandler } from "react";

interface NumberInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value: number | string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  classes?: string;
}

export default function NumberInput({
  id = 'NumberInput',
  label,
  placeholder = '',
  value,
  onChange,
  classes
}: NumberInputProps) {
  return (
    <div className="mb-3">
      {label && (
        <label className="text-sm text-navy-700 dark:text-white font-bold">
          {label}
        </label>
      )}
      <input
        type="number"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 ${classes}`}
      />
    </div>
  );
}
