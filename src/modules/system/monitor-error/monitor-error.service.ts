import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitorErrorJs } from './entities/monitor-error-js.entity';
import { MonitorErrorRequest } from './entities/monitor-error-request.entity';
import { MonitorErrorResource } from './entities/monitor-error-resource.entity';
import { sourceMapParser } from '../../../common/utils/sourcemap';
@Injectable()
export class MonitorErrorService {
  constructor(
    @InjectRepository(MonitorErrorJs)
    private errorJsRespository: Repository<MonitorErrorJs>,
    @InjectRepository(MonitorErrorRequest)
    private errorRequestRespository: Repository<MonitorErrorRequest>,
    @InjectRepository(MonitorErrorResource)
    private errorResourceRespository: Repository<MonitorErrorResource>,
  ) {}

  async jsErrorSourcemapContext() {
    const sourceMapPath =
      'D:\\hengshengyong\\Nest\\ruoyi-monitor-server-nest\\src\\main_1f1c4078.js.map';

    // 假设运行时错误发生在压缩文件的行、列
    const generatedLine = 323;
    const generatedColumn = 15;
    // 这里假设你有一个SourceMapUtils服务和AjaxResult工具
    // 需要根据实际NestJS结构引入或注入
    const sourceMapVo = await sourceMapParser(
      sourceMapPath,
      generatedLine,
      generatedColumn,
    );
    return sourceMapVo;
  }
}
