interface ISourceMap {
  version: string;
  file: string;
  mappings: string;
  sources: Array<string>;
  sourcesContent: Array<string>;
  names: Array<string>;
  sourceRoot: string;
}

interface ITokenPayload {
  username: string;
  userId: string;
  iat: number;
  exp: number;
}
