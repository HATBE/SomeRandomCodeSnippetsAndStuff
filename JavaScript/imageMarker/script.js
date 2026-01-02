const markable = document.getElementById("markable");
const toggleBtn = document.getElementById("toggleBtn");
const personslistEl = document.getElementById("persons-list");
const ctx = markable.getContext("2d");

let image;
let showFrames = true;

const databaseUsers = [
  {
    id: 1,
    name: "Alexandra",
    username: "alex123",
  },
  {
    id: 2,
    name: "Peter",
    username: "Peter188",
  },
  {
    id: 3,
    name: "Claudia",
    username: "CTester1",
  },
  {
    id: 3,
    name: "Hanspeter",
    username: "Hanspeter12",
  },
];

const markedPersons = [];

const squareDragInfo = {
  isDragging: false,
  startX: -1,
  startY: -1,
};

function promptPerson() {
  const name = prompt("Enter a Name");

  if (name === null) {
    return;
  } else if (name === "") {
    alert("No name entered");
    return;
  }

  if (
    !databaseUsers.some((u) => u.username.toLowerCase() === name.toLowerCase())
  ) {
    alert("No Matching User");
    return;
  }

  return databaseUsers.find(
    (u) => u.username.toLowerCase() === name.toLowerCase()
  );
}

function createPerson(startX, startY, offsetX, offsetY) {
  const person = promptPerson();
  if (!person) return;

  const markedPerson = {
    startX,
    startY,
    offsetX,
    offsetY,
    person,
    highlighted: false,
  };

  markedPersons.push(markedPerson);
}

function createImage() {
  image = new Image();
  image.src = "persons.jpg";
}

function redrawCanvas() {
  ctx.clearRect(0, 0, markable.width, markable.height);
  drawImage();
  if (showFrames) drawPersonFrames();
}

function reDraw() {
  redrawCanvas();
  drawPersonsInList();
}

function drawPersonLabel(name, highlighted, startX, startY) {
  ctx.font = "15px arial";
  if (highlighted) {
    ctx.fillStyle = "gold";
  } else {
    ctx.fillStyle = "black";
  }
  const namelength = Math.round(ctx.measureText(name).width);

  ctx.fillRect(startX - 1, startY, namelength + 10, 20);

  if (highlighted) {
    ctx.fillStyle = "black";
  } else {
    ctx.fillStyle = "white";
  }
  ctx.fillText(name, startX + 5, startY + 15);
}

function drawPersonFrame(
  startX,
  startY,
  offsetX,
  offsetY,
  highlighted = false
) {
  ctx.lineWidth = 2;
  if (highlighted) {
    ctx.strokeStyle = "gold";
  } else {
    ctx.strokeStyle = "black";
  }

  ctx.strokeRect(startX, startY, offsetX, offsetY);
}

function drawPersonFrames() {
  markedPersons.forEach((markedPerson) => {
    drawPersonFrame(
      markedPerson.startX,
      markedPerson.startY,
      markedPerson.offsetX,
      markedPerson.offsetY,
      markedPerson.highlighted
    );
    drawPersonLabel(
      markedPerson.person.name,
      markedPerson.highlighted,
      markedPerson.startX,
      markedPerson.startY + markedPerson.offsetY
    );
  });
}

function drawImage() {
  ctx.drawImage(image, 0, 0, markable.width, markable.height);
}

function drawPersonsInList() {
  personslistEl.innerHTML = "";

  markedPersons.forEach((markedPerson, index) => {
    const personItemEl = document.createElement("li");
    personItemEl.textContent = markedPerson.person.name;

    personItemEl.addEventListener("mouseenter", () => {
      markedPerson.highlighted = true;
      redrawCanvas();
    });

    personItemEl.addEventListener("mouseleave", () => {
      markedPerson.highlighted = false;
      redrawCanvas();
    });

    personItemEl.addEventListener("click", () => {
      if (confirm(`Do you realy want to delete ${markedPerson.person.name}`)) {
        markedPersons.splice(index, 1);
        reDraw();
      }
    });

    personslistEl.appendChild(personItemEl);
  });
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
  toggleBtn.addEventListener("click", toggleShowFrames);
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

function toggleShowFrames() {
  showFrames = !showFrames;
  toggleBtn.textContent = showFrames ? "Disable Frames" : "Enable Frames";
  reDraw();
}

createImage();
image.onload = () => {
  createCanvasWithImage();
  addEventListeners();
};
