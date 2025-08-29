// 默认图片（当 localStorage 里没值时使用）
const DEFAULT_IMG = "https://kingterljl.github.io/test/images/cs.jpg";

// （可选）Socket.IO 服务地址（和控制页保持一致即可）
const SOCKET_ENDPOINT = "wss://www.ljlcszy.cn";   // 没有就留空字符串 ""
// const SOCKET_ENDPOINT = "";

function setImage(src) {
  const img = document.getElementById("mainImg");
  if (img) img.src = src;
}

// 首次加载：从 localStorage 读取
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("csImage");
  setImage(saved || DEFAULT_IMG);

  // 如果有后端 Socket.IO，就订阅实时事件
  try {
    if (typeof io === "function" && SOCKET_ENDPOINT) {
      const socket = io(SOCKET_ENDPOINT, { transports: ["websocket", "polling"] });
      socket.on("switch_image", (payload) => {
        if (payload && payload.img) {
          localStorage.setItem("csImage", payload.img);
          setImage(payload.img);
          console.log("[switch_image] ->", payload.img);
        }
      });
    }
  } catch (_) { /* 忽略 */ }
});
