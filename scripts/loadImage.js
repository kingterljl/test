// 与控制端一致
const SERVER = "https://www.ljlcszy.cn";   // 若无证书，临时 http://
const DEFAULT_IMG = "https://kingterljl.github.io/test/images/cs.jpg";

const imgEl = document.getElementById('mainImg');

// 1) 首次打开，从服务器取当前状态
fetch(`${SERVER}/api/current`, { cache: 'no-store' })
  .then(r=>r.json())
  .then(s=> imgEl.src = s.img || DEFAULT_IMG)
  .catch(()=> imgEl.src = DEFAULT_IMG);

// 2) 监听服务器广播（服务端转发控制端命令）
const socket = io(SERVER, { transports: ['websocket','polling'] });
socket.on("update_image", (s)=>{
  if(s && s.img){ imgEl.src = s.img; }
});
