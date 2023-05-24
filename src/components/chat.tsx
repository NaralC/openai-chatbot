'use client'

import React, { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";
import { MessagesProvider } from "@/context/messages";

const Chat: FC = () => {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="relative z-40 bg-white shadow"
      >
        <AccordionItem value="item-1">
          <div className="fixed overflow-hidden bg-white border border-gray-200 rounded-md right-8 w-80 bottom-8">
            <div className="flex flex-col w-full h-full">
              <AccordionTrigger className="px-6 border-b border-zinc-300">
                <ChatHeader />
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col h-80">
                  <MessagesProvider>
                    <ChatMessages />
                    <ChatInput />
                  </MessagesProvider>
                </div>
              </AccordionContent>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Chat;
