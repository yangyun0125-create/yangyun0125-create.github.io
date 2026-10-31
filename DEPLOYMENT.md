# GitHub Pages 部署指南

本项目从 PRISM 官方仓库直接定制，使用 Next.js 静态导出，无需服务器或数据库。最终产物位于 `out/`。当前主站已发布至 [GitHub Pages](https://yangyun0125-create.github.io/)，源码仓库为 [yangyun0125-create/yangyun0125-create.github.io](https://github.com/yangyun0125-create/yangyun0125-create.github.io)。

日常修改可直接在现有仓库编辑 `content/` 与 `content_zh/` 并提交到 `main`，Actions 会重新部署。逐项操作见 [中文维护指南](CONTENT_GUIDE.md)。不需要重新创建仓库。

## 1. 本地环境

安装 Node.js 22 或更新的受支持 LTS 版本，并确保安装程序包含 npm。打开 PowerShell：

```powershell
cd D:\Website-mine\yun-yang
npm ci
npm run dev
```

访问 [本地开发站点](http://localhost:3000)。若 3000 端口占用，请以终端输出为准。

正式构建及检查：

```powershell
npm run typecheck
npm run lint
npm run check:bibtex
npm run build
npm run check:export
npm run preview
```

访问 [静态导出预览](http://localhost:4173)。`npm start` 也使用这个静态预览服务器；静态导出不使用 `next start`。预览仅监听本机，请勿将它当成生产服务器。Ctrl+C 停止服务。

## 2. 将来迁移至其他 GitHub 仓库

当前仓库已配置完成。本节仅供将来迁移到新的空仓库使用。本机 `.git` 保留原有 PRISM 历史，和网页创建的现有 GitHub 仓库不是同一条历史；不要直接向现有仓库强制推送，也不要用此节的新仓库步骤覆盖它。日常维护优先使用上方的网页编辑流程。

推荐为长期学术网站创建公开仓库，以使用免费 GitHub Pages。二选一：

| 方式 | 仓库名 | URL 格式 |
| --- | --- | --- |
| 用户根站点 | `YOUR_USERNAME.github.io` | `https://YOUR_USERNAME.github.io/` |
| 项目站点 | 自定名称，如 `academic-website` | `https://YOUR_USERNAME.github.io/academic-website/` |

上表均为示例变量，不是已经部署的地址。代码不包含 GitHub 凭证。

当前 `origin` 指向 PRISM 官方仓库，不能直接向它推送。创建自己的空仓库后，先查看并保留来源：

```powershell
git remote -v
git remote rename origin upstream
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git add .
git commit -m "Personalize PRISM for Yun Yang"
git push -u origin main
```

若 `upstream` 已存在，不重复重命名；根据 `git remote -v` 的结果设置自己的 `origin`。如果 Git 提示缺少作者信息，请配置你自己的提交姓名和邮箱。不要将占位账号照抄成真实信息，也不要上传 token、`.env.local`、`node_modules/` 或 `.sites-runtime/`。

## 3. 开启自动部署

1. 在自己的 GitHub 仓库中打开 **Settings → Pages**。
2. 将 **Build and deployment → Source** 设为 **GitHub Actions**。
3. 进入 **Actions**，运行 **Deploy academic website to GitHub Pages**，或向 `main` 推送一次更新。
4. 等待 build 和 deploy 成功，再使用 Pages 页面返回的真实 URL。

工作流 `.github/workflows/deploy.yml` 已配置：

- Node.js 22 与 npm 缓存；
- `npm ci`、TypeScript、ESLint 与 BibTeX 兼容检查；
- 由 `actions/configure-pages` 自动取得 `base_url` 和 `base_path`；
- 通过 `SITE_URL` 和 `BASE_PATH` 构建静态站点；
- 检查页面、静态资源、canonical 与 sitemap；
- 上传 `out/` 并交给 GitHub Pages 部署。

如果默认分支不是 `main`，修改 workflow 中的分支名。使用上传产物的 Actions 方式，不必把 `out/` 提交到源码仓库，也不依赖手工添加 `.nojekyll`。

## 4. 根路径与项目子路径

无需在代码中写死仓库名称。`next.config.ts` 从 `BASE_PATH` 读取路径，同时设置 `basePath` 与 `assetPrefix`；Next Link 自动处理导航前缀，头像、favicon、论文图片、论文 PDF 和 CV PDF 使用统一的路径函数。

根站点本地构建：

```powershell
$env:SITE_URL = "https://YOUR_USERNAME.github.io"
Remove-Item Env:BASE_PATH -ErrorAction SilentlyContinue
npm run build
npm run check:export
npm run preview
```

项目站点本地构建：

```powershell
$env:SITE_URL = "https://YOUR_USERNAME.github.io/academic-website"
$env:BASE_PATH = "/academic-website"
npm run build
npm run check:export
npm run preview
```

后者访问 `http://localhost:4173/academic-website/`。构建和预览使用相同的 `BASE_PATH`。切换目标后必须重新构建；这些设置是在构建时写入的。

恢复使用配置文件中公开域名的根路径本地预览：

```powershell
Remove-Item Env:SITE_URL -ErrorAction SilentlyContinue
Remove-Item Env:BASE_PATH -ErrorAction SilentlyContinue
npm run build
npm run preview
```

macOS/Linux 对应示例：`SITE_URL=https://YOUR_USERNAME.github.io/academic-website BASE_PATH=/academic-website npm run build`。

## 5. 正式域名与 SEO

`content/config.toml` 的 `[site].url` 已填写当前公开站点，用于 canonical、Open Graph URL 与完整 sitemap。如果将其清空且不设置 `SITE_URL`，构建会省略未经确认的 URL，sitemap 不写入虚假页面地址。

已知真实域名后可填写 `site.url`，或通过构建环境的 `SITE_URL` 覆盖。优先级：`SITE_URL` 高于 `site.url`。URL 必须包含 `https://`；项目站点应包含仓库子路径。GitHub Actions 会自动提供真实 Pages URL，不必手工填写。

`robots.txt` 与 `sitemap.xml` 均由静态构建生成。配置 URL 后，sitemap 包含五个正式页面，robots 引用对应 sitemap。中英文沿用 PRISM 的客户端语言切换，共用页面 URL，因此没有虚构独立中文路由或 hreflang URL。

绑定自己的域名时，先在 GitHub Pages 设置 Custom domain，并按 GitHub 的提示设置 DNS，再重新运行部署。不要把待注册的域名填成已存在的网站。

## 6. 常见问题

- **样式或头像 404**：确认构建时的 `BASE_PATH` 与部署路径一致；检查资源位于 `public/`，配置中不要手动重复添加仓库前缀。
- **CV 按钮不显示**：将真实 PDF 放入 `public/cv/yun-yang-cv.pdf`，再重新构建。
- **Publications 为空**：当前设计如此。只在收到真实 BibTeX 后填写 `content/publications.bib`。
- **CI 无法部署**：检查 Pages 的 Source 为 GitHub Actions，以及仓库组织策略是否允许 Pages 和 Actions。
- **npm 不存在**：重新安装包含 npm 的 Node.js，并重新打开终端。本次开发环境使用了忽略的本地 npm 工具，不是网站运行依赖。
- **更新依赖后失败**：同时提交 `package.json` 与 `package-lock.json`；先在本地运行全部检查，不直接删除锁文件。

## 参考

- [PRISM 原项目](https://github.com/xyjoey/PRISM)
- [Next.js 静态导出文档](https://nextjs.org/docs/app/guides/static-exports)
- [GitHub configure-pages 的官方输出定义](https://github.com/actions/configure-pages/blob/v5/action.yml)
