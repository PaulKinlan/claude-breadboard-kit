/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { InputValues, OutputValues } from "@google-labs/graph-runner";
import { encode } from 'gpt-3-encoder';
import { Configuration, OpenAIApi } from "openai";

export type GenerateCompletionOutputs = OutputValues & {
  completion: string;
};

export type GenerateCompletionInputs = {
  /**
   * The model to use for text completion.
   */
  model: string;
  /**
   * Prompt for text completion.
   */
  text: string;
  /**
   * The OPEN AI Platform API key
   */
  OPENAI_API_KEY: string;
};

const modelTokenCounts: Record<string, number> = {
  'gpt-4': 8192,
  'gpt-4-32k': 32768,
  'gpt-3.5-turbo': 4096,
  'gpt-3.5-turbo-16k': 16384,
  'text-davinci-003': 4097,
  'text-davinci-002': 4097
}

export default async (inputs: InputValues): Promise<GenerateCompletionOutputs> => {
  const values = inputs as GenerateCompletionInputs;
  const model = values.model || "text-davinci-003";

  if (model in modelTokenCounts === false) throw new Error(`Model ${model} is not supported`);
  if (!values.OPENAI_API_KEY)
    throw new Error("Text completion requires `OPENAI_API_KEY` input");
  if (!values.text) throw new Error("Text completion requires `text` input");

  const inputTokenCount = encode(values.text).length;
  const maxTokens = modelTokenCounts[model] - inputTokenCount;

  if (maxTokens <= 0) throw new Error(`Text completion requires 'text' input to be shorter than the model's max token count of ${modelTokenCounts[model]} tokens`);

  const configuration = new Configuration({
    apiKey: values.OPENAI_API_KEY
  });

  let output = "";

  try {

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: model,
      prompt: values.text,
      max_tokens: maxTokens,
    });

    output = (response.data.choices.length > 0) ? response.data.choices[0].text || "No data" : "No data";
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    output = "error"
  }

  return { completion: output };
};