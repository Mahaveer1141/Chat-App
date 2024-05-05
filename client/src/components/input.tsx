import { ChangeEvent } from "react";

interface IProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function Input({ value, onChange, placeholder }: IProps) {
  return (
    <div>
      <input
        className="w-full border-none rounded-[20px] px-4 py-3 text-sm leading-4 text-black"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
