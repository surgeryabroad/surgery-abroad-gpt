// Message.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Message as MessageProps } from "ai";
import MarkdownRenderer from "./MarkdownRenderer";
import avatar from "@/public/avatar.png";
import Image from "next/image";

// Utility function to clean annotations (you can also move this to a separate utils file)
const cleanAssistantResponse = (response: string): string => {
  const annotationRegex =
    /【\d+:\d+†source】|【\d+:\d+†source】【\d+:\d+†source】/g;
  return response.replace(annotationRegex, "").trim();
};

const Message = ({ message }: { message: MessageProps }) => {
  // Clean the message content if it's from the assistant or data role
  const cleanedContent =
    message.role === "assistant" || message.role === "data"
      ? cleanAssistantResponse(message.content)
      : message.content;

  return (
    <div
      className={`flex items-start gap-2 ${
        message.role === "user" ? "justify-end" : ""
      }`}
    >
      {message.role === "assistant" && (
        <Image
          src={avatar}
          quality={10}
          alt="avatar"
          className="shrink-0 rounded-full"
          width={40}
          height={40}
        />
      )}
      <Card
        className={`${
          message.role === "assistant" || message.role === "data"
            ? "self-start bg-background max-w-[80%] rounded-3xl px-2"
            : "self-end bg-secondary max-w-[80%] rounded-3xl px-2"
        } border-0`}
      >
        <CardContent className="flex p-2 gap-3">
          <MarkdownRenderer markdown={cleanedContent} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Message;
