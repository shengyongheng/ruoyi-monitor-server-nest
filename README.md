# RuoYi Monitor Server - NestJS

<p align="center">
  <strong>基于 NestJS 的若依监控系统后端服务</strong>
  <br />
  <span>使用 TypeScript 开发，提供高性能、可扩展的监控系统 API</span>
</p>

<p align="center">
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js" alt="Node.js" />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  </a>
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/NestJS-11.0-E0234E?style=flat-square&logo=nestjs" alt="NestJS" />
  </a>
  <a href="https://github.com/shengyongheng/ruoyi-monitor-server-nest/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/license-UNLICENSED-blue?style=flat-square" alt="License" />
  </a>
</p>

---

## 📋 项目简介

本项目是若依（RuoYi）监控系统的 NestJS 实现版本，是一个现代化的企业级监控服务后端应用。采用 NestJS 框架开发，基于 TypeScript，提供高效、可靠的 RESTful API 接口。

### 🎯 核心特性

- **🚀 高性能框架**：基于 NestJS + Express，提供快速的请求处理
- **📝 完整 API 文档**：集成 Swagger，自动生成 API 文档
- **🔐 JWT 认证**：支持 JWT 令牌认证机制
- **📊 数据库支持**：支持 MySQL
- **💾 缓存管理**：集成 Redis，支持分布式缓存
- **⏰ 任务调度**：内置定时任务调度功能
- **✅ 数据验证**：集成 class-validator，提供数据验证能力
- **🐳 Docker 支持**：提供 Dockerfile，支持容器化部署
- **🧪 测试覆盖**：完整的单元测试和 E2E 测试框架(待完成)

---

## 🛠️ 技术栈

### 核心依赖

| 技术 | 版本 | 说明 |
|------|------|------|
| NestJS | ^11.0.1 | Node.js 框架 |
| TypeScript | ^5.7.3 | 编程语言 |
| Express | 内置 | Web 服务器 |
| TypeORM | ^0.3.25 | ORM 框架 |
| JWT | ^11.0.2 | 身份认证 |
| Redis | ^5.10.1 | 缓存存储 |
| Swagger | ^11.2.0 | API 文档 |
| MySQL2 | ^3.14.1 | MySQL 驱动 |

---

## 📦 环境要求

- **Node.js**: 18.0.0 或更高版本
- **npm**: 9.0.0 或更高版本 / **pnpm**: 8.0.0 或更高版本
- **MySQL**: 5.7 或更高版本
- **Redis**: 6.0 或更高版本
- **Docker**: 最新版本（用于容器化部署）

---

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/shengyongheng/ruoyi-monitor-server-nest.git
cd ruoyi-monitor-server-nest
```

### 2. 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 3. 环境配置

创建 `.env` 文件，配置相关环境变量：

```env
# 服务器配置
SERVER_PORT=3000
NODE_ENV=development

# 数据库配置 - MySQL
DB_HOST=xxx
DB_PORT=xxx
DB_USERNAME=xxx
DB_PASSWORD=xxx
DB_DATABASE=xxx

# Redis 配置
REDIS_HOST=xxx
REDIS_PORT=xxx
REDIS_PASSWORD=xxx

# JWT 配置
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=xxx
```

### 4. 开发运行

```bash
# 开发模式（带文件监听）
pnpm run start:dev

# 或者使用调试模式
pnpm run start:debug

# 访问 API 文档
# http://localhost:3000/api-docs
```

### 5. 生产构建

```bash
# 编译项目
pnpm run build

# 生产环境运行
pnpm run start:prod
```

---

## 🧪 测试

```bash
# 运行单元测试
pnpm run test

# 监听模式运行测试
pnpm run test:watch

# 生成测试覆盖率报告
pnpm run test:cov

# 运行 E2E 测试
pnpm run test:e2e
```

---

## 📋 项目结构

```
src/
├── common/                 # 公共模块
│   ├── filters/           # 异常过滤器
│   ├── interceptors/      # 响应拦截器
│   ├── decorators/        # 自定义装饰器
│   └── guards/            # 认证守卫
├── modules/               # 业务模块
│   ├── app.module.ts      # 应用主模块
│   └── [feature]          # 具体功能模块
├── config/                # 配置文件
├── static/                # 静态资源
│   └── images/            # 图片资源
└── main.ts                # 应用入口

test/                       # 测试目录
docs/                       # 文档目录
```

---

## 🐳 Docker 部署

### 使用 Dockerfile 构建

```bash
# 构建镜像
docker build -t ruoyi-monitor-nest:latest .

# 运行容器
docker run -d \
  --name ruoyi-monitor \
  -p 3000:3000 \
  -e SERVER_PORT=3000 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=3306 \
  ruoyi-monitor-nest:latest
```

---

## 📝 API 文档

项目集成了 Swagger，启动应用后可以访问 API 文档：

```
http://localhost:3000/api-docs
```

Swagger 自动生成的 API 文档包含：
- 所有 API 端点的详细说明
- 请求和响应的完整 Schema
- 在线调试接口
- API 参数和返回值说明

---

## 🔧 开发命令

```bash
# 代码格式化
pnpm run format

# 代码检查和修复
pnpm run lint

# 启动开发服务器
pnpm run start

# 启动监听模式
pnpm run start:dev

# 启动调试模式
pnpm run start:debug

# 生产构建和运行
pnpm run start:prod
```

---

## 🔐 认证和授权

项目使用 JWT（JSON Web Token）进行身份认证：

1. **登录**：获取 JWT Token
2. **请求**：在 Authorization Header 中提供 Token
3. **验证**：服务器验证 Token 的有效性

```typescript
// 使用示例
// Header: Authorization: Bearer <token>
```

---

## 📦 依赖说明

### 核心框架
- **@nestjs/core**: NestJS 核心库
- **@nestjs/common**: NestJS 常用功能
- **@nestjs/platform-express**: Express 适配器

### 数据库与缓存
- **typeorm**: ORM 框架，支持多种数据库
- **mysql2**: MySQL 驱动
- **ioredis**: Redis 客户端

### 认证和安全
- **@nestjs/jwt**: JWT 认证支持
- **class-validator**: 数据验证
- **class-transformer**: 数据转换

### 其他功能
- **@nestjs/swagger**: API 文档生成
- **@nestjs/schedule**: 定时任务调度
- **compression**: HTTP 压缩中间件
- **svg-captcha**: 验证码生成

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交步骤

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 遵循 ESLint 配置
- 使用 Prettier 进行代码格式化
- 提供单元测试和 E2E 测试
- 更新相关文档

---

## 📄 许可证

MIT

---

## 📞 联系方式

- **作者**: shengyongheng
- **GitHub**: [shengyongheng](https://github.com/shengyongheng)
- **项目地址**: [ruoyi-monitor-server-nest](https://github.com/shengyongheng/ruoyi-monitor-server-nest)

---

## 🔗 相关资源

- [NestJS 官方文档](https://docs.nestjs.com)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [TypeORM 官方文档](https://typeorm.io)

---

## 更新日志

### v0.0.1 (2026-04-29)

- ✨ 初始化项目
- 🎉 集成 NestJS 框架
- 📝 添加 Swagger 文档支持
- 🔐 实现 JWT 认证
- 💾 支持 MySQL 和 PostgreSQL
- ⏰ 集成 Redis 缓存和任务调度
- 🐳 提供 Docker 支持
- ✅ 完整的测试框架

---

<p align="center">
  <strong>Made with ❤️ by shengyongheng</strong>
</p>