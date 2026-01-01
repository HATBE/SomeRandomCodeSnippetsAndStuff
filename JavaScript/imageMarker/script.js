const markable = document.getElementById("markable");
const ctx = markable.getContext("2d");

let image;
let showFrames = true;

let persons = [];

// TODO: DEBUG:
persons.push({
  startX: 185,
  startY: 150,
  offsetX: 100,
  offsetY: 110,
  name: "Hans",
});

const squareDragInfo = {
  isDragging: false,
  startX: -1,
  startY: -1,
};

function createPerson(startX, startY, offsetX, offsetY) {
  //TODO: LS // todo, check if bounds with other person: check what to do then...

  const name = prompt("Enter a Name");

  if (!name || name == "") {
    alert("No name entered");
    return;
  }

  const person = {
    startX,
    startY,
    offsetX,
    offsetY,
    name,
  };

  persons.push(person);

  console.log(person);
}

function createImage() {
  image = new Image();
  image.src = "persons.jpg";
}

function reDraw() {
  ctx.clearRect(0, 0, markable.width, markable.height);
  drawImage();
  if (showFrames) {
    drawPersonFrames();
  }
}

function drawPersonFrames() {
  ctx.lineWidth = 2;
  persons.forEach((person) => {
    ctx.strokeStyle = "black";

    ctx.strokeRect(
      person.startX,
      person.startY,
      person.offsetX,
      person.offsetY
    );

    ctx.font = "15px arial";
    ctx.fillStyle = "white";

    const namelength = Math.round(ctx.measureText(person.name).width);

    ctx.fillRect(
      person.startX,
      person.startY + person.offsetY,
      namelength + 10,
      20
    );
    ctx.fillStyle = "black";
    ctx.fillText(
      person.name,
      person.startX + 5,
      person.startY + person.offsetY + 15
    );
  });
}

function drawImage() {
  ctx.drawImage(image, 0, 0, markable.width, markable.height);
}

function resetSquareDragInfo() {
  squareDragInfo.isDragging = false;
  squareDragInfo.startX = -1;
  squareDragInfo.startY = -1;
}

function mouseDownEvent(e) {
  if (e.button === 2) return;
  const { x, y } = getCanvasXY(e, markable);
  squareDragInfo.isDragging = true;
  squareDragInfo.startX = x;
  squareDragInfo.startY = y;
}

function mouseMoveEvent(e) {
  if (e.button === 2 || !squareDragInfo.isDragging) return;

  const { x, y } = getCanvasXY(e, markable);
  reDraw();

  const { x: rx, y: ry, w, h } = getXYWH(x, y);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(rx, ry, w, h);
  ctx.setLineDash([]);
}

function mouseUpEvent(e) {
  if (e.button === 2) return;
  squareDragInfo.isDragging = false;

  const { x, y } = getCanvasXY(e, markable);
  const { x: rx, y: ry, w, h } = getXYWH(x, y);

  if (w < 25 || h < 25) {
    alert("Square too small");
    reDraw();
    return;
  }

  createPerson(rx, ry, w, h);
  reDraw();
}

function contextMenuEvent(e) {
  e.preventDefault();
  resetSquareDragInfo();
  reDraw();
}

function addEventListeners() {
  markable.addEventListener("mousedown", mouseDownEvent);
  markable.addEventListener("mousemove", mouseMoveEvent);
  markable.addEventListener("mouseup", mouseUpEvent);
  markable.addEventListener("contextmenu", contextMenuEvent);
}

function getXYWH(offsetX, offsetY) {
  const x = Math.min(squareDragInfo.startX, offsetX),
    y = Math.min(squareDragInfo.startY, offsetY),
    w = Math.abs(offsetX - squareDragInfo.startX),
    h = Math.abs(offsetY - squareDragInfo.startY);

  return { x, y, w, h };
}

function createCanvasWithImage() {
  const scale = Math.min(1, 1000 / image.width, 1000 / image.height);

  const scaledWidth = Math.round(image.width * scale);
  const scaledHeight = Math.round(image.height * scale);

  markable.width = scaledWidth;
  markable.height = scaledHeight;

  reDraw();
}

function getCanvasXY(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  return { x, y };
}

function toggleFrames() {
  showFrames = !showFrames;
  reDraw();
}

createImage();
image.onload = () => {
  createCanvasWithImage();
  addEventListeners();
};
