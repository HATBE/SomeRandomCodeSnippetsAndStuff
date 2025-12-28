const main = document.getElementById("main");

let switchedOn = false;
const menuItems = [
  {
    name: "Button 1",
    func: () => {
      alert("clciked Button 1");
    },
  },
  {
    name: "Button 2",
    func: () => {
      alert("clciked Button 2");
    },
  },
  {
    name: "Button 3",
    func: () => {
      alert("clciked Button 3");
    },
  },
  {
    name: "Button 4",
    func: () => {
      alert("clciked Button 4");
    },
  },
];

if (!main) {
  alert("ERROR NO MAIN");
}

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  spawnContext(e.clientX, e.clientY);
});

document.addEventListener("click", (e) => {
  console.log(switchedOn);
  if (switchedOn) {
    removeContext();
  }
});

function spawnContext(x, y) {
  removeContext();

  switchedOn = true;

  const menu = document.createElement("div");
  menu.id = "MENU";
  menu.classList.add("menu");
  menu.style.position = "absolute";
  menu.style.top = y + "px";
  menu.style.left = x + "px";

  menuItems.forEach((item) => {
    menu.appendChild(addButton(item.name, item.func));
  });

  main.appendChild(menu);
}

function addButton(text, func) {
  const button = document.createElement("button");
  button.classList.add("button");
  button.textContent = text;

  button.addEventListener("click", () => {
    func();
    removeContext();
  });

  return button;
}

function removeContext() {
  const menu = document.getElementById("MENU");
  if (menu) {
    switchedOn = false;
    menu.remove();
  }
}
