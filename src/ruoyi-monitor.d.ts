interface ISourceMap {
  version: string;
  file: string;
  mappings: string;
  sources: Array<string>;
  sourcesContent: Array<string>;
  names: Array<string>;
  sourceRoot: string;
}
