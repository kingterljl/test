const SERVER      = "https://www.ljlcszy.cn";
const ADMIN_TOKEN = "CHANGE_ME_very_secret";                 // 与 app.py 完全一致
const REPO_BASE   = "https://kingterljl.github.io/test/images/"; // 末尾一定有 /

const socket = io(SERVER, { path: "/wsio/", transports: ["websocket","polling"] });

window.switchTo = function(nameOrUrl){
  const payload = { token: ADMIN_TOKEN, img: nameOrUrl, repo_base: REPO_BASE };
  console.log("[control] emit switch_image:", payload);
  socket.emit("switch_image", payload);
};

socket.on("error_msg", e => console.warn("[server error]", e)); // 如果口令不对会看到 forbidden
