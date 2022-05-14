export default class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(
      selectors.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._selectors.inputSelector)
    );
  }

  //показать сообщение об ошибке

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.classList.add(this._selectors.errorClass);
    errorElement.textContent = errorMessage;
  }

  //скрыть сообщение об ошибке

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = "";
  }

  //проверяем ввод, "валидность"

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //меняем состояние кнопки

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableButton() {
    this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }

  //добавляем полям и кнопкам обработчики

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //добавляем обработчики формам

  enableValidation() {
    this._setEventListeners();
  }

  //убираем сообщения об ошибках

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
