// loadImage.js
document.addEventListener("DOMContentLoaded", function () {
  const newSrc = localStorage.getItem("csImage");
  if (newSrc) {
    const img = document.getElementById("mainImg");
    if (img) {
      img.src = newSrc;
    }
  }
});
const socket = io();

socket.on("update_image", (data) => {
  if (data?.img) {
    document.getElementById("mainImg").src = data.img;
    // 可选：保存到 localStorage，刷新时保持
    localStorage.setItem("csImage", data.img);
  }
});

// 页面载入时，从 localStorage 恢复
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("csImage");
  if (saved) {
    document.getElementById("mainImg").src = saved;
  }
});
