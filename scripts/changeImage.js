function changeImage() {
  // 从 localStorage 获取当前状态
  const current = localStorage.getItem("csImage");

  // 决定下一张图片
  let newImgPath;
  if (current === "../images/cs2.jpg") {
    newImgPath = "../images/cs.jpg"; // 如果现在是 cs2，就切回 cs
  } else {
    newImgPath = "../images/cs2.jpg"; // 其他情况就切到 cs2
  }

  // 保存新路径
  localStorage.setItem("csImage", newImgPath);

  // 跳转到 cs.html
  window.location.href = "cs.html";
}
const socket = io();

function switchTo(img) {
  // 给服务器发送切换命令
  socket.emit("switch_image", { img });
}
