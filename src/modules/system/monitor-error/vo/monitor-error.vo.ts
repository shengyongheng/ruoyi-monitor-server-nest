export class MySourceContext {
  sourceCode: string;
  isHighlight: boolean;
}

export class SourceMapVo {
  version: string;

  sourceContextList: MySourceContext[];

  startLine: number;

  lineno: number | null;

  colno: number | null;

  stack?: string;
}
