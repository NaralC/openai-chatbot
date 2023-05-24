import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { create } from "zustand";

type State = {
  messages: Message[];
  isMessageUpdating: boolean;
};

type Action = {
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}

export const useMessagesStore = create<State & Action>((set) => ({
  messages: [
    {
      id: nanoid(),
      text: "Hi! How can I help?",
      isUserMessage: false,
    },
  ],
  isMessageUpdating: false,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== id),
    })),
  updateMessage: (id, updateFn) =>
    set((state) => ({
      messages: state.messages.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            text: updateFn(message.text),
          };
        }
        return message;
      }),
    })),
  setIsMessageUpdating: (isUpdating) =>
    set(() => ({ isMessageUpdating: isUpdating })),
}));
