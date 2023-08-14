import { Board } from "@google-labs/breadboard";
import { OpenAI } from "./dist/src/index.js";
import path from "path";

const board = await Board.load(
  path.join(process.cwd(), "graphs", "graph.json")
);

board.addKit(OpenAI);

const result = await board.runOnce({
  model: "gpt-3.5-turbo",
  text: "How much wood can a woodchuck chuck?",
});

console.log("result", result);
