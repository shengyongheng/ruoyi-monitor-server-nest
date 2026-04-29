#!/bin/bash
set -e

# 变量（从环境变量中获取，这些变量由 GitLab CI 传入）

# nest 服务相关
# NEST_IMAGE_NAME
# CONTAINER_NAME

# Mysql 服务相关
# MYSQL_ROOT_PASSWORD
# MYSQL_USER
# MYSQL_PASSWORD
# MYSQL_DATABASE
# MYSQL_VOLUME_DIR

# Redis 服务相关
# REDIS_PASSWORD
# NETWORK_NAME
# REDIS_VOLUME_DIRF

# 确保数据持久化目录存在
mkdir -p "$MYSQL_VOLUME_DIR" "$REDIS_VOLUME_DIR"

# 创建 Docker 网络（如果不存在）
if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
  docker network create "$NETWORK_NAME"
  echo "Created network: $NETWORK_NAME"
fi

# --- 启动 MySQL 容器（如果未运行）---
if ! docker ps --filter "name=mysql" --format "{{.Names}}" | grep -q "^mysql$"; then
  docker rm -f mysql 2>/dev/null || true  # 移除已停止的容器
  docker run -d \
    --name mysql \
    --network "$NETWORK_NAME" \
    -e MYSQL_ROOT_PASSWORD="$MYSQL_ROOT_PASSWORD" \
    -e MYSQL_DATABASE="$MYSQL_DATABASE" \
    -e MYSQL_USER="$MYSQL_USER" \
    -e MYSQL_PASSWORD="$MYSQL_PASSWORD" \
    -v "$MYSQL_VOLUME_DIR:/var/lib/mysql" \
    -p 3306:3306 \
    mysql:8.0 \
    --default-authentication-plugin=mysql_native_password
  echo "MySQL container started."
else
  echo "MySQL container is already running."
fi

# --- 启动 Redis 容器（如果未运行）---
if ! docker ps --filter "name=redis" --format "{{.Names}}" | grep -q "^redis$"; then
  docker rm -f redis 2>/dev/null || true
  # 如果需要密码且持久化，可以添加环境变量和卷
  docker run -d \
    --name redis \
    --network "$NETWORK_NAME" \
    -v "$REDIS_VOLUME_DIR:/data" \
    -p 6379:6379 \
    redis:7-alpine \
    redis-server --appendonly yes --requirepass "$REDIS_PASSWORD"
  echo "Redis container started."
else
  echo "Redis container is already running."
fi

# --- 部署 NestJS 容器 ---
# 拉取最新的 NestJS 镜像
docker pull "$NEST_IMAGE_NAME:latest"

# 移除旧的 NestJS 容器（如果存在）
if docker ps -a --filter "name=$CONTAINER_NAME" --format "{{.Names}}" | grep -q "^$CONTAINER_NAME$"; then
  docker rm -f "$CONTAINER_NAME" || true
fi

# 启动新的 NestJS 容器
docker run -d \
  --name "$CONTAINER_NAME" \
  --network "$NETWORK_NAME" \
  -p 3000:3000 \
  -e DB_HOST=mysql \
  -e DB_PORT=3306 \
  -e DB_USERNAME="$MYSQL_USER" \
  -e DB_PASSWORD="$MYSQL_PASSWORD" \
  -e DB_DATABASE="$MYSQL_DATABASE" \
  -e REDIS_HOST=redis \
  -e REDIS_PORT=6379 \
  -e REDIS_PASSWORD="$REDIS_PASSWORD" \
  "$NEST_IMAGE_NAME:latest"

echo "NestJS container deployed successfully."