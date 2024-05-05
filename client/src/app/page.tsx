"use client";
import Input from "@/components/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      router.push("/chat");
    }
  }, []);

  const handleClick = () => {
    if (username.trim() === "") return;
    sessionStorage.setItem("username", username.trim());
    router.push("/chat");
  };

  return (
    <main className="flex justify-center items-center p-12 min-h-screen bg-gradient">
      <div className="flex flex-col gap-4 w-[25rem] p-8 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold">Welcome to Chat App</h3>
        <p>Enter a Username to continue</p>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username..."
        />
        <button
          className="p-3 text-white bg-blue-500 rounded-lg border-none text-sm"
          onClick={handleClick}
        >
          Continue
        </button>
      </div>
    </main>
  );
}
