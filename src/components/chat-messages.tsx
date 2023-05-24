"use client";

import { MessagesContext } from "@/context/messages";
import { useMessagesStore } from "@/context/messages-zustand";
import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes, useContext } from "react";
import { useStore } from "zustand";
import MarkdownLite from "./markdown-lite";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
  // const { messages } = useContext(MessagesContext)
  const messages = useMessagesStore((state) => state.messages);

  const inverseMessages = [...messages];

  return (
    <div
      {...props}
      className={cn(
        "p-3 flex flex-1 flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
        className
      )}
    >
      <div className="flex-1 flex-grow">
        {inverseMessages.map((message) => (
          <div className="chat-message" key={message.id}>
            <div
              className={cn("flex items-end", {
                "justify-end": message.isUserMessage,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-sm max-w-xs mx2 overflow-x-hidden",
                  {
                    "order-1 items-end": message.isUserMessage,
                    "order-2 items-start": !message.isUserMessage,
                  }
                )}
              >
                <div
                  className={cn("p-2 rounded-lg my-1", {
                    "bg-blue-600 text-white": message.isUserMessage,
                    "bg-gray-200 text-gray-900": !message.isUserMessage,
                  })}
                >
                <MarkdownLite text={message.text}/></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
