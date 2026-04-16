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

export class ErrorCountVo {
  allErrorCount: number;
  jsErrorCount: number;
  resourceErrorCount: number;
  requestErrorCount: number;
}
export class ErrorTrendCountVo {
  xDatas: string[];
  jsErrorCount: number[];
  resourceErrorCount: number[];
  requestErrorCount: number[];
}
