// Keywords: create, display
// Identifiers: variables or function names, composed of letters and/or numbers
// Strings: text enclosed in double quotes
// Numbers: sequences of digits
// Parentheses: ( and )
// Whitespace: spaces, tabs, and newlines

import { TokenType } from "./types.ts";

// Tokenizer

export function tokenizer(input: string): TokenType[] {
  const tokens: TokenType[] = [];
  let current = 0;

  const WHITESPACE = /\s/;
  const NUMBERS = /[0-9]/;
  const LETTERS = /[a-z]/i;
  const KEYWORDS = ["create", "display"];

  while (current < input.length) {
    let char = input[current];

    // Whitespace
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // Numbers
    if (NUMBERS.test(char)) {
      let value = "";

      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "number", value });
      continue;
    }

    // Strings
    if (char === '"') {
      let value = "";

      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "string", value });
      current++;
      continue;
    }

    // Identifiers and Keywords
    if (LETTERS.test(char)) {
      let value = "";

      while (LETTERS.test(char) || NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      if (KEYWORDS.includes(value)) {
        tokens.push({ type: "keyword", value });
      } else {
        tokens.push({ type: "identifier", value });
      }

      continue;
    }

    // Parentheses
    if (char === "(" || char === ")") {
      tokens.push({ type: "paren", value: char });
      current++;
      continue;
    }

    // Comma
    if (char === ",") {
      tokens.push({ type: "comma", value: char });
      current++;
      continue;
    }

    // Add rules for any other token types specific to your language here

    // Unknown character
    throw new TypeError("Unknown character: " + char);
  }

  return tokens;
}
