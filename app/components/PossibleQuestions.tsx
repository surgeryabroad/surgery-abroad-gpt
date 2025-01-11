import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { generatePossibleQuestions } from "../utils/actions";

interface PossibleQuestionsProps {
  messageText: string;
  onQuestionClick: (question: string) => void;
}

const PossibleQuestions: React.FC<PossibleQuestionsProps> = ({
  messageText,
  onQuestionClick,
}) => {
  const [questions, setQuestions] = useState<string[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Generating questions for message:", messageText);

        if (!messageText) {
          throw new Error("Message text is empty");
        }

        const possibleQuestions = await generatePossibleQuestions(messageText);
        console.log("Generated questions:", possibleQuestions);

        if (!Array.isArray(possibleQuestions)) {
          throw new Error("Generated questions is not an array");
        }

        setQuestions(possibleQuestions);
      } catch (err) {
        console.error("Error generating questions:", err);
        setError(
          err instanceof Error ? err.message : "Failed to generate questions"
        );
      } finally {
        setLoading(false);
      }
    };

    generateQuestions();
  }, [messageText]);

  if (error) return null;

  if (loading) return null;

  if (!questions?.length) return null;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {questions.map((question, index) => (
          <Button
            key={index}
            size="sm"
            variant="outline"
            className="whitespace-nowrap rounded-2xl text-[10px] font-base"
            type="submit"
            onClick={() => onQuestionClick(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PossibleQuestions;
