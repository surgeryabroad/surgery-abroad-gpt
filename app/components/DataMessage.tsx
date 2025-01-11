import { AssistantDataMessageClient } from "../types/data-message";
import PossibleQuestions from "./PossibleQuestions";

const DataMessage = ({
  message,
  onQuestionClick,
}: {
  message: AssistantDataMessageClient;
  onQuestionClick: (question: string) => void;
}) => {
  return (
    <>
      {message.data.type === "message.text" && (
        <PossibleQuestions
          messageText={message.data.value}
          onQuestionClick={onQuestionClick}
        />
      )}
    </>
  );
};

export default DataMessage;
