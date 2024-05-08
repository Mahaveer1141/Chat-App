import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

interface IProps {
  mine?: boolean;
  username: string;
  message: string;
  time: string;
}

export default function MessageBox({ message, mine, time, username }: IProps) {
  const [showCopied, setShowCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  };

  return (
    <div
      className={`flex flex-wrap flex-col p-4 bg-[#2b2e36] gap-4 max-w-[60%] mb-4 rounded-lg ${mine ? "ml-auto bg-[#8d988d]" : ""}`}
    >
      {!mine && <div className="text-sm">{username}</div>}
      <div className="flex items-baseline">
        <div>{message}</div>
        <div className="ml-auto">
          {showCopied ? (
            <IoCheckmarkDoneCircleOutline className="text-xs" />
          ) : (
            <FaRegCopy
              onClick={() => copyToClipboard()}
              className="text-xs cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="ml-auto text-xs">{time}</div>
    </div>
  );
}
