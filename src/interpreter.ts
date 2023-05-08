// Function calls: create and display
// Arguments: numbers, strings, and identifiers

import { ASTNode, ExecutionContext } from "./types.ts";

export function interpreter(ast: ASTNode): void {
  const globalExecutionContext: ExecutionContext = {};

  function display(value: any): void {
    console.log(value);
  }

  function create(name: string, value: any): void {
    globalExecutionContext[name] = value;
  }

  function traverseNode(node: ASTNode, context: ExecutionContext): any {
    switch (node.type) {
      case "Program":
        {
          if (!node || !node.body) return;
          for (const child of node.body) {
            traverseNode(child, context);
          }
        }
        break;

      case "CallExpression":
        if (node.name === "display") {
          if (!node || !node.params || !node.params[0]) return;

          const argValue = traverseNode(node.params[0], context);
          display(argValue);
        } else if (node.name === "create") {
          if (!node || !node.params || !node.params[0]) return;

          const argName = node.params[0].value;
          const argValue = traverseNode(node.params[1], context);

          if (!argName) return;
          create(argName, argValue);
        } else {
          throw new Error(`Unknown function '${node.name}'`);
        }
        break;

      case "NumberLiteral": {
        if (!node || !node.value) return;
        return parseFloat(node.value);
      }

      case "StringLiteral":
        return node.value;

      case "Identifier": {
        if (!node || !node.value) return;

        return context[node.value];
      }

      default:
        throw new Error(`Unknown node type '${node.type}'`);
    }
  }

  traverseNode(ast, globalExecutionContext);
}
