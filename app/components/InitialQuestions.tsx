import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

interface InitialQuestionsProps {
  onQuestionClick: (questions: string) => void;
}

const initialQuestions = [
  "What are the best clinics available in Lithuania?",
  "What plastic surgery procedures are available in Lithuania?",
  "Tell me about medical tourism",
  "Why should I choose Lithuania for my plastic surgery?",
];

const InitialQuestions = ({ onQuestionClick }: InitialQuestionsProps) => {
  return (
    <Card className="flex flex-col items-center justify-center border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl flex justify-center items-center">
          <Image src={logo} alt="logo" width={200} height={200} priority />
        </CardTitle>
        <CardDescription className="text-xs md:text-lg">
          Choose a question to start or type your own below.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:grid md:grid-cols-2 gap-4">
        {initialQuestions.map((question, index) => (
          <div
            key={index}
            className="flex items-center gap-4 md:gap-2 border border-input rounded-md text-sm font-medium p-4 select-none transition-colors bg-background hover:bg-accent hover:text-accent-foreground hover:cursor-pointer"
            onClick={() => onQuestionClick(question)}
          >
            <MessageCircle size={20} className="shrink-0" />
            {question}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default InitialQuestions;
