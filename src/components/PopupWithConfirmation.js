import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector(".popup__form");
  }

  submitDelete(item) {
    this._handleFormSubmit = item;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
    });

    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
