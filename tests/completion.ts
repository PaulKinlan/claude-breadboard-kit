import { Board } from "@google-labs/breadboard";
import { Claude } from "@paulkinlan/claude-breadboard-kit";
import { Starter } from "@google-labs/llm-starter";
import path from "path";
import test from 'ava';

test('completion', async (t) => {

  const board = await Board.load(
    path.join(process.cwd(), "graphs", "completion.json"),
    {
      kits: { "./index.js": Claude },
    }
  );

  const result = await board.runOnce({
    model: "claude-2",
    text: "How much wood can a woodchuck chuck?",
  });

  t.regex(result.text as string, /^ /); // Replies start with a space.
})

