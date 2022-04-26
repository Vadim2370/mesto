export class FormValidator {
    constructor(selectors, formElement) {
        this._selectors = selectors;
        this._formElement = formElement;
        this._buttonElement = formElement.querySelector(selectors.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    }


//показать сообщение об ошибке

_showInputError(inputElement, formElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.classList.add(this._selectors.errorClass);
    errorElement.textContent = errorMessage;
};

//скрыть сообщение об ошибке

_hideInputError(inputElement, formElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = '';
};

//проверяем ввод, "валидность"

_isValid (inputElement, formElement, rest) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, formElement, inputElement.validationMessage, rest);
    } else {
        this._hideInputError(inputElement, formElement, rest);
    }
};

//меняем состояние кнопки

_hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
};

disableButton(buttonElement, inactiveButtonClass) {
    this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
};
  
_enableButton(buttonElement, inactiveButtonClass) {
    this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
};

_toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(this._inputList)) {
        this.disableButton(this._buttonElement, this._selectors.inactiveButtonClass);
      } else {
        this._enableButton(this._buttonElement, this._selectors.inactiveButtonClass);
      };
};

//добавляем полям и кнопкам обработчики

_setEventListeners() {
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._isValid(inputElement);
            this._toggleButtonState(this._inputList);
        });
    });    
};

//добавляем обработчики формам

enableValidation() {
    this._setEventListeners();
};

//убираем сообщения об ошибках

resetValidation() {
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    };
};
