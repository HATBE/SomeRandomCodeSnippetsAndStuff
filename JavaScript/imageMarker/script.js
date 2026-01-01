const markable = document.getElementById("markable");
const ctx = markable.getContext("2d");

const image = new Image();
image.src = "persons.jpg";

let imageWidth = 0;
let imageHeight = 0;

let isDragging = false;
let startX = 0;
let startY = 0;

image.onload = () => {
  const maxSize = 1000;

  imageWidth = image.width;
  imageHeight = image.height;

  const scale = Math.min(1, maxSize / imageWidth, maxSize / imageHeight);

  const scaledWidth = Math.round(imageWidth * scale);
  const scaledHeight = Math.round(imageHeight * scale);

  markable.width = scaledWidth;
  markable.height = scaledHeight;

  ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

  markable.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.offsetX;
    startY = e.offsetY;
  });

  markable.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const currentX = e.offsetX;
    const currentY = e.offsetY;

    ctx.clearRect(0, 0, markable.width, markable.height);
    ctx.drawImage(image, 0, 0, markable.width, markable.height);

    const x = Math.min(startX, currentX);
    const y = Math.min(startY, currentY);
    const w = Math.abs(currentX - startX);
    const h = Math.abs(currentY - startY);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(x, y, w, h);
    ctx.setLineDash([]);
  });

  markable.addEventListener("mouseup", (e) => {
    isDragging = false;

    const endX = e.offsetX;
    const endY = e.offsetY;

    ctx.clearRect(0, 0, markable.width, markable.height);
    ctx.drawImage(image, 0, 0, markable.width, markable.height);

    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const w = Math.abs(endX - startX);
    const h = Math.abs(endY - startY);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeRect(x, y, w, h);
  });
};

function createPersonFrame(x1, y1, x2, y2) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;

  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);
  const w = Math.abs(x2 - x1);
  const h = Math.abs(y2 - y1);

  ctx.strokeRect(left, top, w, h);
}

function sendPercentage(x, y, width, height) {
  const clickXPercent = Math.floor((x / width) * 100);
  const clickYPercent = Math.floor((y / height) * 100);

  console.log(clickXPercent, clickYPercent);
}
