-- 创建 ruoyi_monitor 数据库
CREATE
DATABASE ruoyi_monitor
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

use
ruoyi_monitor;

CREATE TABLE `monitor_project`
(
    `id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',

    `project_key` VARCHAR(64)  NOT NULL COMMENT '对外暴露的项目ID（短ID）',
    `public_key`  VARCHAR(128) NOT NULL COMMENT 'SDK 使用的公钥（可公开）',
    `name`        VARCHAR(100) NOT NULL COMMENT '项目名称',

    `is_deleted`  TINYINT(1)      NOT NULL DEFAULT 0 COMMENT '逻辑删除：0-未删除，1-已删除',

    `create_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_project_key` (`project_key`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
    COMMENT ='项目表';

CREATE TABLE `monitor_performance_metric`
(
    `id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `project_key` VARCHAR(64)  NOT NULL,
    `session_id`  VARCHAR(255) NOT NULL,
    `user_id`     int          NOT NULL,
    `username`    VARCHAR(32)  NOT NULL,
    `type`        VARCHAR(20)  NOT NULL,
    `event_type`  VARCHAR(32)  NOT NULL,
    `value` DOUBLE NOT NULL,
    `timestamp`   bigint       NOT NULL,

    PRIMARY KEY (`id`),
    KEY           `idx_project_metric_time` (`project_key`, `type`, `event_type`, `timestamp`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci
    COMMENT ='性能数据表';

CREATE TABLE `monitor_resource`
(
    `id`             BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键',

    `project_key`    VARCHAR(64)  NOT NULL,
    `type`           VARCHAR(20)  NOT NULL,
    `event_type`     VARCHAR(32)  NOT NULL,
    `timestamp`      bigint       NOT NULL,

    `session_id`     VARCHAR(255) NOT NULL,
    `user_id`        int          NOT NULL,
    `username`       VARCHAR(32)  NOT NULL,

    `cached`         TINYINT(1)  DEFAULT 0 COMMENT '是否命中缓存',
    `decoded_size`   BIGINT      DEFAULT 0 COMMENT '解码后资源大小(bytes)',
    `duration` DOUBLE DEFAULT 0 COMMENT '资源加载总耗时(ms)',
    `encoded_size`   BIGINT      DEFAULT 0 COMMENT '编码后资源大小(bytes)',
    `initiator_type` VARCHAR(32) DEFAULT NULL COMMENT '资源发起类型(script/img/css/fetch)',
    `name`           VARCHAR(512) NOT NULL COMMENT '资源URL',
    `start_time` DOUBLE DEFAULT 0 COMMENT '开始时间(performance.now)',
    `status`         VARCHAR(16) DEFAULT NULL COMMENT '资源状态(success/error)',
    `transfer_size`  BIGINT      DEFAULT 0 COMMENT '传输大小(bytes)',

    -- timing 拆分字段
    `dns` DOUBLE DEFAULT 0 COMMENT 'DNS解析耗时(ms)',
    `tcp` DOUBLE DEFAULT 0 COMMENT 'TCP连接耗时(ms)',
    `ssl` DOUBLE DEFAULT 0 COMMENT 'SSL握手耗时(ms)',
    `download` DOUBLE DEFAULT 0 COMMENT '下载耗时(ms)',

    PRIMARY KEY (`id`),
    KEY              `idx_initiator_type` (`initiator_type`),
    KEY              `idx_status` (`status`),
    KEY              `idx_name_prefix` (`name`(128))
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
    COMMENT ='前端资源性能监控表';

CREATE TABLE `monitor_browser`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `project_key` VARCHAR(64)  NOT NULL,
    `type`        VARCHAR(20)  NOT NULL,
    `event_type`  VARCHAR(32)  NOT NULL,
    `timestamp`   bigint       NOT NULL,
    `session_id`  VARCHAR(255) NOT NULL,
    `user_id`     int          NOT NULL,
    `username`    VARCHAR(32)  NOT NULL,

    `name`        VARCHAR(100) DEFAULT NULL COMMENT '浏览器名称',
    `version`     VARCHAR(50)  DEFAULT NULL COMMENT '浏览器版本',
    `engine`      VARCHAR(50)  DEFAULT NULL COMMENT '浏览器内核（渲染引擎）',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='用户浏览器环境信息表';

CREATE TABLE `monitor_os`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `project_key` VARCHAR(64)  NOT NULL,
    `type`        VARCHAR(20)  NOT NULL,
    `event_type`  VARCHAR(32)  NOT NULL,
    `timestamp`   bigint       NOT NULL,
    `session_id`  VARCHAR(255) NOT NULL,
    `user_id`     int          NOT NULL,
    `username`    VARCHAR(32)  NOT NULL,

    `os`          VARCHAR(50) DEFAULT NULL COMMENT '系统',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='用户系统环境信息表';

CREATE TABLE `monitor_device`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `project_key` VARCHAR(64)  NOT NULL,
    `type`        VARCHAR(20)  NOT NULL,
    `event_type`  VARCHAR(32)  NOT NULL,
    `timestamp`   bigint       NOT NULL,
    `session_id`  VARCHAR(255) NOT NULL,
    `user_id`     int          NOT NULL,
    `username`    VARCHAR(32)  NOT NULL,

    `device`      VARCHAR(50) DEFAULT NULL COMMENT '设备',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='用户设备信息表';

CREATE TABLE `monitor_geolocation`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',

    `project_key` VARCHAR(64)  NOT NULL,
    `type`        VARCHAR(20)  NOT NULL,
    `event_type`  VARCHAR(32)  NOT NULL,
    `timestamp`   bigint       NOT NULL,
    `session_id`  VARCHAR(255) NOT NULL,
    `user_id`     int          NOT NULL,
    `username`    VARCHAR(32)  NOT NULL,

    `description` VARCHAR(255) DEFAULT NULL COMMENT '位置描述信息',
    `country`     VARCHAR(100) DEFAULT NULL COMMENT '国家',
    `city`        VARCHAR(100) DEFAULT NULL COMMENT '城市',

    `latitude`    VARCHAR(50)  DEFAULT NULL COMMENT '纬度',
    `longitude`   VARCHAR(50)  DEFAULT NULL COMMENT '经度',
    `accuracy`    INT          DEFAULT NULL COMMENT '定位精度（米）',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='用户地理位置信息表';

CREATE TABLE `monitor_userbehavior`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `project_key` VARCHAR(64)  NOT NULL,
    `type`        VARCHAR(20)  NOT NULL,
    `event_type`  VARCHAR(32)  NOT NULL,
    `timestamp`   bigint       NOT NULL,
    `session_id`  VARCHAR(255) NOT NULL,
    `user_id`     int          NOT NULL,
    `username`    VARCHAR(32)  NOT NULL,

    `description` TEXT DEFAULT NULL COMMENT '用户行为描述',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='用户行为表';

CREATE TABLE `monitor_page_staytime`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `project_key` VARCHAR(64)  NOT NULL,
    `type`        VARCHAR(20)  NOT NULL,
    `event_type`  VARCHAR(32)  NOT NULL,
    `timestamp`   bigint       NOT NULL,
    `session_id`  VARCHAR(255) NOT NULL,
    `user_id`     int          NOT NULL,
    `username`    VARCHAR(32)  NOT NULL,

    `stay_time`   bigint DEFAULT NULL COMMENT '页面停留时间',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='页面停留时间表';

CREATE TABLE `monitor_route_change`
(
    `id`             BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `project_key`    VARCHAR(64)  NOT NULL,
    `type`           VARCHAR(20)  NOT NULL,
    `event_type`     VARCHAR(32)  NOT NULL,
    `timestamp`      bigint       NOT NULL,
    `session_id`     VARCHAR(255) NOT NULL,
    `user_id`        int          NOT NULL,
    `username`       VARCHAR(32)  NOT NULL,

    `triger_type`    VARCHAR(20) DEFAULT NULL COMMENT '触发类型',
    `new_url`        VARCHAR(200) NOT NULL,
    `old_url`        VARCHAR(200) NOT NULL,
    `hash_stay_time` bigint      DEFAULT NULL COMMENT 'hash 页面停留时间',

    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='路由变化表';

CREATE TABLE `monitor_error_resource`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `project_key` VARCHAR(64)  NOT NULL,
    `type`        VARCHAR(20)  NOT NULL,
    `event_type`  VARCHAR(32)  NOT NULL,
    `timestamp`   bigint       NOT NULL,
    `session_id`  VARCHAR(255) NOT NULL,
    `user_id`     int          NOT NULL,
    `username`    VARCHAR(32)  NOT NULL,

    `tag_name`    VARCHAR(20)  NOT NULL,
    `src`         VARCHAR(255) NOT NULL,
    `href`        VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='资源错误表';

CREATE TABLE `monitor_error_js`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `project_key` VARCHAR(64)  NOT NULL,
    `type`        VARCHAR(20)  NOT NULL,
    `event_type`  VARCHAR(32)  NOT NULL,
    `timestamp`   bigint       NOT NULL,
    `session_id`  VARCHAR(255) NOT NULL,
    `user_id`     int          NOT NULL,
    `username`    VARCHAR(32)  NOT NULL,

    `message`     VARCHAR(255) NOT NULL,
    `filename`    VARCHAR(255) NOT NULL,
    `lineno`      int          NOT NULL,
    `colno`       int          NOT NULL,
    `stack`       TEXT         NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='js 错误表';

CREATE TABLE `monitor_error_request`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `project_key` VARCHAR(64)  NOT NULL,
    `type`        VARCHAR(20)  NOT NULL,
    `event_type`  VARCHAR(32)  NOT NULL,
    `timestamp`   bigint       NOT NULL,
    `session_id`  VARCHAR(255) NOT NULL,
    `user_id`     int          NOT NULL,
    `username`    VARCHAR(32)  NOT NULL,

    `message`     VARCHAR(255) NOT NULL,
    `url`         VARCHAR(255) NOT NULL,
    `status`      int          NOT NULL,
    `duration`    int          NOT NULL,
    `method`      TEXT         NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='数据请求错误表';

CREATE TABLE `monitor_rrweb`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `project_key` VARCHAR(64)  NOT NULL,
    `type`        VARCHAR(20)  NOT NULL,
    `event_type`  VARCHAR(32)  NOT NULL,
    `timestamp`   bigint       NOT NULL,
    `session_id`  VARCHAR(255) NOT NULL,
    `user_id`     int          NOT NULL,
    `username`    VARCHAR(32)  NOT NULL,

    `events`      TEXT         NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='错误 rrweb 事件表';

CREATE TABLE `monitor_vue2`
(
    `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `project_key` VARCHAR(64)  NOT NULL,
    `type`        VARCHAR(20)  NOT NULL,
    `event_type`  VARCHAR(32)  NOT NULL,
    `timestamp`   bigint       NOT NULL,
    `session_id`  VARCHAR(255) NOT NULL,
    `user_id`     int          NOT NULL,
    `username`    VARCHAR(32)  NOT NULL,

    `message`     TEXT         NOT NULL,
    `error_type`  VARCHAR(100) NOT NULL,
    `component`   VARCHAR(50)  NOT NULL,
    `file`        VARCHAR(255) NOT NULL,
    `info`        TEXT         NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='vue2 表';

-- ----------------------------
-- 2、用户信息表
-- ----------------------------
drop table if exists sys_user;
create table sys_user (
  user_id           bigint(20)      not null auto_increment    comment '用户ID',
  user_name         varchar(30)     not null                   comment '用户昵称',
  password          varchar(100)    default ''                 comment '密码',
  status            char(1)         default '0'                comment '帐号状态（0正常 1停用）',
  del_flag          char(1)         default '0'                comment '删除标志（0代表存在 2代表删除）',
  create_time       datetime                                   comment '创建时间',
  update_time       datetime                                   comment '更新时间',
  remark            varchar(500)    default null               comment '备注',
  primary key (user_id)
) engine=innodb auto_increment=100 comment = '用户信息表';

-- ----------------------------
-- 初始化-用户信息表数据
-- ----------------------------
insert into sys_user values(1, '若依', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', sysdate(), null, '管理员');
insert into sys_user values(2, '若依', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', sysdate(), null, '测试员');

-- ----------------------------
-- 4、角色信息表
-- ----------------------------

drop table if exists sys_role;
create table sys_role (
  role_id              bigint(20)      not null auto_increment    comment '角色ID',
  role_name            varchar(30)     not null                   comment '角色名称',
  role_key             varchar(100)    not null                   comment '角色权限字符串',
  role_sort            int(4)          not null                   comment '显示顺序',
  data_scope           char(1)         default '1'                comment '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）',
  menu_check_strictly  tinyint(1)      default 1                  comment '菜单树选择项是否关联显示',
  dept_check_strictly  tinyint(1)      default 1                  comment '部门树选择项是否关联显示',
  status               char(1)         not null                   comment '角色状态（0正常 1停用）',
  del_flag             char(1)         default '0'                comment '删除标志（0代表存在 2代表删除）',
  create_by            varchar(64)     default ''                 comment '创建者',
  create_time          datetime                                   comment '创建时间',
  update_by            varchar(64)     default ''                 comment '更新者',
  update_time          datetime                                   comment '更新时间',
  remark               varchar(500)    default null               comment '备注',
  primary key (role_id)
) engine=innodb auto_increment=100 comment = '角色信息表';

-- ----------------------------
-- 初始化-角色信息表数据
-- ----------------------------
insert into sys_role values('1', '超级管理员',  'admin',  1, 1, 1, 1, '0', '0', 'admin', sysdate(), '', null, '超级管理员');
insert into sys_role values('2', '普通角色',    'common', 2, 2, 1, 1, '0', '0', 'admin', sysdate(), '', null, '普通角色');

-- ----------------------------
-- 5、菜单权限表
-- ----------------------------
drop table if exists sys_menu;
create table sys_menu
(
    menu_id     bigint(20)  not null auto_increment comment '菜单ID',
    menu_name   varchar(50) not null comment '菜单名称',
    parent_id   bigint(20)   default 0 comment '父菜单ID',
    order_num   int(4)       default 0 comment '显示顺序',
    path        varchar(200) default '' comment '路由地址',
    component   varchar(255) default null comment '组件路径',
    query       varchar(255) default null comment '路由参数',
    route_name  varchar(50)  default '' comment '路由名称',
    is_frame    int(1)       default 1 comment '是否为外链（0是 1否）',
    is_cache    int(1)       default 0 comment '是否缓存（0缓存 1不缓存）',
    menu_type   char(1)      default '' comment '菜单类型（M目录 C菜单 F按钮）',
    visible     char(1)      default 0 comment '菜单状态（0显示 1隐藏）',
    status      char(1)      default 0 comment '菜单状态（0正常 1停用）',
    perms       varchar(100) default null comment '权限标识',
    icon        varchar(100) default '#' comment '菜单图标',
    create_by   varchar(64)  default '' comment '创建者',
    create_time datetime comment '创建时间',
    update_by   varchar(64)  default '' comment '更新者',
    update_time datetime comment '更新时间',
    remark      varchar(500) default '' comment '备注',
    primary key (menu_id)
) engine = innodb
  auto_increment = 2000 comment = '菜单权限表';
-- 一级菜单
insert into sys_menu
values ('1', '前端监控', '0', '1', 'sdk-monitor', null, '', '', 1, 0, 'M', '0', '0', '', 'monitor', 'admin', sysdate(),
        '',
        null, '前端监控目录');

-- 二级菜单
insert into sys_menu
values ('100', '用户管理', '1', '1', 'user', 'system/user/index', '', '', 1, 0, 'C', '0', '0', 'system:user:list',
        'user', 'admin', sysdate(), '', null, '用户管理菜单');
insert into sys_menu
values ('100', '错误监控', '1', '1', 'error', 'sdk-monitor/error/index', '', '', 1, 0, 'C', '0', '0',
        'system:user:list1',
        'user', 'admin', sysdate(), '', null, '错误监控');
insert into sys_menu
values ('101', '行为监控', '1', '2', 'userbehavior', 'sdk-monitor/userbehavior/index', '', '', 1, 0, 'C', '0', '0',
        'system:user:list2',
        'user', 'admin', sysdate(), '', null, '行为监控');
insert into sys_menu
values ('102', '性能监控', '1', '3', 'performance', 'sdk-monitor/performance/index', '', '', 1, 0, 'C', '0', '0',
        'system:user:list3',
        'user', 'admin', sysdate(), '', null, '性能监控');
insert into sys_menu
values ('103', '资源监控', '1', '4', 'resource', 'sdk-monitor/resource/index', '', '', 1, 0, 'C', '0', '0',
        'system:user:list4',
        'user', 'admin', sysdate(), '', null, '资源监控');

-- ----------------------------
-- 初始化-菜单信息表数据
-- ----------------------------
-- 一级菜单
insert into sys_menu
values ('1', '系统管理', '0', '1', 'system', null, '', '', 1, 0, 'M', '0', '0', '', 'system', 'admin', sysdate(), '',
        null, '系统管理目录');
insert into sys_menu
values ('2', '系统监控', '0', '2', 'monitor', null, '', '', 1, 0, 'M', '0', '0', '', 'monitor', 'admin', sysdate(), '',
        null, '系统监控目录');
insert into sys_menu
values ('3', '系统工具', '0', '3', 'tool', null, '', '', 1, 0, 'M', '0', '0', '', 'tool', 'admin', sysdate(), '', null,
        '系统工具目录');
insert into sys_menu
values ('4', '若依官网', '0', '4', 'http://ruoyi.vip', null, '', '', 0, 0, 'M', '0', '0', '', 'guide', 'admin',
        sysdate(), '', null, '若依官网地址');
-- 二级菜单
insert into sys_menu
values ('100', '用户管理', '1', '1', 'user', 'system/user/index', '', '', 1, 0, 'C', '0', '0', 'system:user:list',
        'user', 'admin', sysdate(), '', null, '用户管理菜单');
insert into sys_menu
values ('101', '角色管理', '1', '2', 'role', 'system/role/index', '', '', 1, 0, 'C', '0', '0', 'system:role:list',
        'peoples', 'admin', sysdate(), '', null, '角色管理菜单');
insert into sys_menu
values ('102', '菜单管理', '1', '3', 'menu', 'system/menu/index', '', '', 1, 0, 'C', '0', '0', 'system:menu:list',
        'tree-table', 'admin', sysdate(), '', null, '菜单管理菜单');
insert into sys_menu
values ('103', '部门管理', '1', '4', 'dept', 'system/dept/index', '', '', 1, 0, 'C', '0', '0', 'system:dept:list',
        'tree', 'admin', sysdate(), '', null, '部门管理菜单');
insert into sys_menu
values ('104', '岗位管理', '1', '5', 'post', 'system/post/index', '', '', 1, 0, 'C', '0', '0', 'system:post:list',
        'post', 'admin', sysdate(), '', null, '岗位管理菜单');
insert into sys_menu
values ('105', '字典管理', '1', '6', 'dict', 'system/dict/index', '', '', 1, 0, 'C', '0', '0', 'system:dict:list',
        'dict', 'admin', sysdate(), '', null, '字典管理菜单');
insert into sys_menu
values ('106', '参数设置', '1', '7', 'config', 'system/config/index', '', '', 1, 0, 'C', '0', '0', 'system:config:list',
        'edit', 'admin', sysdate(), '', null, '参数设置菜单');
insert into sys_menu
values ('107', '通知公告', '1', '8', 'notice', 'system/notice/index', '', '', 1, 0, 'C', '0', '0', 'system:notice:list',
        'message', 'admin', sysdate(), '', null, '通知公告菜单');
insert into sys_menu
values ('108', '日志管理', '1', '9', 'log', '', '', '', 1, 0, 'M', '0', '0', '', 'log', 'admin', sysdate(), '', null,
        '日志管理菜单');
insert into sys_menu
values ('109', '在线用户', '2', '1', 'online', 'monitor/online/index', '', '', 1, 0, 'C', '0', '0',
        'monitor:online:list', 'online', 'admin', sysdate(), '', null, '在线用户菜单');
insert into sys_menu
values ('110', '定时任务', '2', '2', 'job', 'monitor/job/index', '', '', 1, 0, 'C', '0', '0', 'monitor:job:list', 'job',
        'admin', sysdate(), '', null, '定时任务菜单');
insert into sys_menu
values ('111', '数据监控', '2', '3', 'druid', 'monitor/druid/index', '', '', 1, 0, 'C', '0', '0', 'monitor:druid:list',
        'druid', 'admin', sysdate(), '', null, '数据监控菜单');
insert into sys_menu
values ('112', '服务监控', '2', '4', 'server', 'monitor/server/index', '', '', 1, 0, 'C', '0', '0',
        'monitor:server:list', 'server', 'admin', sysdate(), '', null, '服务监控菜单');
insert into sys_menu
values ('113', '缓存监控', '2', '5', 'cache', 'monitor/cache/index', '', '', 1, 0, 'C', '0', '0', 'monitor:cache:list',
        'redis', 'admin', sysdate(), '', null, '缓存监控菜单');
insert into sys_menu
values ('114', '缓存列表', '2', '6', 'cacheList', 'monitor/cache/list', '', '', 1, 0, 'C', '0', '0',
        'monitor:cache:list', 'redis-list', 'admin', sysdate(), '', null, '缓存列表菜单');
insert into sys_menu
values ('115', '表单构建', '3', '1', 'build', 'tool/build/index', '', '', 1, 0, 'C', '0', '0', 'tool:build:list',
        'build', 'admin', sysdate(), '', null, '表单构建菜单');
insert into sys_menu
values ('116', '代码生成', '3', '2', 'gen', 'tool/gen/index', '', '', 1, 0, 'C', '0', '0', 'tool:gen:list', 'code',
        'admin', sysdate(), '', null, '代码生成菜单');
insert into sys_menu
values ('117', '系统接口', '3', '3', 'swagger', 'tool/swagger/index', '', '', 1, 0, 'C', '0', '0', 'tool:swagger:list',
        'swagger', 'admin', sysdate(), '', null, '系统接口菜单');
-- 三级菜单
insert into sys_menu
values ('500', '操作日志', '108', '1', 'operlog', 'monitor/operlog/index', '', '', 1, 0, 'C', '0', '0',
        'monitor:operlog:list', 'form', 'admin', sysdate(), '', null, '操作日志菜单');
insert into sys_menu
values ('501', '登录日志', '108', '2', 'logininfor', 'monitor/logininfor/index', '', '', 1, 0, 'C', '0', '0',
        'monitor:logininfor:list', 'logininfor', 'admin', sysdate(), '', null, '登录日志菜单');
-- 用户管理按钮
insert into sys_menu
values ('1000', '用户查询', '100', '1', '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:query', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1001', '用户新增', '100', '2', '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:add', '#', 'admin', sysdate(),
        '', null, '');
insert into sys_menu
values ('1002', '用户修改', '100', '3', '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:edit', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1003', '用户删除', '100', '4', '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:remove', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1004', '用户导出', '100', '5', '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:export', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1005', '用户导入', '100', '6', '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:import', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1006', '重置密码', '100', '7', '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:resetPwd', '#', 'admin',
        sysdate(), '', null, '');
-- 角色管理按钮
insert into sys_menu
values ('1007', '角色查询', '101', '1', '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:query', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1008', '角色新增', '101', '2', '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:add', '#', 'admin', sysdate(),
        '', null, '');
insert into sys_menu
values ('1009', '角色修改', '101', '3', '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:edit', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1010', '角色删除', '101', '4', '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:remove', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1011', '角色导出', '101', '5', '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:export', '#', 'admin',
        sysdate(), '', null, '');
-- 菜单管理按钮
insert into sys_menu
values ('1012', '菜单查询', '102', '1', '', '', '', '', 1, 0, 'F', '0', '0', 'system:menu:query', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1013', '菜单新增', '102', '2', '', '', '', '', 1, 0, 'F', '0', '0', 'system:menu:add', '#', 'admin', sysdate(),
        '', null, '');
insert into sys_menu
values ('1014', '菜单修改', '102', '3', '', '', '', '', 1, 0, 'F', '0', '0', 'system:menu:edit', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1015', '菜单删除', '102', '4', '', '', '', '', 1, 0, 'F', '0', '0', 'system:menu:remove', '#', 'admin',
        sysdate(), '', null, '');
-- 部门管理按钮
insert into sys_menu
values ('1016', '部门查询', '103', '1', '', '', '', '', 1, 0, 'F', '0', '0', 'system:dept:query', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1017', '部门新增', '103', '2', '', '', '', '', 1, 0, 'F', '0', '0', 'system:dept:add', '#', 'admin', sysdate(),
        '', null, '');
insert into sys_menu
values ('1018', '部门修改', '103', '3', '', '', '', '', 1, 0, 'F', '0', '0', 'system:dept:edit', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1019', '部门删除', '103', '4', '', '', '', '', 1, 0, 'F', '0', '0', 'system:dept:remove', '#', 'admin',
        sysdate(), '', null, '');
-- 岗位管理按钮
insert into sys_menu
values ('1020', '岗位查询', '104', '1', '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:query', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1021', '岗位新增', '104', '2', '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:add', '#', 'admin', sysdate(),
        '', null, '');
insert into sys_menu
values ('1022', '岗位修改', '104', '3', '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:edit', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1023', '岗位删除', '104', '4', '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:remove', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1024', '岗位导出', '104', '5', '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:export', '#', 'admin',
        sysdate(), '', null, '');
-- 字典管理按钮
insert into sys_menu
values ('1025', '字典查询', '105', '1', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:query', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1026', '字典新增', '105', '2', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:add', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1027', '字典修改', '105', '3', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:edit', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1028', '字典删除', '105', '4', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:remove', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1029', '字典导出', '105', '5', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:export', '#', 'admin',
        sysdate(), '', null, '');
-- 参数设置按钮
insert into sys_menu
values ('1030', '参数查询', '106', '1', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:query', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1031', '参数新增', '106', '2', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:add', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1032', '参数修改', '106', '3', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:edit', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1033', '参数删除', '106', '4', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:remove', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1034', '参数导出', '106', '5', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:export', '#', 'admin',
        sysdate(), '', null, '');
-- 通知公告按钮
insert into sys_menu
values ('1035', '公告查询', '107', '1', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:notice:query', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1036', '公告新增', '107', '2', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:notice:add', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1037', '公告修改', '107', '3', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:notice:edit', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1038', '公告删除', '107', '4', '#', '', '', '', 1, 0, 'F', '0', '0', 'system:notice:remove', '#', 'admin',
        sysdate(), '', null, '');
-- 操作日志按钮
insert into sys_menu
values ('1039', '操作查询', '500', '1', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:operlog:query', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1040', '操作删除', '500', '2', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:operlog:remove', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1041', '日志导出', '500', '3', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:operlog:export', '#', 'admin',
        sysdate(), '', null, '');
-- 登录日志按钮
insert into sys_menu
values ('1042', '登录查询', '501', '1', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:logininfor:query', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1043', '登录删除', '501', '2', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:logininfor:remove', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1044', '日志导出', '501', '3', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:logininfor:export', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1045', '账户解锁', '501', '4', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:logininfor:unlock', '#', 'admin',
        sysdate(), '', null, '');
-- 在线用户按钮
insert into sys_menu
values ('1046', '在线查询', '109', '1', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:online:query', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1047', '批量强退', '109', '2', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:online:batchLogout', '#',
        'admin', sysdate(), '', null, '');
insert into sys_menu
values ('1048', '单条强退', '109', '3', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:online:forceLogout', '#',
        'admin', sysdate(), '', null, '');
-- 定时任务按钮
insert into sys_menu
values ('1049', '任务查询', '110', '1', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:query', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1050', '任务新增', '110', '2', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:add', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1051', '任务修改', '110', '3', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:edit', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1052', '任务删除', '110', '4', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:remove', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1053', '状态修改', '110', '5', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:changeStatus', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1054', '任务导出', '110', '6', '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:export', '#', 'admin',
        sysdate(), '', null, '');
-- 代码生成按钮
insert into sys_menu
values ('1055', '生成查询', '116', '1', '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:query', '#', 'admin', sysdate(),
        '', null, '');
insert into sys_menu
values ('1056', '生成修改', '116', '2', '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:edit', '#', 'admin', sysdate(),
        '', null, '');
insert into sys_menu
values ('1057', '生成删除', '116', '3', '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:remove', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1058', '导入代码', '116', '4', '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:import', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1059', '预览代码', '116', '5', '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:preview', '#', 'admin',
        sysdate(), '', null, '');
insert into sys_menu
values ('1060', '生成代码', '116', '6', '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:code', '#', 'admin', sysdate(),
        '', null, '');

-- ----------------------------
-- 6、用户和角色关联表  用户N-1角色
-- ----------------------------
drop table if exists sys_user_role;
create table sys_user_role (
  user_id   bigint(20) not null comment '用户ID',
  role_id   bigint(20) not null comment '角色ID',
  primary key(user_id, role_id)
) engine=innodb comment = '用户和角色关联表';

-- ----------------------------
-- 初始化-用户和角色关联表数据
-- ----------------------------
insert into sys_user_role values ('1', '1');
insert into sys_user_role values ('2', '2');


-- ----------------------------
-- 7、角色和菜单关联表  角色1-N菜单
-- ----------------------------
drop table if exists sys_role_menu;
create table sys_role_menu (
  role_id   bigint(20) not null comment '角色ID',
  menu_id   bigint(20) not null comment '菜单ID',
  primary key(role_id, menu_id)
) engine=innodb comment = '角色和菜单关联表';

-- ----------------------------
-- 初始化-角色和菜单关联表数据
-- ----------------------------
insert into sys_role_menu values ('2', '1');

-- ----------------------------
-- 性能指标聚合表
-- ----------------------------
drop table if exists sys_performance_metric_agg;
create table sys_performance_metric_agg
(
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `type` VARCHAR(20) default '',
    `p50_value` DOUBLE NOT NULL,
    `p75_value` DOUBLE NOT NULL,
    `p90_value` DOUBLE NOT NULL,
    primary key (id),
    unique key `type` (`type`)
) engine = innodb
  auto_increment = 2000 comment = '性能指标聚合表';

-- ----------------------------
-- 页面加载指标聚合表
-- ----------------------------
drop table if exists sys_pageload_metric_agg;
create table sys_pageload_metric_agg
(
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `type` VARCHAR(20) default '',
    `p50_value` DOUBLE NOT NULL,
    `p75_value` DOUBLE NOT NULL,
    `p90_value` DOUBLE NOT NULL,
    primary key (id),
    unique key `type` (`type`)
) engine = innodb
  auto_increment = 2000 comment = '页面加载指标聚合表';
