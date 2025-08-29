(() => {
  const SERVER      = "https://www.ljlcszy.cn";                            // 你的域名
  const ADMIN_TOKEN = "CHANGE_ME_very_secret";                              // 与 app.py 完全一致
  const REPO_BASE   = "https://kingterljl.github.io/test/images/";         // 注意末尾一定有 /

  // 如果 Nginx 用了 /wsio/（我给你的配置就是），path 必须写 "/wsio/"
  // transports 同时开 websocket 和 polling，更耐网络环境
  const socket = io(SERVER, { path: "/wsio/", transports: ["websocket","polling"] });

  socket.on("connect",       () => console.log("[control] socket connected"));
  socket.on("connect_error", e  => console.warn("[control] connect_error", e));
  socket.on("error_msg",     e  => console.warn("[server error]", e));

  window.switchTo = function(nameOrUrl){
    if (!nameOrUrl) return;
    const payload = { token: ADMIN_TOKEN, img: nameOrUrl, repo_base: REPO_BASE };
    console.log("[control] emit switch_image:", payload);
    socket.emit("switch_image", payload);
  };
})();
