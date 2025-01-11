"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowRight, Dot, Loader, RotateCcw } from "lucide-react";
import { useEnterSubmit } from "@/lib/hooks/useEnterSubmit";
import Message from "./Message";
import { useAssistant } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { useScrollToBottom } from "@/lib/hooks/useScrollToBottom";
import TooltipButton from "./TooltipButton";
import InitialQuestions from "./InitialQuestions";
import { useQuestionSubmit } from "@/lib/hooks/useQuestionSubmit";
import PossibleQuestions from "./PossibleQuestions";
import avatar from "@/public/avatar.png";
import Image from "next/image";
import DataMessage from "./DataMessage";
import { AssistantDataMessageClient } from "../types/data-message";

export default function Chat() {
  const {
    input,
    messages,
    status,
    threadId,
    setInput,
    submitMessage,
    handleInputChange,
    setMessages,
    setThreadId,
  } = useAssistant({ api: "/api/assistant" });
  const { formRef, onKeyDown } = useEnterSubmit();
  const [possibleQuestionsMessage, setPossibleQuestionsMessage] =
    useState<string>();
  const { handleQuestionClick, setQuestionSelected } = useQuestionSubmit(
    submitMessage,
    setInput
  );

  const divRef = useRef<HTMLDivElement>(null);
  useScrollToBottom(divRef, [messages]);

  useEffect(() => {
    const possibleQuestionMessages = messages.filter(
      (message) =>
        message.role === "data" &&
        (message as AssistantDataMessageClient).data.type === "message.text"
    );
    if (possibleQuestionMessages && possibleQuestionMessages.length > 0) {
      setPossibleQuestionsMessage(
        (
          possibleQuestionMessages[
            possibleQuestionMessages.length - 1
          ] as AssistantDataMessageClient
        ).data.value
      );
    }
  }, [messages]);

  // Reset conversation
  const resetConversation = () => {
    setThreadId(undefined);
    setMessages([]);
    setQuestionSelected(false);
  };

  return (
    <Card className="flex flex-col h-[100dvh] border-0">
      <CardHeader className="p-2 md:px-4">
        <div className="flex justify-end items-center">
          <TooltipButton text="Reset chat">
            <Button
              disabled={
                (messages.length === 0 && !threadId) || status === "in_progress"
              }
              onClick={resetConversation}
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <RotateCcw />
            </Button>
          </TooltipButton>
        </div>
      </CardHeader>
      <CardContent
        ref={divRef}
        className="grow flex flex-col gap-6 p-4 md:py-8 md:px-12 overflow-y-auto scroll-smooth"
      >
        {messages.length === 0 && (
          <InitialQuestions onQuestionClick={handleQuestionClick} />
        )}
        {messages.map((message) => {
          if (message.role !== "data") {
            return <Message key={message.id} message={message} />;
          }
        })}
        {status === "in_progress" &&
          messages[messages.length - 1].role === "user" && (
            <div className="flex gap-2 items-center">
              <Image
                src={avatar}
                quality={10}
                alt="avatar"
                className="shrink-0 rounded-full"
                width={40}
                height={40}
              />
              <Loader className="animate-spin" />
            </div>
          )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2 mt-2 p-2 md:py-4 md:px-12">
        {possibleQuestionsMessage && (
          <PossibleQuestions
            messageText={possibleQuestionsMessage}
            onQuestionClick={handleQuestionClick}
          />
        )}
        <form
          ref={formRef}
          onSubmit={submitMessage}
          className="w-full grow bg-secondary flex items-end gap-2 border rounded-3xl border-muted p-1"
        >
          <TextareaAutosize
            placeholder="Send a message"
            className="resize-none bg-secondary w-full self-center px-3 focus-within:outline-none text-sm rounded-3xl placeholder:text-background placeholder:font-semibold"
            minRows={1}
            maxRows={10}
            autoFocus
            tabIndex={0}
            value={input}
            onKeyDown={onKeyDown}
            onChange={handleInputChange}
          />
          <TooltipButton text="Send message">
            <Button
              type="submit"
              size="icon"
              className="rounded-full shrink-0"
              disabled={status !== "awaiting_message" || input.length === 0}
            >
              {status === "awaiting_message" && <ArrowRight />}
              {status === "in_progress" && <Loader className="animate-spin" />}
            </Button>
          </TooltipButton>
        </form>
      </CardFooter>
    </Card>
  );
}
