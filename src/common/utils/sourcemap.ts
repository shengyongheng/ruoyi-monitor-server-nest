import { SourceMapConsumer } from 'source-map';
import { readFileSync } from 'node:fs';
import {
  MySourceContext,
  SourceMapVo,
} from '../../modules/system/monitor-error/vo/monitor-error.vo';

const CONTEXT_LINES = 5;

export const sourceMapParser = async (
  sourceMapPath: string,
  line: number,
  column: number,
) => {
  // 读取对应的Source Map
  const sourceMap = readFileSync(sourceMapPath, 'utf-8');

  // 解析Source Map文件
  return await SourceMapConsumer.with(sourceMap, null, (consumer) => {
    // 在源码堆栈中定位报错位置
    const originalPosition = consumer.originalPositionFor({
      line,
      column,
    });

    // 输出源码报错位置
    // console.log('Error occurred at:');
    // console.log(`- OriginalFile: ${originalPosition.source}`);
    // console.log(`- Line: ${originalPosition.line}`);
    // console.log(`- Column: ${originalPosition.column}`);

    const sourceMapParser = JSON.parse(sourceMap) as ISourceMap;
    // console.log('sourceMapParser:', sourceMapParser);
    const version = sourceMapParser.version;

    // 在NestJS/TypeScript中查找originalFile在sources列表中的索引
    const sourcesList = sourceMapParser.sources;
    const sourcesContentList = sourceMapParser.sourcesContent;
    const originalFile = originalPosition.source;
    const originalLine = originalPosition.line;
    const originalColumn = originalPosition.column;
    const sourceIndex = findSourceIndex(sourcesList, originalFile as string);

    // 获取当前报错源码内容
    const sourceContentBySourceIndex = sourcesContentList[sourceIndex];
    const sourceContentList = sourceContentBySourceIndex.split(/\r?\n/);

    // 读取源代码
    const start = Math.max(0, (originalLine as number) - CONTEXT_LINES - 1);
    const end = Math.min(
      sourceContentList.length,
      (originalLine as number) + CONTEXT_LINES,
    );

    const sourceContextList: MySourceContext[] = [];

    for (let i = start; i < end; i++) {
      sourceContextList.push({
        sourceCode: sourceContentList[i],
        isHighlight: i === (originalLine as number) - 1,
      });
    }

    const sourceMapContext: SourceMapVo = {
      version,
      sourceContextList,
      colno: originalColumn,
      lineno: originalLine,
      startLine: start,
    };
    return sourceMapContext;
  });
};

/**
 * 规范化 source map 中的源文件路径，用于匹配
 * @param rawPath - 原始路径（如 webpack://webpack_config/./src/index.js）
 * @returns 规范化后的路径（如 src/index.js）
 */
function normalizeSourcePath(rawPath: string): string {
  let path = rawPath;

  // 1. 移除 webpack:// 协议及前缀（保留第一个有效段）
  // 例如：webpack://webpack_config/./src/index.js → ./src/index.js
  path = path.replace(/^webpack:\/\/[^/]+\//, '');

  // 2. 移除开头的 "./" 或 "../"（相对路径标准化）
  path = path.replace(/^\.\.?\//, '');

  // 3. 移除 query 参数（?xxx）
  path = path.replace(/\?.*$/, '');

  // 4. 确保使用统一的分隔符（可选，windows 兼容）
  path = path.replace(/\\/g, '/');

  return path;
}

/**
 * 在 sources 数组中查找与目标文件匹配的索引
 * @param sources - source map 中的 sources 数组
 * @param targetFile - 目标文件的原始路径（如 webpack://webpack_config/src/index.js）
 * @returns 匹配的索引，未找到返回 -1
 */
function findSourceIndex(sources: string[], targetFile: string): number {
  const normalizedTarget = normalizeSourcePath(targetFile);
  for (let i = 0; i < sources.length; i++) {
    const normalizedSource = normalizeSourcePath(sources[i]);
    if (normalizedSource === normalizedTarget) {
      return i;
    }
  }
  return -1;
}
