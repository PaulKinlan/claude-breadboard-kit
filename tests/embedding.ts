import { Board } from "@google-labs/breadboard";
import { OpenAI } from "@paulkinlan/openai-breadboard-kit";
import path from "path";
import test from 'ava';

test('embedding', async (t) => {

  const board = await Board.load(
    path.join(process.cwd(), "graphs", "embedding.json")
  );

  board.addKit(OpenAI);

  const result = await board.runOnce({
    model: "text-embedding-ada-002",
    text: "How much wood can a woodchuck chuck?",
  });

  t.true(result != undefined);
  t.true(result.text != undefined);
  t.is(((result.text as any[])[0] as any).object, "embedding");
})

