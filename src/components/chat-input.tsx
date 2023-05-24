"use client";

import { MessagesContext } from "@/context/messages";
import { useMessagesStore } from "@/context/messages-zustand";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import React, { FC, HTMLAttributes, useContext, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

export const runtime = "edge"; // 'nodejs' (default) | 'edge'

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [input, setInput] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // const {
  //   messages,
  //   addMessage,
  //   removeMessage,
  //   updateMessage,
  //   setIsMessageUpdating
  // } = useContext(MessagesContext);

  const [
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  ] = useMessagesStore((state) => [
    state.messages,
    state.addMessage,
    state.removeMessage,
    state.updateMessage,
    state.setIsMessageUpdating,
  ]);

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [message],
        }),
      });
      
      if (!response.ok) {
        throw new Error("API Route error")
      }

      return response.body;
    },

    onSuccess: async (stream) => {
      if (!stream) {
        throw new Error("No stream found");
      }

      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: "",
      };
      addMessage(responseMessage);
      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        console.log(chunkValue);

        updateMessage(id, (prev) => prev + chunkValue);
      }

      // Clean up and re-focus the textarea
      setIsMessageUpdating(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },

    onMutate: (message) => {
      addMessage(message);
      setInput("");
    },

    onError: (error, variables, context) => {
      toast.error("Something went wrong");
      removeMessage(variables.id)
      textareaRef.current?.focus();
    }
  });

  return (
    <div {...props} className={cn("border-t border-zinc-300 px-3", className)}>
      <div className="relative flex-1 mt-4 overflow-hidden border-none rounded-lg outline-none">
        <TextareaAutosize
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          maxRows={4}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              const message: Message = {
                id: nanoid(),
                isUserMessage: true,
                text: input,
              };

              sendMessage(message);
            }
          }}
          placeholder={"Ask me something.."}
          disabled={isLoading}
          className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6 focus:border-indigo-400 focus:border-b-2"
        />

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center px-1 font-sans text-xs text-gray-400 bg-white border border-gray-200 rounded">
            {isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <CornerDownLeft className="w-3 h-3" />
            )}
          </kbd>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 border-t border-gray-300"
        />
      </div>
    </div>
  );
};

export default ChatInput;
