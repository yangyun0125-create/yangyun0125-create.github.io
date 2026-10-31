# 项目清理报告

日期：2026-10-31。项目：Yun Yang / 杨郧个人学术网站。

主站：[GitHub Pages](https://yangyun0125-create.github.io/)。本机源码：`D:\Website-mine\yun-yang`。

本次直接清理现有 PRISM 定制项目，没有重新制作模板，没有重新克隆仓库，没有删除或改写 Git 历史。删除前检查了源码 import、动态页面分支、TOML 内容来源、静态资源路径、构建脚本及部署工作流；递归盘点时不跟随目录链接。

## 1. 已删除的文件和目录

以下是完整的人工确认删除清单；依赖内部文件及生成缓存按目录列出。

| 路径（相对于项目根目录，另有注明除外） | 删除原因 |
| --- | --- |
| `logo.png` | PRISM 原模板标志；没有源码、内容或部署引用，网站使用 YY favicon |
| `screenshot.png` | PRISM 原模板演示截图；未被当前网站或维护文档引用 |
| `docs/preview-avatar.jpg` | 旧交付截图，不是网站头像，不参与运行 |
| `docs/preview-home.jpg` | 旧交付截图，不参与运行；新验证截图存放在项目外 |
| `docs/deployment.md` | 过时的上游部署说明，与实际 GitHub Pages 指南重复 |
| `docs/deployment_cn.md` | 同上；有效部署说明统一保存在根目录 `DEPLOYMENT.md` |
| `docs/` | 上述四个文件删除后为空，移除空目录 |
| `tailwind.config.mjs` | Tailwind 4 使用 CSS 中的 `@theme`；没有 `@config` 或构建脚本加载这份旧配置 |
| `src/types/bib.d.ts` | 没有 `.bib` 模块 import；BibTeX 通过内容加载器读取，不再需要此声明 |
| `D:\Website-mine\yun-yang-site.tar.gz` | 检查归档目录后确认为旧版 Sites 交付包，已被当前源码和新 `out/` 取代 |
| `D:\Website-mine\yun-yang-source.zip` | 旧版源码交付包，内容过时，避免以后误用旧包覆盖当前网站 |
| `.sites-runtime/npm-cache/` | 此前安装、卸载产生的缓存，不参与网站运行 |
| `.sites-runtime/pnpm-store/` | 旧工具安装缓存；先移除指向仍在使用的 npm 工具的缓存目录链接，再删除缓存，未递归进入链接目标 |
| `.sites-runtime/github-publish.json` | 先前 GitHub 发布的中间载荷，不是网站内容或凭证配置 |
| `.sites-runtime/cleanup-inventory.json` | 此次递归盘点的临时文件，结论已写入本报告 |
| `.next/` | 旧构建目录在全新构建前清除；验证后的中间构建目录也移除，仅保留已通过检查的静态交付 `out/` |
| `next-env.d.ts`、`tsconfig.tsbuildinfo` | 可自动生成的类型入口及增量检查缓存；清除后再次运行 TypeScript 检查通过 |

本次提交准备过程中使用的 `.sites-runtime/cleanup-publish.json` 是临时载荷，发布完成后删除。没有将临时载荷、生成目录、安装工具或依赖目录上传到源码仓库。

## 2. 已清理的未使用代码与样式

这些是文件内部的删除，不是删除仍在使用的组件文件。

- `ThemeToggle.tsx`：删除没有任何调用方的 `ThemeToggleDropdown`、专属类型及图标配置；保留实际使用的 system / light / dark 循环切换、动画和持久化。
- `utils.ts`：删除未引用的 `formatDate`、`formatYear`、`generateSlug`，保留实际使用的 `cn`。
- `bibtexParser.ts`、`publication.ts`：删除未展示、未调用的 `ResearchArea` 自动分类及 AI / 医疗 / 量子示例分类。真实论文的类型、年份、作者、摘要、PDF、DOI、精选标志与 BibTeX 引用功能保留。
- `globals.css`：删除无引用的 glass / glass-card / card-bg 效果、渐变配置、冗余字号与语义颜色变量；保留象牙白与深绿配色、深色模式、字体、响应式和无障碍样式。
- `next.config.ts`：删除没有 `.bib` import 使用的 Webpack loader；静态导出、`basePath`、`assetPrefix`、图片静态部署设置保留。
- `CHANGES.md`：用当前实际状态替换重复、过时的交付清单及已删除截图引用；上游版本记录仍保留在 `CHANGELOG.md`，完整历史仍在 `.git`。

通过 TypeScript AST 检查相对路径及 `@/` 导入关系，40 个项目模块均可从 Next.js 页面入口到达，没有再发现可以直接删除的独立源码模块。动态页面分支也计入检查，不能仅因当前内容配置未启用就删掉可维护功能。

## 3. npm 依赖优化

没有新增 npm 依赖。保留 `package.json` 和 `package-lock.json`，使用 npm 更新锁文件。

| 移除的直接声明 | 理由与替代方式 |
| --- | --- |
| `next-themes` | 无 import；本网站实际使用 PRISM 的 Zustand 主题状态 |
| `lightningcss` | 冗余的直接开发依赖；实际需要的版本继续由 Tailwind 的 `@tailwindcss/node` 传递依赖提供 |
| `lightningcss-linux-x64-gnu` | 不需要直接声明特定系统的原生包；交由 Tailwind / lightningcss 自身的平台依赖管理 |
| `bibtex-parse-js` | 该 npm 包把 AVA 及 XML 工具声明为生产依赖，但解析器模块不引用它们。将原版 0.0.24 解析器按字节原样保存到 `src/lib/vendor/` 并附原 MIT 许可，保留解析行为，避免安装无用测试依赖树 |

原解析器与保存副本在卸载前逐字节比较相同，SHA-256 见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。没有重写解析算法。

- npm 实际报告移除 **544 个安装包**。
- 锁文件的 `packages` 条目从 **1,058** 减至 **509**；此数字包括可选平台条目，与实际安装包数量的口径不同。
- 锁文件不再含 `ava`、`xml2js`、`next-themes` 或原 npm `bibtex-parse-js` 包。
- 新增 `check:bibtex` 验证实际解析包装层；合成输入只存在于测试脚本，不写入网站 BibTeX，也不作为个人论文展示。

## 4. 保留的文件及理由

| 保留内容 | 原因 |
| --- | --- |
| `.git/`、`.gitignore`、Git 历史 | 按要求保留；没有 reset、历史重写或清理历史对象 |
| `LICENSE`、页脚 PRISM 署名、`CHANGELOG.md` | 保留上游版权、许可证与版本来源；历史记录中的原作者信息不属于当前网站展示内容 |
| `src/lib/vendor/LICENSE.bibtex-parse-js`、`THIRD_PARTY_NOTICES.md` | 记录按原样保留的第三方解析器授权与来源 |
| `content/`、`content_zh/` 全部当前资料 | 保留真实个人介绍、研究计划、教育、邮箱、新闻和两种语言配置 |
| `content/publications.bib` | 注释说明下的空论文库，无示例论文；供以后加入真实 BibTeX |
| `public/images/avatar.jpg` | 本人提供的真实证件照；页面按圆形裁切，图片内容未修改，项目外原照片未触碰 |
| `public/images/avatar-placeholder.svg` | 配置头像为空时真正使用的中性 YY 后备图，不是随机人物照 |
| `public/favicon.svg` | 当前网站使用的 YY 标志 |
| `public/cv/.gitkeep`、`public/papers/.gitkeep`、`public/images/research/.gitkeep` | 保留清楚的长期资源入口；目前没有虚构 PDF 或研究图片 |
| `CardPage.tsx` 及动态路由 | 动态页面分支实际引用的可配置功能，适合以后添加研究卡片；不是废弃示例页 |
| 论文列表、精选论文、新闻及相应加载器 | 保留未来更新所需的筛选、搜索、BibTeX、PDF / DOI 和精选展示能力 |
| CV 下载检查 | 只有真实 PDF 存在才显示按钮，当前无 PDF 时保持隐藏 |
| `package.json`、锁文件、TS / Next / PostCSS / ESLint 配置、Actions | 构建与部署必需；Tailwind 4 的有效主题定义在 `globals.css` 中 |
| `scripts/check-export.mjs` 中的旧模板姓名匹配 | 这是防止模板残留的负向检查条件，不是网页内容；保留用于阻止以后误带回示例资料 |
| `out/`（本机、Git 忽略） | 当前根站点的已验证静态交付，可直接预览，不提交源码仓库 |
| `node_modules/`（本机、Git 忽略） | 当前需要的开发和构建依赖，不是要上传的源码；已按锁文件移除无用依赖 |
| `.sites-runtime/npm/`（仅本机） | 本机没有全局 npm，当前检查依赖此工具；保留后已验证 npm 可正常运行。安装带 npm 的 Node.js 后可另行移除 |
| `.openai/hosting.json`（仅本机） | 仍指向先前发布的 Sites 镜像，不能作为无用配置直接丢弃；不在 GitHub 仓库，不影响 GitHub Pages 构建 |

个人 GitHub 社交链接保持为空，中英文首页及联系页均不展示个人 GitHub 地址。PRISM 开源项目的页脚署名继续保留。

## 5. 体积记录

递归统计按文件逻辑字节数计算，不跟随目录链接；不是磁盘压缩后占用量。

| 项目 | 清理前 | 清理后 |
| --- | ---: | ---: |
| 本机 `node_modules/` | 476,071,346 bytes / 37,224 文件 | 452,596,553 bytes / 30,392 文件 |
| 本机 `.sites-runtime/` | 311,151,122 bytes / 6,286 文件 | 13,101,259 bytes / 2,006 文件，仅保留 npm 工具 |
| `public/` | 79,439 bytes / 6 文件 | 79,439 bytes / 6 文件，真实资源完整保留 |
| 根站点静态交付 `out/` | 1,521,331 bytes / 44 文件 | 1,520,446 bytes / 44 文件 |

另已清除旧 `.next/`（144,570,562 bytes）、两个旧交付归档、未引用的模板图片与旧文档。功能保留的前提下，前端交付仍约 1.52 MB；依赖优化主要减少构建工具和本机冗余，不夸大浏览器下载量变化。

## 6. 最终目录结构

```text
D:\Website-mine\
└── yun-yang/
    ├── .github/workflows/deploy.yml
    ├── content/                 # 英文与共用真实 BibTeX
    ├── content_zh/              # 简体中文
    ├── public/
    │   ├── cv/.gitkeep
    │   ├── images/
    │   │   ├── avatar.jpg
    │   │   ├── avatar-placeholder.svg
    │   │   └── research/.gitkeep
    │   ├── papers/.gitkeep
    │   └── favicon.svg
    ├── scripts/
    │   ├── check-bibtex.mjs
    │   ├── check-export.mjs
    │   └── preview.mjs
    ├── src/
    │   ├── app/                 # 首页、[slug]、SEO、全局样式
    │   ├── components/
    │   │   ├── home/
    │   │   ├── layout/
    │   │   ├── pages/
    │   │   ├── publications/
    │   │   └── ui/
    │   ├── lib/
    │   │   ├── i18n/
    │   │   ├── stores/
    │   │   ├── vendor/          # 原版 BibTeX 解析器及许可证
    │   │   └── *.ts            # 内容、配置、解析、路径等
    │   └── types/
    ├── .env.example
    ├── .gitignore
    ├── .nvmrc
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── postcss.config.mjs
    ├── eslint.config.mjs
    ├── README.md
    ├── README_cn.md
    ├── CONTENT_GUIDE.md
    ├── DEPLOYMENT.md
    ├── CLEANUP_REPORT.md
    ├── THIRD_PARTY_NOTICES.md
    ├── CHANGES.md
    ├── CHANGELOG.md
    ├── LICENSE
    ├── .git/                   # 本机原有历史，未改动
    ├── .openai/                # 本机旧镜像身份配置
    ├── .sites-runtime/npm/     # 本机构建工具，Git 忽略
    ├── node_modules/           # 本机安装依赖，Git 忽略
    └── out/                    # 已验证的根站点静态交付，Git 忽略
```

源码结构沿用 PRISM，内容、资源、组件和维护指南已经分开，不为整理目录引入大规模移动或破坏现有路径。

## 7. 清理后验证

| 检查 | 结果 |
| --- | --- |
| TypeScript：`npm run typecheck` | 通过；移除中间构建目录后也单独检查通过 |
| ESLint：`npm run lint` | 通过，零警告 |
| BibTeX：`npm run check:bibtex` | 通过；覆盖空库、嵌套格式、Unicode 作者、排序、类型、精选、PDF 与引用回读，两种 locale 均检查 |
| 根站点：`npm run build` | 通过，静态导出五个主要页面、404、robots、sitemap |
| 根站点：`npm run check:export` | 通过，5 个页面、104 处本地引用；canonical、sitemap、CV 按钮及个人 GitHub 隐藏检查通过 |
| 子路径：`BASE_PATH=/project-check` 构建与导出检查 | 两项通过，5 个页面、104 处本地引用无前缀遗漏；之后重新构建恢复根站点 `out/` |
| 浏览器中英文页面 | 逐页检查 Home / Research / Publications / CV / Contact，两种语言内容正确，无演示论文，无未提供的导师或奖项 |
| 浏览器交互 | 语言切换及刷新保存、深色模式、390×844 手机布局与菜单跳转通过；圆形头像正常，联系邮箱正确，个人 GitHub 未展示 |
| GitHub Pages 配置 | 保留 Node 22、`npm ci`、类型 / lint / BibTeX 检查、Pages 的 base URL / path、静态导出验证和部署步骤；权限与产物目录正确 |
| 许可证与真实资料 | 根许可证无改动；头像字节完整；论文库不含正式条目；当前内容无原作者资料或示例页面 |

本机 Windows 沙箱曾限制 Next.js 生成目录，生产构建使用获准的沙箱外执行完成。命令没有因这一环境限制而跳过。部署后的运行状态可在[仓库 Actions](https://github.com/yangyun0125-create/yangyun0125-create.github.io/actions)查看。

## 8. 仍需人工决定的事项

没有发现影响运行、构建或 GitHub Pages 部署的待检查文件。

- **旧 Sites 镜像是否关闭**：`.openai/hosting.json` 标识先前发布的镜像。主站已经迁移到 GitHub Pages，本次不擅自撤销另一个仍公开的站点。若确定停用旧镜像，应先在托管服务中关闭它，再清理本机身份配置。该文件没有上传到 GitHub。
- **本机 npm 工具是否移除**：当前需要 `.sites-runtime/npm/` 完成本机操作；安装标准 Node.js + npm 后可移除。它不会进入部署产物。
- **尚未提供的真实资料**：CV PDF、Google Scholar、ORCID、正式论文等仍保持缺省或隐藏，收到真实信息后按 [CONTENT_GUIDE.md](CONTENT_GUIDE.md) 更新。

本机 Git 的 `origin` 仍保留 PRISM 上游，未擅自改写。维护现有公开网站推荐先用 GitHub 网页编辑；本地推送前应核对远程地址与两边历史，详见 [DEPLOYMENT.md](DEPLOYMENT.md)。
