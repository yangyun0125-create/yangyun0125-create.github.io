# 修改清单与验证记录

本项目直接克隆自 xyjoey/PRISM，基于上游提交 f2748db（1.3.3）定制，未另建替代模板。MIT LICENSE 保留，页脚保留 PRISM 署名。

## GitHub Pages 迁移（2026-10-31）

- 正式部署目标：https://yangyun0125-create.github.io/。
- 源码仓库：yangyun0125-create/yangyun0125-create.github.io。
- 保留 PRISM 组件与 MIT 授权，启用 GitHub Pages 自动构建与部署。
- 已提供的 GitHub 账号链接同步加入主页及双语联系页。
- 本仓库不包含其他托管平台的账号配置或本地运行工具。

## 公开访问、证件照与邮箱更新（2026-10-31）

- 网站权限已改为 public，所有访客均可访问，不再要求 ChatGPT 登录。
- 使用本人提供的证件照 `public/images/avatar.jpg`，原始文件未修改；页面按圆形展示，并调整照片在圆框中的位置。
- 首页邮箱入口与中英文 Contact 页面均已配置 `yun.yang@inrae.fr`。
- 当前公开 URL 已写入配置，canonical、Open Graph URL 与 sitemap 使用真实站点地址；GitHub Pages 工作流仍可覆盖 URL。
- 本次 TypeScript、零警告 ESLint、生产构建与静态导出检查通过，已在浏览器核对照片和双语邮箱链接。
- 同步更新 README、部署/维护指南及首页截图。后续仍需提供真实 CV PDF、BibTeX 和其他学术账号链接。

以下为首次交付记录，后续状态以上述更新为准。

## 首次交付的主要修改

- 使用 content/ 与 content_zh/ 管理五个页面、中英文个人信息、四个研究方向、方法兴趣、教育经历及真实 News。
- 沿用 PRISM 双栏首页、响应式导航、Framer Motion 动画、Zustand 主题与语言持久化、Markdown 页面和 BibTeX 系统。
- 米白/深绿配色、系统 Serif/Sans-serif 字体、YY 中性头像与 favicon；删除原作者照片、演示论文及虚构教学/奖项/服务内容。
- 空论文库隐藏首页精选论文；论文页显示空状态。补齐真实 BibTeX 的 pdf 字段到 PDF 链接的支持，原有年份/类型筛选、搜索、DOI、BibTeX 展开与复制保留。
- CV 包含学术任职、教育、研究兴趣、在研博士课题、硕士论文原题和方法兴趣；缺少真实 PDF 时在构建期隐藏下载按钮。
- 为原始 HTML 提供英文 SEO；浏览器标题和描述随语言更新。正式 URL 留空，确认后生成 canonical 与完整 sitemap。
- 根路径及子路径共享路径工具，支持头像、favicon、论文图片/PDF、CV PDF；GitHub Actions 自动使用 Pages 返回的 base_url/base_path。
- 添加键盘跳转正文、焦点样式、导航当前页标识、语言菜单展开状态和 Escape 支持、减少动画偏好。
- Next.js 15.3.3 更新为 15.5.28、React 19 系列更新为 19.3.1，同步 eslint-config-next；移除未使用的 svg2ico 开发依赖，未新增网站依赖。

## 实际验证

| 检查 | 结果 |
| --- | --- |
| 安装依赖 | npm install 成功，package-lock.json 已同步 |
| TypeScript | npm run typecheck 通过 |
| ESLint | npm run lint 通过，0 警告 |
| 根路径生产构建 | npm run build 通过，out/ 已生成 |
| 子路径生产构建 | BASE_PATH=/preview-check，SITE_URL=https://example.test/preview-check，构建通过；这是测试地址，不是实际部署 |
| 静态资源与路由检查 | 根路径及子路径各 5 页、104 处 href/src 引用通过；同时检查缺失 CV、模板残留和 SEO |
| 浏览器内容 | Home、Research、Publications 空状态、CV、Contact；中英切换、刷新语言持久化和中文标题通过 |
| 浏览器布局 | 1440px 桌面、768px 平板、390px 手机，未发现横向溢出或破损头像；深浅模式和手机菜单正常 |
| 浏览器控制台 | 检查页面未发现 error/warn |

Windows 沙箱最初拒绝创建 Next.js 动态路由构建目录，改用获准的沙箱外构建后成功。最终 out/ 已恢复为不指定正式域名的根路径版本。

没有真实论文或 CV PDF，因此没有宣称完成真实论文 PDF、DOI 目标的联网验证；也没有替用户生成论文数据或 PDF。GitHub Actions 已配置，实际 GitHub Pages 发布需要用户创建自己的仓库并启用 Pages。

## 交付与后续资料

- 本地运行：见 README.md。
- GitHub Pages 部署：见 DEPLOYMENT.md。
- 日常内容维护：见 CONTENT_GUIDE.md。
- 首页实测截图：docs/preview-home.jpg。
- 待补充：真实头像、邮箱/学术账号链接、正式 CV PDF、真实 BibTeX、自己的 GitHub 仓库与最终域名；正式导师或获奖资料仅在确认后新增。

## 完整文件清单

A = 新增，M = 修改，D = 删除。 .openai/hosting.json 仅用于 Sites 的可选私有预览，GitHub Pages 不依赖它；正式 URL 仍由 Pages 配置决定。

```text
A	.env.example
A	.openai/hosting.json
A	CHANGES.md
A	CONTENT_GUIDE.md
A	DEPLOYMENT.md
A	content/contact.md
A	content/contact.toml
A	content/overview.md
A	content/research.md
A	content/research.toml
A	content_zh/contact.md
A	content_zh/contact.toml
A	content_zh/overview.md
A	content_zh/research.md
A	content_zh/research.toml
A	docs/preview-home.jpg
A	public/cv/.gitkeep
A	public/images/avatar-placeholder.svg
A	public/images/research/.gitkeep
A	public/papers/.gitkeep
A	scripts/check-export.mjs
A	scripts/preview.mjs
A	src/app/robots.ts
A	src/app/sitemap.ts
A	src/components/ui/LocalizedMetadata.tsx
A	src/components/ui/SkipLink.tsx
A	src/lib/downloads.ts
A	src/lib/paths.ts
A	src/lib/site-url.ts
D	content/awards.toml
D	content/services.toml
D	content/teaching.toml
D	content_zh/awards.toml
D	content_zh/services.toml
D	content_zh/teaching.toml
D	public/bio.jpg
D	public/papers/example.png
M	.github/workflows/deploy.yml
M	.gitignore
M	README.md
M	README_cn.md
M	content/about.toml
M	content/bio.md
M	content/config.toml
M	content/cv.md
M	content/cv.toml
M	content/news.toml
M	content/publications.bib
M	content/publications.toml
M	content_zh/about.toml
M	content_zh/bio.md
M	content_zh/config.toml
M	content_zh/cv.md
M	content_zh/cv.toml
M	content_zh/news.toml
M	content_zh/publications.toml
M	next.config.ts
M	package-lock.json
M	package.json
M	public/favicon.svg
M	src/app/[slug]/page.tsx
M	src/app/globals.css
M	src/app/layout.tsx
M	src/app/page.tsx
M	src/components/home/About.tsx
M	src/components/home/HomePageClient.tsx
M	src/components/home/News.tsx
M	src/components/home/Profile.tsx
M	src/components/home/SelectedPublications.tsx
M	src/components/layout/Footer.tsx
M	src/components/layout/Navigation.tsx
M	src/components/pages/DynamicPageClient.tsx
M	src/components/pages/TextPage.tsx
M	src/components/publications/PublicationsList.tsx
M	src/components/ui/LanguageToggle.tsx
M	src/components/ui/ThemeProvider.tsx
M	src/lib/bibtexParser.ts
M	src/lib/config.ts
M	src/types/page.ts
```
