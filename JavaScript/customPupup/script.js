class Popup {
  constructor(input) {
    const popupEl = this.#createPopup();

    popupEl.appendChild(this.#createHeader(input.title));
    popupEl.appendChild(this.#createBody(input.text));
    popupEl.appendChild(this.#createFooter(input.buttons));

    this.#removeAllPopups();
    document.body.appendChild(popupEl);
  }

  #createPopup() {
    const popupEl = document.createElement("div");
    popupEl.classList.add("popup");

    return popupEl;
  }

  #createHeader(title) {
    const headerEl = document.createElement("div");
    headerEl.classList.add("header");

    const titleEl = document.createElement("h1");
    titleEl.textContent = title;

    const closeEl = document.createElement("button");
    closeEl.textContent = "X";
    closeEl.addEventListener("click", () => this.#removeAllPopups());

    headerEl.appendChild(titleEl);
    headerEl.appendChild(closeEl);

    return headerEl;
  }

  #createBody(text) {
    const bodyEl = document.createElement("div");
    bodyEl.classList.add("body");

    bodyEl.textContent = text;

    return bodyEl;
  }

  #createFooter(buttons) {
    const footerEl = document.createElement("div");
    footerEl.classList.add("footer");

    if (buttons) {
      buttons.forEach((button) => {
        const buttonEl = document.createElement("button");
        buttonEl.textContent = button.text;

        buttonEl.addEventListener("click", () => button.func());

        footerEl.appendChild(buttonEl);
      });
    }

    return footerEl;
  }

  #removeAllPopups() {
    const popupEls = document.querySelectorAll(".popup");
    popupEls.forEach((el) => el.remove());
  }
}

function openPopup(popup) {
  new Popup(popup);
}
