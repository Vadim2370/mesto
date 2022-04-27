import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js";

const popups = document.querySelectorAll('.popup');
const editProfileButton = document.querySelector('.profile__edit');
const addCardButton = document.querySelector('.profile__add');
const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');
const formProfile = document.querySelector('.popup__form-profile');
const formCard = document.querySelector('.popup__form-card');
const saveButtonCard = formCard.querySelector('.popup__submit-card');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const activiteInput = formProfile.querySelector('.popup__input_type_activity');
const cardContainer = document.querySelector('.elements__grid');
const templateCard = '.element-template';
const cardName = formCard.querySelector('.popup__input_type_card-name');
const cardLink = formCard.querySelector('.popup__input_type_card-link');
const cardGrid = document.querySelector('.elements__grid');
const formImage = document.querySelector('.popup-image');
const imageLarge = formImage.querySelector('.popup__image');
const imageName = formImage.querySelector('.popup__image-caption');
const formList = Array.from(document.querySelectorAll('.popup__form'));
const formValidators = {};

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

//открытие попап

function openPopup(popup) {           
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

//закрытие попап сбрасываем сообщения об ошибках валидации

function closePopup(popup) {           
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
    formValidators[formCard.name].resetValidation();
    formValidators[formProfile.name].resetValidation();
};

//закрываем попап esc

function closePopupEsc(evt) {         
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};

//закрываем попап по оверлею

popups.forEach(element => element.addEventListener('click', function (evt) {   
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
      closePopup(evt.currentTarget);
  }
}));

//открываем форму профиля кнопкой Edit

function openProfile() {   
    nameInput.value = profileName.textContent;    //заполняем поля данными со страницы
    activiteInput.value = profileActivity.textContent;
    openPopup(popupProfile);
};

//сохраняем данные из полей формы на страницу и закрываем форму кнопкой Сохранить

function saveFormProfile(evt) {    
    evt.preventDefault();       //отменяем отправку формы и перезагрузку страницы
    profileName.textContent = nameInput.value;
    profileActivity.textContent = activiteInput.value;
    closePopup(popupProfile);
};

//открываем форму добавления карточки очищаем поля формы отключаем кнопку

function addCard() {      
    formCard.reset();
    formValidators[formCard.name].disableButton();
    openPopup(popupCard);
};

//увеличиваем картинку карточки

function handleCardClick(name, link) {
    imageName.textContent = name;
    imageLarge.src = link;
    imageLarge.alt = name;
    openPopup(formImage);
};

//собираем новую карточку

function renderCard(item) {      
    const cardElement = new Card(item, templateCard, handleCardClick).createCard();
    return(cardElement);
};

//добавляем новую карточку на страницу

function addNewCard(item) {
    cardContainer.prepend(renderCard(item));
}

//сохраняем карточку

function createSubmitCard(evt) {   
    evt.preventDefault();
    const data = {
      name: cardName.value,
      link: cardLink.value,
    };
    addNewCard(data);
    closePopup(popupCard);
};

//начальный набор карточек

initialCards.reverse().forEach((item) => {    
    addNewCard(item);
});

//включение валидации

const enableValidation = (selectors) => {
formList.forEach((formElement) => {
    const validator = new FormValidator(selectors, formElement);
    formValidators[formElement.name] = validator;
    validator.enableValidation();
});
};

enableValidation(selectors);

editProfileButton.addEventListener('click', openProfile);
addCardButton.addEventListener('click', addCard);
formProfile.addEventListener('submit', saveFormProfile);
formCard.addEventListener('submit', createSubmitCard);