/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import Anthropic from "@anthropic-ai/sdk";

import claude from "@anthropic-ai/tokenizer/claude.json" assert { type: "json" };
import type { InputValues, OutputValues } from "@google-labs/breadboard";
import { Tiktoken, TiktokenBPE } from "js-tiktoken";

export function countTokens(text: string): number {
  const tokenizer = getTokenizer();
  const encoded = tokenizer.encode(text.normalize("NFKC"));
  return encoded.length;
}

export function getTokenizer(): Tiktoken {
  const tiktokenBPE: TiktokenBPE = {
    pat_str: claude.pat_str,
    special_tokens: claude.special_tokens,
    bpe_ranks: claude.bpe_ranks,
  };
  return new Tiktoken(tiktokenBPE);
}

export type GenerateCompletionOutputs = OutputValues & {
  completion: string;
};

export type GenerateCompletionInputs = {
  /**
   * The model to use for text completion.
   */
  model: string;
   /**
   * The number of tokens to use in text completion.
   */
  maxTokens: number;
  /**
   * Prompt for text completion.
   */
  text: string;
  /**
   * The OPEN AI Platform API key
   */
  CLAUDE_API_KEY: string;
};

export default async (inputs: InputValues): Promise<GenerateCompletionOutputs> => {
  const values = inputs as GenerateCompletionInputs;
  const model = values.model || "claude-2";
  
  if (!values.CLAUDE_API_KEY)
    throw new Error("Text completion requires `CLAUDE_API_KEY` input");
  if (!values.text) throw new Error("Text completion requires `text` input");

  const inputTokenCount = countTokens(values.text);
  const maxTokens = values.maxTokens || 100_000 - inputTokenCount;

  if (maxTokens <= 0) throw new Error(`Text completion requires 'text' input to be shorter than the model's max token count of 100,000 tokens. Your input was ${inputTokenCount} tokens.`);

  let output = "";

  try {
    const anthropic = new Anthropic({
      apiKey: values.CLAUDE_API_KEY,
    });
    
    const completion = await anthropic.completions.create({
      model,
      max_tokens_to_sample: maxTokens,
      prompt: `${Anthropic.HUMAN_PROMPT} ${values.text}${Anthropic.AI_PROMPT}`, // TODO - make this a parameter
      stream: false, // TODO - make this a parameter
    });
  
    output = (completion.completion.length > 0) ? completion.completion : "No data";
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