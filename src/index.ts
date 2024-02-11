/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { KitBuilder } from "@google-labs/breadboard/kits";
import generateCompletion, {
  GenerateCompletionInputs,
  GenerateCompletionOutputs,
} from "./nodes/generate-completion.js";
import { addKit } from "@google-labs/breadboard";

const coreHandlers = {
  generateCompletion,
};

const ClaudeKit = new KitBuilder({
  url: "npm:@paulkinlan/claude-breadboard-kit",
  title: "ClaudeBreadboardKit",
  description: "A set of nodes for using Anthropic's Claude",
  version: "0.1.1",
}).build(coreHandlers);

export default ClaudeKit;
export { ClaudeKit };
export const claude = addKit(ClaudeKit);

export type GenerateCompletionNodeType = ReturnType<typeof generateCompletion>;
export type { GenerateCompletionInputs, GenerateCompletionOutputs };
export type ClaudeKit = InstanceType<typeof ClaudeKit>;
