# 嵌入导航栏配置说明

## 配置选项

在 `scripts.js` 文件中，你可以通过修改以下配置来控制嵌入时的导航栏行为：

```javascript
// 配置选项：是否在嵌入时隐藏导航栏
const HIDE_NAV_IN_EMBEDDED = false; // 设置为 true 可以完全隐藏嵌入时的导航栏
```

## 配置说明

### 选项1：向下移动导航栏 (默认)
```javascript
const HIDE_NAV_IN_EMBEDDED = false;
```

**效果：**
- 导航栏会显示在更下方的位置
- 避免与父页面的菜单栏重合
- 保持导航功能完整

**位置调整：**
- 移动端：距离顶部 30-60px
- 桌面端：距离顶部 60-120px
- 根据父页面导航栏高度动态调整

### 选项2：完全隐藏导航栏
```javascript
const HIDE_NAV_IN_EMBEDDED = true;
```

**效果：**
- 在嵌入环境中完全不显示导航栏
- 页面内容直接显示
- 节省空间，避免任何冲突

## 快速切换

### 方法1：修改配置文件
1. 打开 `scripts.js` 文件
2. 找到第 35 行左右的配置选项
3. 修改 `HIDE_NAV_IN_EMBEDDED` 的值
4. 保存文件并刷新页面

### 方法2：通过URL参数控制
你可以在嵌入时通过URL参数来控制：

```html
<!-- 显示导航栏 -->
<iframe src="index.html"></iframe>

<!-- 隐藏导航栏 -->
<iframe src="index.html?hide-nav=true"></iframe>
```

要实现这个功能，需要在 `scripts.js` 中添加：

```javascript
// 检查URL参数
const urlParams = new URLSearchParams(window.location.search);
const hideNavParam = urlParams.get('hide-nav');
const HIDE_NAV_IN_EMBEDDED = hideNavParam === 'true';
```

## 测试效果

### 使用测试页面
1. 打开 `test-embed.html`
2. 观察导航栏的位置变化
3. 尝试不同的配置选项

### 实际嵌入测试
```html
<!-- 测试页面 -->
<iframe src="index.html" width="100%" height="600px"></iframe>
```

## 推荐配置

### 场景1：内容展示页面
```javascript
const HIDE_NAV_IN_EMBEDDED = true; // 隐藏导航栏
```
**适用场景：**
- 产品展示
- 文档嵌入
- 内容阅读

### 场景2：功能完整页面
```javascript
const HIDE_NAV_IN_EMBEDDED = false; // 显示导航栏
```
**适用场景：**
- 完整应用嵌入
- 需要导航功能
- 用户交互较多

## 自定义样式

如果需要进一步自定义嵌入时的样式，可以修改CSS：

```css
/* 嵌入时导航栏的样式 */
.floating-nav.embedded {
  /* 你的自定义样式 */
}

/* 隐藏时的样式 */
.floating-nav.embedded.hidden {
  display: none !important;
}
```

## 注意事项

1. **缓存问题**：修改配置后可能需要清除浏览器缓存
2. **跨域限制**：某些嵌入环境可能有安全限制
3. **响应式设计**：确保在不同设备上都能正常工作
4. **用户体验**：考虑用户是否需要导航功能

## 故障排除

### 配置不生效
1. 检查JavaScript文件是否正确加载
2. 确认配置变量名称正确
3. 清除浏览器缓存

### 样式异常
1. 检查CSS文件是否正确加载
2. 确认浏览器兼容性
3. 查看控制台错误信息

## 联系支持

如果遇到问题，请联系：
- 邮箱: wanghehan@yunhefuture.com
- 微信: hehan4096
