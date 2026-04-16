import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { MonitorErrorJs } from './entities/monitor-error-js.entity';
import { MonitorErrorRequest } from './entities/monitor-error-request.entity';
import { MonitorErrorResource } from './entities/monitor-error-resource.entity';
import { sourceMapParser } from '../../../common/utils/sourcemap';
import { MonitorRrweb } from './entities/monitor-rrweb.entity';
import { ErrorCountVo, ErrorTrendCountVo } from './vo/monitor-error.vo';
import { DateTimestampEnum } from './enums/monitor-error.enum';
import { formatTimestamp } from 'src/common/utils/formatTimestamp';
@Injectable()
export class MonitorErrorService {
  constructor(
    @InjectRepository(MonitorErrorJs)
    private errorJsRespository: Repository<MonitorErrorJs>,
    @InjectRepository(MonitorRrweb)
    private rrwebRespository: Repository<MonitorRrweb>,
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

  async getErrorDetailList() {
    const errorJsList: Array<MonitorErrorJs> =
      await this.errorJsRespository.find();
    return errorJsList;
  }

  async getRRwebPlayEvents(id: number) {
    const monitorRrweb: MonitorRrweb | null =
      await this.rrwebRespository.findOne({
        where: { id },
      });
    return monitorRrweb;
  }

  async errorCount() {
    const errorCountVo = new ErrorCountVo();

    const jsErrorCount = await this.errorJsRespository.count();
    const resourceErrorCount = await this.errorResourceRespository.count();
    const requestErrorCount = await this.errorRequestRespository.count();
    const allErrorCount = jsErrorCount + resourceErrorCount + requestErrorCount;

    errorCountVo.allErrorCount = allErrorCount;
    errorCountVo.jsErrorCount = jsErrorCount;
    errorCountVo.resourceErrorCount = resourceErrorCount;
    errorCountVo.requestErrorCount = requestErrorCount;
    return errorCountVo;
  }

  async errorTrendCount(startDate: string, endDate: string) {
    const startDataTimestamp = new Date(startDate).getTime();
    const endDateTimestamp = new Date(endDate).getTime();
    /**
     * 1. endDate - startDate > 一年，分为 Math.cell(（endDate - startDate）/ 一年) 个节点
     * 2. 一个月 < endDate - startDate < 一年，分为 12 个节点
     * 3. 一周 < endDate - startDate < 一个月，分为 12 个节点
     * 4. endDate - startDate < 一周，分为 7 个节点
     */
    let divCount = 0;
    let differenceTimestamp = 0;
    if (startDataTimestamp != null && endDateTimestamp != null) {
      differenceTimestamp = endDateTimestamp - startDataTimestamp;
      if (differenceTimestamp > DateTimestampEnum.YEAR_TIMESTAMP.valueOf()) {
        divCount = Math.ceil(
          differenceTimestamp / DateTimestampEnum.YEAR_TIMESTAMP,
        );
      } else if (
        (differenceTimestamp < DateTimestampEnum.YEAR_TIMESTAMP.valueOf() &&
          differenceTimestamp > DateTimestampEnum.MONTH_TIMESTAMP.valueOf()) ||
        (differenceTimestamp < DateTimestampEnum.MONTH_TIMESTAMP.valueOf() &&
          differenceTimestamp > DateTimestampEnum.WEEK_TIMESTAMP.valueOf())
      ) {
        divCount = 12;
      } else {
        divCount = 7;
      }
    }
    // 计算每个节点的步长（时间间隔），并初始化当前时间戳为第一个节点的结束时间
    const stepDateTimestamp = Math.ceil(differenceTimestamp / divCount);
    let currentTimestamp = startDataTimestamp + stepDateTimestamp;
    const errorJsList = await this.errorJsRespository.find({
      where: {
        timestamp: Between(
          startDataTimestamp.toString(),
          endDateTimestamp.toString(),
        ),
      },
      order: {
        timestamp: 'ASC',
      },
    });
    const errorResList = await this.errorResourceRespository.find({
      where: {
        timestamp: Between(
          startDataTimestamp.toString(),
          endDateTimestamp.toString(),
        ),
      },
      order: {
        timestamp: 'ASC',
      },
    });
    const errorReqList = await this.errorRequestRespository.find({
      where: {
        timestamp: Between(
          startDataTimestamp.toString(),
          endDateTimestamp.toString(),
        ),
      },
      order: {
        timestamp: 'ASC',
      },
    });
    // 用于存储横坐标（时间点）和各类错误数量的数组
    const xDatas: string[] = [];
    const jsErrCounts: number[] = [];
    const resErrCounts: number[] = [];
    const reqErrCounts: number[] = [];
    let jsErrIndex = 0;
    let resErrIndex = 0;
    let reqErrIndex = 0;
    for (let node = 0; node < divCount; node++) {
      xDatas.push(formatTimestamp(currentTimestamp.toString()));
      let jsErrCount = 0;
      let resErrCount = 0;
      let reqErrCount = 0;
      if (jsErrIndex === errorJsList.length) {
        jsErrCounts.push(0);
      } else {
        for (let i = jsErrIndex; i < errorJsList.length; i++) {
          const errorJs = errorJsList[i];
          if (Number(errorJs.timestamp) < currentTimestamp) {
            jsErrCount = jsErrCount + 1;
            jsErrIndex = jsErrIndex + 1;
          } else {
            jsErrCounts.push(jsErrCount);
            jsErrCount = 0;
            break;
          }
        }
      }
      if (resErrIndex === errorResList.length) {
        resErrCounts.push(0);
      } else {
        for (let j = resErrIndex; j < errorResList.length; j++) {
          const errorRes = errorResList[j];
          if (Number(errorRes.timestamp) < currentTimestamp) {
            resErrCount = resErrCount + 1;
            resErrIndex = resErrIndex + 1;
          } else {
            resErrCounts.push(resErrCount);
            resErrCount = 0;
            break;
          }
        }
      }
      if (reqErrIndex === errorReqList.length) {
        reqErrCounts.push(0);
      } else {
        for (let k = reqErrIndex; k < errorReqList.length; k++) {
          const errorReq = errorReqList[k];
          if (Number(errorReq.timestamp) < currentTimestamp) {
            reqErrCount = reqErrCount + 1;
            reqErrIndex = reqErrIndex + 1;
          } else {
            reqErrCounts.push(reqErrCount);
            reqErrCount = 0;
            break;
          }
        }
      }
      currentTimestamp = currentTimestamp + stepDateTimestamp;
    }
    const errorTrendCount: ErrorTrendCountVo = {
      xDatas,
      jsErrorCount: jsErrCounts,
      resourceErrorCount: resErrCounts,
      requestErrorCount: reqErrCounts,
    };
    return errorTrendCount;
  }
}
