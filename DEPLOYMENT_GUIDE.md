# CI/CD 部署配置说明

## GitHub Secrets 配置

为了安全地存储SSH连接信息，你需要在GitHub仓库中配置以下Secrets：

### 设置步骤：

1. 进入你的GitHub仓库
2. 点击 `Settings` > `Secrets and variables` > `Actions`
3. 添加以下Repository secrets：

#### 必需的Secrets：

| Secret Name | 描述 | 示例值 |
|-------------|------|--------|
| `SERVER_HOST` | 服务器IP地址或域名 | `192.168.1.100` 或 `your-server.com` |
| `SERVER_USER` | SSH用户名 | `root` 或 `ubuntu` |
| `SERVER_SSH_KEY` | SSH私钥内容 | 完整的私钥文件内容 |
| `SERVER_SSH_PORT` | SSH端口 (可选，默认22) | `22` 或 `2222` |

### SSH密钥生成和配置：

1. **在本地生成SSH密钥对**：
   ```bash
   ssh-keygen -t rsa -b 4096 -C "github-actions@your-domain.com" -f ~/.ssh/github_actions_key
   ```

2. **将公钥添加到服务器**：
   ```bash
   # 复制公钥到服务器
   ssh-copy-id -i ~/.ssh/github_actions_key.pub your_user@your_server
   
   # 或者手动添加到服务器的 ~/.ssh/authorized_keys
   cat ~/.ssh/github_actions_key.pub | ssh your_user@your_server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
   ```

3. **获取私钥内容**：
   ```bash
   cat ~/.ssh/github_actions_key
   ```
   复制全部内容（包括 `-----BEGIN OPENSSH PRIVATE KEY-----` 和 `-----END OPENSSH PRIVATE KEY-----`）

4. **在GitHub中添加SECRET_SSH_KEY**：
   - 将步骤3中的私钥内容完整粘贴到 `SERVER_SSH_KEY` secret中

## 工作流说明

### 1. 自动部署 (deploy.yml)
- **触发条件**：push到main分支或手动触发
- **功能**：
  - 自动备份当前网站文件
  - 部署新代码到 `/var/www/keyhome`
  - 更新nginx配置
  - 验证部署是否成功
  - 自动清理旧备份（保留最近10个）

### 2. 回滚部署 (rollback.yml)
- **触发条件**：手动触发
- **功能**：
  - 可选择特定备份版本回滚
  - 如果不指定，自动回滚到最新备份
  - 回滚前会备份当前状态
  - 验证回滚是否成功

### 使用回滚功能：
1. 进入GitHub仓库的Actions页面
2. 选择 "Rollback Deployment" 工作流
3. 点击 "Run workflow"
4. 可选：输入要回滚的备份时间戳（格式：YYYYMMDD_HHMMSS）
5. 点击 "Run workflow" 执行

## 安全注意事项

1. **SSH密钥安全**：
   - 为CI/CD专门生成独立的SSH密钥对
   - 不要使用你的个人SSH密钥
   - 定期轮换SSH密钥

2. **服务器权限**：
   - 确保SSH用户有足够权限操作目标目录
   - 建议使用sudo权限而不是直接root用户

3. **备份安全**：
   - 备份文件存储在 `/var/backups/keyhome/`
   - 定期检查备份文件的完整性
   - 考虑将备份同步到其他位置

## 目录结构

```
/var/www/keyhome/          # 网站文件目录
/var/backups/keyhome/      # 备份目录
├── 20240815_143022/       # 备份文件夹（时间戳格式）
├── 20240815_151534/
└── before_rollback_xxx/   # 回滚前的备份
```

## 故障排除

1. **部署失败**：检查SSH连接和服务器权限
2. **nginx配置错误**：检查nginx配置语法
3. **权限问题**：确保目标目录可写
4. **回滚失败**：检查备份目录是否存在

## 监控建议

1. 设置GitHub Actions邮件通知
2. 在服务器上设置日志监控
3. 定期检查备份文件完整性
4. 监控网站可用性