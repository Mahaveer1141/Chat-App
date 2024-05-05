interface IProps {
  mine?: boolean;
  username: string;
  message: string;
  time: string;
}

export default function MessageBox({ message, mine, time, username }: IProps) {
  return (
    <div className={`flex flex-col p-4 bg-[#2b2e36] gap-4 max-w-[60%] mb-4 rounded-lg ${mine ? "ml-auto bg-[#8d988d]" : ""}`}>
      {!mine && <div className="text-sm">{username}</div>}
      <div>{message}</div>
      <div className="ml-auto text-xs">{time}</div>
    </div>
  );
}
