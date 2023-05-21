"use client";

import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import React, { FC, HTMLAttributes, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [input, setInput] = useState<string>("");

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/message", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: 'hello world'
        })
      });
    },
  });

  return (
    <div {...props} className={cn("border-t border-zinc-300 px-3", className)}>
      <div className="relative flex-1 mt-4 overflow-hidden border-none rounded-lg outline-none">
        <TextareaAutosize
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          maxRows={4}
          autoFocus
          placeholder={"Ask me something.."}
          className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default ChatInput;
