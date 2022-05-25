import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = document.querySelector(".popup__image");
    this.caption = document.querySelector(".popup__image-caption");
  }

  open(name, link) {
    this.image.src = link;
    this.image.alt = name;
    this.caption.textContent = name;
    super.open();
  }
}
