//показать сообщение об ошибке

const showInputError = (inputElement, formElement, errorMessage, { inputErrorClass, errorClass }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

//скрыть сообщение об ошибке

const hideInputError = (inputElement, formElement, { inputErrorClass, errorClass }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

//проверяем ввод, "валидность"

const isValid = (inputElement, formElement, rest) => {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, formElement, inputElement.validationMessage, rest);
    } else {
        hideInputError(inputElement, formElement, rest);
    }
};

//меняем состояние кнопки

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
};

const disableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
};
  
const enableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, inactiveButtonClass);
      } else {
        enableButton(buttonElement, inactiveButtonClass);
      };
};

//добавляем полям и кнопкам обработчики

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          isValid(inputElement, formElement, rest);
          toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });    
};

//добавляем обработчики формам

const enableValidation = ({ formSelector, ...rest }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, rest);
    });
};

//убираем сообщения об ошибках

const resetErrors = (formElement) => {
    formElement.querySelectorAll('.popup__input').forEach((inputElement) => {
      inputElement.classList.remove('popup__input_type_error');
    });
    formElement.querySelectorAll('.popup__input-error').forEach((errorElement) => {
      errorElement.classList.remove('popup__input-error_active');
      errorElement.textContent = '';
    });
  };

//запускаем функцию валидации

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
  });