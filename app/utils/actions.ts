"use server";

import openai from "./openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const PossibleQuestions = z.object({
  possibleQuestions: z.array(z.string()),
});

export const fetchFileContent = async (fileId: string) => {
  const response = await openai.files.content(fileId);
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return `data:image/png;base64,${base64}`;
};

export const generatePossibleQuestions = async (message: string) => {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `This is the last message of the chatbot in the conversation with user. Generate 3 follow-up questions that the user is likely to ask after this message: "${message}"`,
      },
    ],
    response_format: zodResponseFormat(PossibleQuestions, "possibleQuestions"),
  });
  const questions = completion.choices[0].message.parsed;
  return questions?.possibleQuestions;
};
