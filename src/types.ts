export type TokenType = {
  type: string;
  value: string;
};

export type ASTNode = {
  type: string;
  value?: string;
  body?: ASTNode[];
  params?: ASTNode[];
  name?: string;
};

export interface ExecutionContext {
  [key: string]: any;
}
