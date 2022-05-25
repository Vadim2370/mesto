const profileButton = document.querySelector(".profile__edit");
const cardButton = document.querySelector(".profile__add");
const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-card");
const formProfile = document.querySelector(".popup__form-profile");
const formCard = document.querySelector(".popup__form-card");
const formConfirm = document.querySelector(".popup__form-confirm");
const nameInput = formProfile.querySelector(".popup__input_type_name");
const activiteInput = formProfile.querySelector(".popup__input_type_about");
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

export {
  profileButton,
  cardButton,
  popupProfile,
  popupCard,
  formProfile,
  formCard,
  formConfirm,
  nameInput,
  activiteInput,
  templateCard,
  formImage,
  selectors,
};
