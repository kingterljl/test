// scripts/changeImage.js
(() => {
  // 你的后端域名
  const SERVER      = "https://www.ljlcszy.cn";
  // 必须与 app.py 的 ADMIN_TOKEN 完全一致
  const ADMIN_TOKEN = "CHANGE_ME_very_secret";
  // 你的 GitHub Pages 图片目录，注意末尾一定带 '/'
  const REPO_BASE   = "https://kingterljl.github.io/test/images/";

  // 如果你按我之前建议用了别名路径 /wsio/，就保留 path 这一行；
  // 如果还是默认 /socket.io/，把 path 这一行删掉即可。
  const socket = io(SERVER, {
    path: "/wsio/",
    transports: ["websocket", "polling"]
  });

  socket.on("connect",       () => console.log("[control] socket connected"));
  socket.on("connect_error", e  => console.warn("[control] connect_error", e));
  socket.on("error_msg",     e  => console.warn("[server error]", e));

  // 暴露给 HTML 的按钮调用
  window.switchTo = function(nameOrUrl){
    if (!nameOrUrl) return;
    const payload = { token: ADMIN_TOKEN, img: nameOrUrl, repo_base: REPO_BASE };
    console.log("[control] emit switch_image:", payload);
    socket.emit("switch_image", payload);
  };
})();
