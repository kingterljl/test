const SERVER = "https://www.ljlcszy.cn";
const DEFAULT_IMG = "https://kingterljl.github.io/test/images/cs.jpg";
const imgEl = document.getElementById('mainImg');

fetch(`${SERVER}/api/current`, { cache: 'no-store' })
  .then(r => r.json())
  .then(s => { imgEl.src = (s && s.img) || DEFAULT_IMG; })
  .catch(() => { imgEl.src = DEFAULT_IMG; });

const socket = io(SERVER, { path: "/wsio/", transports: ["websocket","polling"] });
socket.on("connect", ()=>console.log("[display] socket connected"));
socket.on("update_image", (s) => {
  console.log("[display] update_image", s);
  if (s && s.img) imgEl.src = s.img;
});
