# 中文内容维护指南

日常更新主要编辑 `content/`（英文）与 `content_zh/`（简体中文），无需修改 React 核心组件。两种语言使用相同文件名；缺少中文文件时 PRISM 会回退到英文，所以更新内容时请同步两种语言。

最方便的方式是登录自己的 GitHub，打开本网站仓库中的目标文件，点击铅笔按钮修改，再选择 **Commit changes → Commit directly to the main branch**。提交后查看 **Actions**，等待构建与部署显示绿色成功，再刷新网站。中英文正文建议同步修改后一起提交，也可以使用 GitHub 的网页代码编辑器批量编辑。

不熟悉 Git 时可直接使用上述网页操作。此电脑的本地项目目录为 `D:\Website-mine\yun-yang`；本地 `.git` 保留了原有 PRISM 历史与远程设置，推送前请按部署指南确认目标仓库。

## 1. 文件地图

| 内容 | 英文 | 中文 |
| --- | --- | --- |
| 姓名、单位、链接、导航、SEO | `content/config.toml` | `content_zh/config.toml` |
| 首页模块与研究兴趣 | `content/about.toml` | `content_zh/about.toml` |
| 个人介绍 | `content/bio.md` | `content_zh/bio.md` |
| 首页研究概览 | `content/overview.md` | `content_zh/overview.md` |
| 研究方向与方法 | `content/research.md` | `content_zh/research.md` |
| 新闻 | `content/news.toml` | `content_zh/news.toml` |
| 论文记录（共用） | `content/publications.bib` | 默认读取同一文件 |
| 论文页面文字 | `content/publications.toml` | `content_zh/publications.toml` |
| 学术简历 | `content/cv.md` | `content_zh/cv.md` |
| 简历下载设置 | `content/cv.toml` | `content_zh/cv.toml` |
| 联系页 | `content/contact.md` | `content_zh/contact.md` |

页面 `.toml` 文件设置标题、描述和 Markdown 来源；正文放在对应 `.md` 中。用 UTF-8 编码保存，保留英文半角引号，避免使用中文引号替代 TOML 的定界符。

## 2. 修改个人简介

编辑两份 `bio.md`。支持普通段落、**加粗**、列表和 Markdown 链接。首页研究概览单独放在 `overview.md`，可独立更新，不必重复完整简介。

请区分：

- 当前兴趣：使用 “I am interested in…” 等表达；
- 计划与在研：使用 “My ongoing doctoral research…”、“I aim to…”；
- 已完成成果：仅在有可确认的结果或正式文献信息后填写。

当前没有展示导师、获奖、会议、DOI、语言水平或编程熟练程度。硕士论文按你提供的原题《实数融合与绿色技术创新》展示，英文页面也保留中文原题。正式英文题名确认前不自行翻译为发表论文标题。

## 3. 研究兴趣、方向与方法

首页兴趣位于两份 `about.toml` 的 `[profile].research_interests` 数组中。独立研究页面编辑两份 `research.md`；首页概览编辑两份 `overview.md`。

已列出的方法为 DEA、Productivity Measurement、Econometric Analysis、Panel Data Methods，按方法兴趣与研究计划呈现。将来有明确的已完成研究后，可以添加具体问题、数据范围和可公开的成果链接，但不要将研究目标写成已证实结论。

## 4. 添加一篇真实论文

从 Zotero、期刊官网或自己的文献库导出真实 BibTeX，粘贴到 `content/publications.bib`。当前文件只有注释，不含任何演示论文；不要把说明中的变量当作真实记录。

常用字段：

| 字段 | 用途 |
| --- | --- |
| `author` | 作者，多个作者使用 BibTeX 的 `and` 分隔 |
| `title` | 真实论文题名 |
| `year` | 真实年份，支持年份筛选 |
| `journal` / `booktitle` | 期刊或会议名称 |
| `doi` | DOI 标识符，如 `10.…/…`，不包含 `https://doi.org/` |
| `pdf` | 你有权分享的 PDF 路径或合法外部 URL |
| `selected` | 设为 `{true}` 时进入首页精选论文 |
| `description` | 简短研究说明 |
| `abstract` | 摘要，显示为可展开内容 |
| `preview` | `public/papers/` 中的预览图文件名 |
| `code` | 真实代码仓库 URL（如有） |

保留导出记录中的真实条目类型：`@article` 对应期刊、`@inproceedings` 对应会议、`@unpublished` 对应预印本等。不会凭题名推断发表状态；请只添加你确认适合展示的记录。

有权公开的论文 PDF 放到 `public/papers/`，BibTeX 中写 `pdf = {/papers/文件名.pdf}`。请避免空格和中文文件名以便长期维护。外部合法链接可直接写完整 HTTPS URL。没有 PDF 或 DOI 时省略字段，不会显示无效按钮。

支持标题搜索、按年份/类型筛选、摘要展开、BibTeX 展开及复制、PDF/DOI 链接。只有真实条目设为 `selected = {true}` 后首页才显示 Selected Publications；为空时 Publications 页显示专业空状态并隐藏无意义的搜索/筛选控件。

默认中英共用 BibTeX。若未来需要不同的描述文本，可创建 `content_zh/publications.bib`，但需要自行保持两份真实文献记录一致。中文界面不会自动翻译正式论文题名。

## 5. 添加 News

在两份 `news.toml` 最前面加入一个新块，按最新到最旧手工排列：

```toml
[[news]]
date = "实际月份与年份"
content = "已经发生、可确认的经历。"
```

英文使用如 `October 2026`，中文使用 `2026年10月`。目前仅保留 2026 年 10 月开始博士研究这一条真实动态。

## 6. 更新 CV 与 PDF

编辑两份 `cv.md`，目前包含学术任职、教育、研究兴趣、研究经历与方法兴趣。正式获奖信息提供后，再新增 Honors and Awards / 荣誉与奖励。

将真实 CV PDF 上传到：

```text
public/cv/yun-yang-cv.pdf
```

两份 `cv.toml` 已指向 `/cv/yun-yang-cv.pdf`。**只有文件存在并重新构建后才会显示下载按钮**；删除 PDF 再构建会自动隐藏按钮。若文件名改变，同步修改两种语言的 `download`。英文和中文也可以分别设置不同 PDF。

## 7. 替换头像与研究图片

当前头像为本人提供的证件照，位于 `public/images/avatar.jpg`，中英文页面共用，以圆形头像显示。原始照片保留不变，页面通过样式裁切；YY 占位 SVG 保留作为备用。后续替换建议：

1. 使用竖版 3:4 比例，建议宽度 512px 或更大，保存为 WebP/JPEG；
2. 放到 `public/images/avatar.webp`；
3. 修改英文 `content/config.toml` 的 `[author].avatar` 为 `/images/avatar.webp`；
4. 中文配置默认继承这条路径；
5. 如需返回占位状态，将 `avatar` 设为空字符串。

照片会沿用 PRISM 的 Image 组件与姓名 Alt Text。研究图片整理到 `public/images/research/`；论文预览图放到 `public/papers/`。不要下载无授权照片、论文或出版商图片。

favicon 为 `public/favicon.svg`，使用深绿底 YY 字母。替换时保持文件名即可，无需修改组件。

## 8. 添加联系方式

修改英文 `config.toml` 的 `[social]`：

```toml
email = ""
github = ""
google_scholar = ""
orcid = ""
linkedin = ""
```

填入你自己的真实地址或完整 HTTPS URL；`email` 只填写邮箱地址，不加 `mailto:`。空字符串不会生成社交按钮。姓名、单位、邮箱等会由中文配置自动继承，除非在中文文件中主动覆盖。

个人 GitHub 地址目前按你的要求留空，首页和中英文联系页都不会展示它。网站的 GitHub Pages 部署不需要填写这个社交字段。

联系页正文是 Markdown。如需在 Contact 页展示新链接，请同步编辑两份 `contact.md`，添加相应真实 Markdown 链接并移除“稍后补充”的文字。侧栏链接与联系页正文分别维护，避免遗漏。

`location` 当前为 Dijon, France / 法国·第戎。只有提供真实详细地址后才填写 `location_details` 与 `location_url`；不使用虚构办公室或默认地图网址。

## 9. 语言、主题与 SEO

默认英文由 `i18n.mode = "fixed"`、`fixed_locale = "en"` 控制，用户仍可用右上角按钮切换。语言偏好保存在浏览器 `locale-storage`；主题保存在 `theme-storage`。验收默认语言时，使用新浏览器上下文或清除对应偏好。

`site.title`、`site.description` 是整体 SEO 信息；每个页面的 `.toml` 可设置独立描述。`site.last_updated` 是手动更新时间，请中英文同步更新。

`site.url` 已配置为当前公开站点 `https://yangyun0125-create.github.io`，用于 canonical、Open Graph URL 与 sitemap。迁移至 GitHub Pages 时，GitHub Actions 会自动注入实际 Pages URL 并覆盖此值。更多内容见 [部署指南](DEPLOYMENT.md)。

## 10. 每次发布前

```powershell
npm run typecheck
npm run lint
npm run check:bibtex
npm run build
npm run check:export
npm run preview
```

检查五个页面、中英文切换、深浅主题、手机布局、真实外链及 PDF。子路径构建时为这些命令设置相同的 `BASE_PATH`。

确认后提交源码及锁文件并推送到自己的仓库；已配置的 GitHub Actions 会部署。不要提交 `out/`、`node_modules/`、本地工具目录或任何密钥。
