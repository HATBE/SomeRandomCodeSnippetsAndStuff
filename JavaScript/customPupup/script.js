function openPopup(id) {}

function openPopup(bodyText) {
  const popup = document.createElement("div");
  popup.classList.add("popup");

  popup.textContent = bodyText;

  removeAllPopups();
  document.body.appendChild(popup);
}

function removeAllPopups() {
  popups = document.querySelectorAll(".popup");

  popups.forEach((popup) => {
    popup.remove();
  });
}
