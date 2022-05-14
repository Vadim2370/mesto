const profileButton = document.querySelector(".profile__edit");
const cardButton = document.querySelector(".profile__add");
const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-card");
const formProfile = document.querySelector(".popup__form-profile");
const formCard = document.querySelector(".popup__form-card");
const nameInput = formProfile.querySelector(".popup__input_type_name");
const activiteInput = formProfile.querySelector(".popup__input_type_activity");
const templateCard = ".element-template";
const formImage = document.querySelector(".popup-image");

const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export {
  profileButton,
  cardButton,
  popupProfile,
  popupCard,
  formProfile,
  formCard,
  nameInput,
  activiteInput,
  templateCard,
  formImage,
  selectors,
  initialCards,
};
