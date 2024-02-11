import { board, Board, asRuntimeKit } from "@google-labs/breadboard";
import { Core, core } from "@google-labs/core-kit";
import { claude, ClaudeKit } from "@paulkinlan/claude-breadboard-kit";
import path from "path";
import test from "ava";

test("completion", async (t) => {
  const claudeBoard = await board(({ model, text }) => {
    return core
      .secrets({ keys: ["CLAUDE_API_KEY"] })
      .to(claude.generateCompletion({ model, text }));
  }).serialize({
    title: "ClaudeBoard",
    description: "A board for using Anthropic's Claude",
    version: "0.1.1",
  });

  const newBoard = await Board.fromGraphDescriptor(claudeBoard);
  const result = await newBoard.runOnce(
    {
      model: "claude-2",
      text: "How much wood can a woodchuck chuck?",
    },
    { kits: [asRuntimeKit(ClaudeKit), asRuntimeKit(Core)] }
  );

  t.regex(result.completion as string, /^ /); // Replies start with a space.
});
