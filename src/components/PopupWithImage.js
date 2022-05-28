import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = document.querySelector(".popup__image");
    this.caption = document.querySelector(".popup__image-caption");
  }

  open(item) {
    this.image.src = item.link;
    this.image.alt = item.name;
    this.caption.textContent = item.name;
    super.open();
  }
}
