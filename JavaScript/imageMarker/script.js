const markable = document.getElementById("markable");
const ctx = markable.getContext("2d");

let image;

let persons = [];

const squareDragInfo = {
  isDragging: false,
  startX: -1,
  startY: -1,
};

function createPerson(startX, startY, offsetX, offsetY) {
  //TODO: LS
  const person = {
    startX,
    startY,
    offsetX,
    offsetY,
    name: "TESTNAME",
  };

  persons.push(person);
}

function createImage() {
  image = new Image();
  image.src = "persons.jpg";
}

function reDraw() {
  ctx.clearRect(0, 0, markable.width, markable.height);
  drawImage();
  drawPersonFrames();
}

function drawPersonFrames() {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  persons.forEach((person) => {
    ctx.strokeRect(
      person.startX,
      person.startY,
      person.offsetX,
      person.offsetY
    );
  });
}

function drawImage() {
  ctx.drawImage(image, 0, 0, markable.width, markable.height);
}
function mouseDownEvent(e) {
  squareDragInfo.isDragging = true;
  squareDragInfo.startX = e.offsetX;
  squareDragInfo.startY = e.offsetY;
}

function resetSquareDragInfo() {
  squareDragInfo.isDragging = false;
  squareDragInfo.startX = -1;
  squareDragInfo.startY = -1;
}

function mouseMoveEvent(e) {
  if (!squareDragInfo.isDragging) {
    return;
  }

  reDraw();

  const { x, y, w, h } = getXYWH(e.offsetX, e.offsetY);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(x, y, w, h);
  ctx.setLineDash([]);
}

function mouseUpEvent(e) {
  squareDragInfo.isDragging = false;

  const { x, y, w, h } = getXYWH(e.offsetX, e.offsetY);

  createPerson(x, y, w, h);
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

createImage();
image.onload = () => {
  createCanvasWithImage();
  addEventListeners();
};
