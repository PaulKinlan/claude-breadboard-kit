import { Board, asRuntimeKit } from "@google-labs/breadboard";
import { Starter } from "@google-labs/llm-starter";
import { ClaudeKit } from "@paulkinlan/claude-breadboard-kit";
import path from "path";
import test from 'ava';

test('completion', async (t) => {

  const board = await Board.load(
    path.join(process.cwd(), "graphs", "completion.json")
  );

  const result = await board.runOnce({
    model: "claude-2",
    text: "How much wood can a woodchuck chuck?",
  }, { kits: [asRuntimeKit(ClaudeKit), asRuntimeKit(Starter)] });

  t.regex(result.text as string, /^ /); // Replies start with a space.
})

