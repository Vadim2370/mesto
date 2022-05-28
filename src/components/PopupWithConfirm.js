import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector(".popup__form");
    this._popupButton = this._popupForm.querySelector(".popup__submit");
    this._popupButtonTextContent = this._popupButton.textContent;
  }

  submitHandle(callback) {
    this._submitHandle = callback;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandle();
    });

    super.setEventListeners();
  }

  renederLoadDelete(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = "Удаление...";
    } else {
      this._popupButton.textContent = this._popupButtonTextContent;
    }
  }
}
