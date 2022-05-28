const profileButton = document.querySelector(".profile__edit");
const cardButton = document.querySelector(".profile__add");
const avatarButton = document.querySelector(".profile__avatar-edit");
const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-card");
const popupAvatar = document.querySelector(".popup-avatar");
const popupConfirm = document.querySelector(".popup-confirm");
const formProfile = document.querySelector(".popup__form-profile");
const formCard = document.querySelector(".popup__form-card");
const formAvatar = document.querySelector(".popup__form-avatar");
const nameInput = formProfile.querySelector(".popup__input_type_name");
const activiteInput = formProfile.querySelector(".popup__input_type_about");
const cardSelector = ".element-template";
const formImage = document.querySelector(".popup-image");
const nameProfile = document.querySelector(".profile__name");
const aboutProfile = document.querySelector(".profile__about");
const avatarProfile = document.querySelector(".profile__avatar");

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
  avatarButton,
  popupProfile,
  popupCard,
  popupAvatar,
  popupConfirm,
  formProfile,
  formCard,
  formAvatar,
  nameInput,
  activiteInput,
  cardSelector,
  formImage,
  selectors,
  nameProfile,
  aboutProfile,
  avatarProfile,
};
