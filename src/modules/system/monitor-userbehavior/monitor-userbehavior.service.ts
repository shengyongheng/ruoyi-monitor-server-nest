import { Injectable } from '@nestjs/common';
import { UserbehaviorSessionDto } from './dto/monitor-userbehavior.dto';
import {
  BehaviorDetailVo,
  BehaviorTimelineVo,
  SessionDetailVo,
  UserBehaviorSessionListVo,
} from './vo/monitor-userbehavior.vo';
import {
  PageStayTimeTypeEnum,
  RouteChangeTypeEnum,
  UserBehaviorTypeEnum,
} from './enum/monitor-userbehavior.enum';
import { Repository } from 'typeorm';
import { MonitorUserBehavior } from './entities/monitor-userbehavior.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MonitorPageStaytime } from './entities/monitor-page-staytime.entity';
import { MonitorRouteChange } from './entities/monitor-route-change.entity';
import { formatTimestamp } from 'src/common/utils/formatTimestamp';
@Injectable()
export class MonitorUserbehaviorService {
  constructor(
    @InjectRepository(MonitorUserBehavior)
    private userBehaviorRepository: Repository<MonitorUserBehavior>,
    @InjectRepository(MonitorPageStaytime)
    private pageStayTimeRepository: Repository<MonitorPageStaytime>,
    @InjectRepository(MonitorRouteChange)
    private routeChangeRepository: Repository<MonitorRouteChange>,
  ) {}

  async getUserBehaviorSessionList(
    userbehaviorSessionDto: UserbehaviorSessionDto,
  ) {
    const sessionId = userbehaviorSessionDto.sessionId;
    const username = userbehaviorSessionDto.username;
    const type = userbehaviorSessionDto.type;
    const sessionListHash = new Map<string, UserBehaviorSessionListVo>();

    const where = {
      sessionId: undefined,
      username: undefined,
    };

    if (sessionId != undefined) {
      Reflect.set(where, 'sessionId', sessionId);
    }
    if (username != undefined) {
      Reflect.set(where, 'username', username);
    }

    if (
      type === undefined ||
      (Object.values(UserBehaviorTypeEnum) as Array<string>).includes(type)
    ) {
      const monitorUserBehaviorList = await this.userBehaviorRepository.find({
        where,
      });
      Reflect.set(where, 'sessionId', undefined);
      Reflect.set(where, 'username', undefined);
      if (monitorUserBehaviorList.length > 0) {
        for (const monitorUserBehavior of monitorUserBehaviorList) {
          if (!sessionListHash.has(monitorUserBehavior.sessionId)) {
            const userBehaviorSessionListVo = new UserBehaviorSessionListVo();
            userBehaviorSessionListVo.setActions(1);
            userBehaviorSessionListVo.setUsername(monitorUserBehavior.username);
            userBehaviorSessionListVo.setSessionId(
              monitorUserBehavior.sessionId,
            );
            sessionListHash.set(
              monitorUserBehavior.sessionId,
              userBehaviorSessionListVo,
            );
          } else {
            sessionListHash
              .get(monitorUserBehavior.sessionId)
              ?.setActions(
                (
                  sessionListHash.get(
                    monitorUserBehavior.sessionId,
                  ) as UserBehaviorSessionListVo
                ).getActions() + 1,
              );
          }
        }
      }
    }

    if (
      type === undefined ||
      (Object.values(PageStayTimeTypeEnum) as Array<string>).includes(type)
    ) {
      const monitorPageStayTimeList = await this.pageStayTimeRepository.find({
        where,
      });

      Reflect.set(where, 'sessionId', undefined);
      Reflect.set(where, 'username', undefined);
      if (monitorPageStayTimeList.length > 0) {
        for (const monitorPageStayTime of monitorPageStayTimeList) {
          if (!sessionListHash.has(monitorPageStayTime.sessionId)) {
            const userBehaviorSessionListVo = new UserBehaviorSessionListVo();
            userBehaviorSessionListVo.setActions(1);
            userBehaviorSessionListVo.setUsername(monitorPageStayTime.username);
            userBehaviorSessionListVo.setSessionId(
              monitorPageStayTime.sessionId,
            );
            sessionListHash.set(
              monitorPageStayTime.sessionId,
              userBehaviorSessionListVo,
            );
          } else {
            sessionListHash
              .get(monitorPageStayTime.sessionId)
              ?.setActions(
                (
                  sessionListHash.get(
                    monitorPageStayTime.sessionId,
                  ) as UserBehaviorSessionListVo
                ).getActions() + 1,
              );
          }
        }
      }
    }

    if (
      type === undefined ||
      (Object.values(RouteChangeTypeEnum) as Array<string>).includes(type)
    ) {
      const routeChangeList = await this.routeChangeRepository.find({
        where,
      });

      Reflect.set(where, 'sessionId', undefined);
      Reflect.set(where, 'username', undefined);
      if (routeChangeList.length > 0) {
        for (const routeChange of routeChangeList) {
          if (!sessionListHash.has(routeChange.sessionId)) {
            const userBehaviorSessionListVo = new UserBehaviorSessionListVo();
            userBehaviorSessionListVo.setActions(1);
            userBehaviorSessionListVo.setUsername(routeChange.username);
            userBehaviorSessionListVo.setSessionId(routeChange.sessionId);
            sessionListHash.set(
              routeChange.sessionId,
              userBehaviorSessionListVo,
            );
          } else {
            sessionListHash
              .get(routeChange.sessionId)
              ?.setActions(
                (
                  sessionListHash.get(
                    routeChange.sessionId,
                  ) as UserBehaviorSessionListVo
                ).getActions() + 1,
              );
          }
        }
      }
    }

    const sessionListVoList: Array<UserBehaviorSessionListVo> = [];
    for (const sessionListVo of sessionListHash.values()) {
      sessionListVoList.unshift(sessionListVo);
    }
    return sessionListVoList;
  }

  async getSessionDetail(userbehaviorSessionDto: UserbehaviorSessionDto) {
    const sessionId = userbehaviorSessionDto.sessionId;
    const username = userbehaviorSessionDto.username;
    const sessionDetailVo = new SessionDetailVo();
    sessionDetailVo.setClicks(0);
    sessionDetailVo.setInputs(0);
    sessionDetailVo.setScrolls(0);
    sessionDetailVo.setPageViews(0);
    let startAt: string | null = null; // 会话开始时间
    let endAt: string | null = null; // 会话结束时间

    const where = {
      sessionId: undefined,
      username: undefined,
    };

    if (sessionId != undefined) {
      Reflect.set(where, 'sessionId', sessionId);
      sessionDetailVo.setSessionId(sessionId);
    }
    if (username != undefined) {
      Reflect.set(where, 'username', username);
      sessionDetailVo.setUsername(username);
    }
    const monitorUserBehaviorList = await this.userBehaviorRepository.find({
      where,
    });

    if (monitorUserBehaviorList.length > 0) {
      for (const monitorUserBehavior of monitorUserBehaviorList) {
        const behaviorTimestamp = monitorUserBehavior.timestamp;
        if (startAt === null || startAt > behaviorTimestamp) {
          startAt = behaviorTimestamp;
        }
        if (endAt === null || endAt < behaviorTimestamp) {
          endAt = behaviorTimestamp;
        }
        const behaviorType = monitorUserBehavior.type;
        switch (behaviorType) {
          case 'click': {
            sessionDetailVo.setClicks(sessionDetailVo.getClicks() + 1);
            break;
          }
          case 'input': {
            sessionDetailVo.setInputs(sessionDetailVo.getInputs() + 1);
            break;
          }
          case 'scroll': {
            sessionDetailVo.setScrolls(sessionDetailVo.getScrolls() + 1);
            break;
          }
        }
      }
    }

    const monitorPageStayTimeList = await this.pageStayTimeRepository.find({
      where,
    });
    if (monitorPageStayTimeList.length > 0) {
      for (const monitorPageStayTime of monitorPageStayTimeList) {
        const behaviorTimestamp = monitorPageStayTime.timestamp;
        if (startAt === null || startAt > behaviorTimestamp) {
          startAt = behaviorTimestamp;
        }
        if (endAt === null || endAt < behaviorTimestamp) {
          endAt = behaviorTimestamp;
        }
        // sessionDetailVo.setClicks(sessionDetailVo.getClicks() + 1);
      }
    }

    const monitorRouteChangeList = await this.routeChangeRepository.find({
      where,
    });
    if (monitorRouteChangeList.length > 0) {
      for (const monitorRouteChange of monitorRouteChangeList) {
        const behaviorTimestamp = monitorRouteChange.timestamp;
        if (startAt === null || startAt > behaviorTimestamp) {
          startAt = behaviorTimestamp;
        }
        if (endAt === null || endAt < behaviorTimestamp) {
          endAt = behaviorTimestamp;
        }
        sessionDetailVo.setPageViews(sessionDetailVo.getPageViews() + 1);
      }
    }

    sessionDetailVo.setStartAt(formatTimestamp(startAt as string));
    sessionDetailVo.setEndAt(formatTimestamp(endAt as string));
    return sessionDetailVo;
  }

  async getBehaviorTimeline(userbehaviorSessionDto: UserbehaviorSessionDto) {
    const sessionId = userbehaviorSessionDto.sessionId;
    const username = userbehaviorSessionDto.username;

    const behaviorTimelineVoList: Array<BehaviorTimelineVo> = [];

    const where = {
      sessionId: undefined,
      username: undefined,
    };

    if (sessionId != undefined) {
      Reflect.set(where, 'sessionId', sessionId);
    }
    if (username != undefined) {
      Reflect.set(where, 'username', username);
    }

    const monitorUserBehaviorList = await this.userBehaviorRepository.find({
      where,
    });

    if (monitorUserBehaviorList && monitorUserBehaviorList.length > 0) {
      for (const monitorUserBehavior of monitorUserBehaviorList) {
        const behaviorTimelineVo = new BehaviorTimelineVo();
        behaviorTimelineVo.setBehaviorId(monitorUserBehavior.id);
        behaviorTimelineVo.setTimestamp(monitorUserBehavior.timestamp);
        behaviorTimelineVo.setBehaviorType(monitorUserBehavior.type);
        behaviorTimelineVo.setDescription(monitorUserBehavior.description);
        behaviorTimelineVoList.push(behaviorTimelineVo);
      }
    }

    const monitorPageStayTimeList = await this.pageStayTimeRepository.find({
      where,
    });

    if (monitorPageStayTimeList && monitorPageStayTimeList.length > 0) {
      for (const monitorPageStayTime of monitorPageStayTimeList) {
        const behaviorTimelineVo = new BehaviorTimelineVo();
        behaviorTimelineVo.setTimestamp(monitorPageStayTime.timestamp);
        behaviorTimelineVo.setBehaviorId(monitorPageStayTime.id);
        behaviorTimelineVo.setBehaviorType(monitorPageStayTime.type);
        behaviorTimelineVo.setDescription(
          monitorPageStayTime.stayTime
            ? monitorPageStayTime.stayTime.toString()
            : '',
        );
        behaviorTimelineVoList.push(behaviorTimelineVo);
      }
    }

    const monitorRouteChangeList = await this.routeChangeRepository.find({
      where,
    });

    if (monitorRouteChangeList && monitorRouteChangeList.length > 0) {
      for (const monitorRouteChange of monitorRouteChangeList) {
        const behaviorTimelineVo = new BehaviorTimelineVo();
        behaviorTimelineVo.setBehaviorId(monitorRouteChange.id);
        behaviorTimelineVo.setBehaviorType(monitorRouteChange.type);
        behaviorTimelineVo.setDescription('页面跳转');
        behaviorTimelineVo.setTimestamp(monitorRouteChange.timestamp);
        behaviorTimelineVoList.push(behaviorTimelineVo);
      }
    }

    behaviorTimelineVoList.sort((a, b) => {
      const aTs = parseInt(a.getTimestamp());
      const bTs = parseInt(b.getTimestamp());

      // 处理 null/undefined：将无效值排在最后（降序时仍在最后）
      if (aTs == null && bTs != null) return 1; // a 无效，b 有效 => a 在后
      if (aTs != null && bTs == null) return -1; // a 有效，b 无效 => a 在前
      if (aTs == null && bTs == null) return 0; // 两者无效，顺序不变

      // 两者都有效，按降序排列（大的 timestamp 在前）
      return bTs - aTs;
    });
    return behaviorTimelineVoList;
  }

  async getBehaviorDetail(behaviorId: number, behaviorType: string) {
    const behaviorDetailVo = new BehaviorDetailVo();
    if (
      (Object.values(UserBehaviorTypeEnum) as Array<string>).includes(
        behaviorType,
      )
    ) {
      const monitorUserBehavior = await this.userBehaviorRepository.findOne({
        where: { id: behaviorId },
      });
      if (monitorUserBehavior) {
        behaviorDetailVo.setBehaviorId(monitorUserBehavior.id);
        behaviorDetailVo.setBehaviorType(monitorUserBehavior.type);
        behaviorDetailVo.setTimestamp(monitorUserBehavior.timestamp);
        behaviorDetailVo.setDescription(monitorUserBehavior.description);
        return behaviorDetailVo;
      }
    }

    if (
      (Object.values(PageStayTimeTypeEnum) as Array<string>).includes(
        behaviorType,
      )
    ) {
      const monitorPageStayTime = await this.pageStayTimeRepository.findOne({
        where: { id: behaviorId },
      });
      if (monitorPageStayTime) {
        behaviorDetailVo.setBehaviorId(monitorPageStayTime.id);
        behaviorDetailVo.setBehaviorType(monitorPageStayTime.type);
        behaviorDetailVo.setTimestamp(monitorPageStayTime.timestamp);
        behaviorDetailVo.setStayTime(monitorPageStayTime.stayTime);
        return behaviorDetailVo;
      }
    }

    if (
      (Object.values(RouteChangeTypeEnum) as Array<string>).includes(
        behaviorType,
      )
    ) {
      const monitorRouteChange = await this.routeChangeRepository.findOne({
        where: { id: behaviorId },
      });
      if (monitorRouteChange) {
        behaviorDetailVo.setBehaviorId(monitorRouteChange.id);
        behaviorDetailVo.setBehaviorType(monitorRouteChange.type);
        behaviorDetailVo.setTimestamp(monitorRouteChange.timestamp);
        behaviorDetailVo.setNewUrl(monitorRouteChange.newUrl);
        behaviorDetailVo.setOldUrl(monitorRouteChange.oldUrl);
        if (monitorRouteChange.trigerType === 'hashchange') {
          behaviorDetailVo.setHashStayTime(monitorRouteChange.hashStayTime);
        }
        return behaviorDetailVo;
      }
    }
    return null;
  }
}
