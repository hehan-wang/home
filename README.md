# 问问API 官方网站

这是问问API的官方网站，使用纯HTML和CSS构建。

## 部署说明

### Netlify 部署

1. 在 [Netlify](https://www.netlify.com/) 上注册账号
2. 点击 "New site from Git"
3. 选择你的代码仓库
4. 配置部署设置：
   - Build command: `echo 'No build command needed'`
   - Publish directory: `.`
5. 点击 "Deploy site"

### 自定义域名设置

1. 在 Netlify 控制面板中，进入 "Domain settings"
2. 点击 "Add custom domain"
3. 输入你的域名
4. 按照提示配置 DNS 记录

## 本地开发

直接在浏览器中打开 `index.html` 文件即可预览网站。

## 文件结构

- `index.html` - 主页面
- `styles.css` - 样式文件
- `netlify.toml` - Netlify 配置文件 