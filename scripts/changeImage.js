// ---------------- 可按需要修改的参数 ----------------

// 你的 GitHub Pages 仓库根路径（**末尾保留斜杠**）：
const REPO_BASE = "https://kingterljl.github.io/test/images/";

// 如你把图片放在 images/ 下，可以改成：
// const REPO_BASE = "https://kingterljl.github.io/test/images/";

// （可选）如你已经部署了 Socket.IO 的 HTTPS 服务：
const SOCKET_ENDPOINT = "wss://www.ljlcszy.cn";   // 没有就留空字符串 ""
// const SOCKET_ENDPOINT = ""; // 纯前端（无后端）使用时可设空

// ---------------------------------------------------

// 如果页面有引入 socket.io.min.js 且配置了 SOCKET_ENDPOINT，这里会连上；否则保持 null
let socket = null;
try {
  if (typeof io === "function" && SOCKET_ENDPOINT) {
    socket = io(SOCKET_ENDPOINT, { transports: ["websocket", "polling"] });
  }
} catch (_) { /* 忽略 */ }

/**
 * 切换到指定图片。
 * - 如果 name 是完整 URL（以 http 开头），就直接用；
 * - 否则拼接到 REPO_BASE 后面（用于 GitHub Pages 同仓库图片）。
 */
function switchTo(name) {
  let url = name;
  if (!/^https?:\/\//i.test(name)) {
    url = REPO_BASE + name;
  }

  // 1) 写入 localStorage（展示页刷新也生效）
  localStorage.setItem("csImage", url);

  // 2) 如果连上了 Socket.IO，就把切换广播给展示端（可选）
  if (socket) {
    socket.emit("switch_image", { img: url });
  }

  // 3) 控制台提示
  console.log("[switchTo]", url);
}
