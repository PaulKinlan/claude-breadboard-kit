import { Board } from "@google-labs/breadboard";
import { OpenAI } from "@paulkinlan/openai-breadboard-kit";
import path from "path";
import test from 'ava';

test('completion', async (t) => {

  const board = await Board.load(
    path.join(process.cwd(), "graphs", "graph.json")
  );

  board.addKit(OpenAI);

  const result = await board.runOnce({
    model: "gpt-3.5-turbo",
    text: "How much wood can a woodchuck chuck?",
  });

  t.regex(result.text as string, /^\n\n/);
})

