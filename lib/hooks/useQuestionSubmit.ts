import { useCallback, useEffect, useState } from "react";

export function useQuestionSubmit(
  submitMessage: () => void,
  setInput: (question: string) => void
) {
  const [isQuestionSelected, setQuestionSelected] = useState(false);

  const handleQuestionClick = useCallback((question: string) => {
    setInput(question);
    setQuestionSelected(true);
  }, []);

  useEffect(() => {
    if (isQuestionSelected) {
      submitMessage();
      setQuestionSelected(false);
    }
  }, [isQuestionSelected]);

  return { handleQuestionClick, setQuestionSelected };
}
