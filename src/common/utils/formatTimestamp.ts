export function formatTimestamp(timestamp: string): string {
  const formatter = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  // 格式化结果为 "2026/04/16 14:30:25" 格式，需要替换分隔符
  return formatter.format(parseInt(timestamp)).replace(/\//g, '-');
}
