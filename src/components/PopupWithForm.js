import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupSelector.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._popupButton = this._popupForm.querySelector(".popup__submit");
    this._popupButtonTextContent = this._popupButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }

  renederLoad(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = "Сохранение...";
    } else {
      this._popupButton.textContent = this._popupButtonTextContent;
    }
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
