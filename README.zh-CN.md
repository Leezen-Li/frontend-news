# News

**News** 的 Nx monorepo。包管理器：[Bun](https://bun.sh)。

[English](README.md)

## 工作区结构

```text
apps/
  frontend/          # React + Rsbuild 前端应用（Nx 项目：@org/frontend）
  frontend-e2e/      # Playwright E2E 测试（@org/frontend-e2e）
  backend/           # NestJS API（Nx 项目：@org/backend）
packages/            # 共享库（预留）
```

## 环境要求

- Node.js 20+
- [Bun](https://bun.sh/docs/installation)

## 快速开始

```sh
bun install
```

`bun install` 会通过 `prepare` 脚本自动安装 [lefthook](https://github.com/evilmartians/lefthook) Git hooks：

- **pre-commit**：Prettier 格式化、`bun verify`（sync + typecheck）、cspell 拼写检查、knip 死代码检测
- **pre-push**：`@org/frontend` 与 `@org/backend` 生产构建
- **commit-msg**：commitlint（Conventional Commits 规范）

## 常用命令

在仓库根目录执行。优先使用 `bun nx`，而非直接调用子包脚本。

### 前端（@org/frontend）

| 任务         | 命令                              |
| ------------ | --------------------------------- |
| 开发服务     | `bun nx dev @org/frontend`        |
| 生产构建     | `bun nx build @org/frontend`      |
| 预览构建产物 | `bun nx preview @org/frontend`    |
| 类型检查     | `bun typecheck`                   |
| 提交前检查   | `bun verify`                      |
| 推送前检查   | `bun verify:push`                 |
| 格式化       | `bun format` / `bun format:check` |
| 拼写检查     | `bun spellcheck`                  |
| 无用依赖检测 | `bun knip`                        |
| E2E 测试     | `bun nx e2e @org/frontend-e2e`    |

开发服务默认地址：[http://localhost:4200](http://localhost:4200)

### 后端（@org/backend）

| 任务            | 命令                        |
| --------------- | --------------------------- |
| 开发服务（HMR） | `bun nx serve @org/backend` |
| 生产构建        | `bun nx build @org/backend` |
| 类型检查        | `bun typecheck`             |

API 默认地址：[http://localhost:3000/api](http://localhost:3000/api)。Swagger UI：[http://localhost:3000/docs](http://localhost:3000/docs)。

### 构建分析（Rsdoctor）

[Rsdoctor](https://rsdoctor.rs/) 通过 `RSDOCTOR=true` 按需启用，不影响日常开发速度：

| 任务         | 命令                                  |
| ------------ | ------------------------------------- |
| 开发模式分析 | `bun nx dev:rsdoctor @org/frontend`   |
| 构建模式分析 | `bun nx build:rsdoctor @org/frontend` |

也可在应用目录直接运行：

```sh
bun --cwd apps/frontend run dev:rsdoctor
bun --cwd apps/frontend run build:rsdoctor
```

### Nx 工具

```sh
bun nx show project @org/frontend --json   # 查看所有 targets
bun nx graph                               # 项目依赖图
bun nx sync                                # 同步 TypeScript 项目引用
```

## 提交规范

提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/)（`commit-msg` hook 由 commitlint 校验）。常用 scope：`frontend`、`backend`、`ci`、`deps`、`nx`。

校验草稿提交信息：

```sh
printf '%s\n' 'feat(frontend): add news feed' | bunx commitlint
```

## CI

GitHub Actions 工作流：[.github/workflows/ci.yml](.github/workflows/ci.yml)。
