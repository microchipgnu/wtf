// Parser

import { ASTNode, TokenType } from "./types.ts";

export function parser(tokens: TokenType[]): ASTNode {
  let current = 0;

  function walk(): ASTNode {
    let token = tokens[current];

    // Number
    if (token.type === "number") {
      current++;
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    // String
    if (token.type === "string") {
      current++;
      return {
        type: "StringLiteral",
        value: token.value,
      };
    }

    // Function Call
    if (token.type === "keyword") {
      const node: ASTNode = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };
      token = tokens[++current];

      // Check for opening parenthesis
      if (token.type !== "paren" || token.value !== "(") {
        throw new SyntaxError(
          "Expected opening parenthesis after function name"
        );
      }

      token = tokens[++current];

      // Parse function arguments
      while (token.type !== "paren" || token.value !== ")") {
        node?.params?.push(walk());
        token = tokens[current];

        // Check for a comma and skip it if present
        if (token.type === "comma") {
          current++;
          token = tokens[current];
        } else if (token.type !== "paren" || token.value !== ")") {
          throw new SyntaxError(
            "Expected a comma or closing parenthesis between function arguments"
          );
        }
      }

      current++; // Consume closing parenthesis
      return node;
    }

    // Identifier
    if (token.type === "identifier") {
      current++;
      return {
        type: "Identifier",
        value: token.value,
      };
    }

    throw new SyntaxError("Unknown token type: " + token.type);
  }

  const ast: ASTNode = {
    type: "Program",
    body: [],
  };

  while (current < tokens.length) {
    ast.body?.push(walk());
  }

  return ast;
}
