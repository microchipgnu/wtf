// Main function to execute the interpreter

import { interpreter } from "./interpreter.ts";
import { parser } from "./parser.ts";
import { tokenizer } from "./tokenizer.ts";

function execute(input: string): void {
  const tokens = tokenizer(input);
  const ast = parser(tokens);
  interpreter(ast);
}

const input = Deno.args[0];

execute(input);
