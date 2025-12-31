window.popups = {
  popup1: {
    title: "Popup 1",
    text: "Hallo Welt",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui nemo neque eveniet ad explicabo consequatur, quisquam magni, soluta quasi perferendis id quibusdam vel iusto, nulla vitae quae. Placeat, voluptatibus aperiam.",
    buttons: [
      {
        text: "hey",
        func: () => {
          alert("test");
        },
      },
    ],
  },
  popup2: {
    title: "Popup 2",
    text: "Hallo Welt 2",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui nemo neque eveniet ad explicabo consequatur, quisquam magni, soluta quasi perferendis id quibusdam vel iusto, nulla vitae quae. Placeat, voluptatibus aperiam.",
    buttons: null,
  },
};
