// === 必改：你的服务器地址（HTTPS 已生效时用 wss/https） ===
const SERVER = "https://www.ljlcszy.cn";
const ADMIN_TOKEN = "CHANGE_ME_very_secret";
const REPO_BASE  = "https://kingterljl.github.io/test/images/";

const socket = io(SERVER, {
  transports: ["websocket", "polling"]
});

// 发送“切图命令”给服务器，由服务器广播给展示端
function switchTo(nameOrUrl){
  const payload = {
    token: ADMIN_TOKEN,
    img: nameOrUrl,       // 可是完整URL或简名
    repo_base: REPO_BASE, // 当 img 不是URL时，后端会用它拼接
  };
  socket.emit("switch_image", payload);
  console.log("[control] emit switch_image:", payload);
}

// 可选：收到后端错误
socket.on("error_msg", (e)=> console.warn("[server error]", e));


