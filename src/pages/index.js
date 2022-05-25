import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
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
} from "../utils/constans.js";
import { ids } from "webpack";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "f3c649e7-6f2a-4944-a10d-90e02594a0a0",
    "Content-type": "application/json",
  },
});

Promise.all([api.getProfile(), api.getCards()])
  .then(([userData, initialCards]) => {
    userInfo.getUserInfo(userData);
    userInfo.setUserInfo(userData);
    const userId = userData._id;
    cardList.renderItems(initialCards.reverse());
    console.log(userId);
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(renderCard(item));
    },
  },
  ".elements__grid"
);

function renderCard(data, userId) {
  const cardElement = new Card(
    data,
    userId,
    templateCard,
    handleCardClick
  ).createCard();
  //console.log(data);
  return cardElement;
}

// function renderCard(data) {
//   const cardElement = new Card({
//     data: data,
//     userId: userData._id,
//     handleCardClick,
//     handlDeliteClick: (id) => {
//       popupWithConfirmation.submitDelete(() => {
//         api.deleteCard(id).then(() => {});
//       });
//     },
//   });
// }

// const popupWithConfirmation = new PopupWithConfirmation(formConfirm);

// popupWithConfirmation.setEventListeners();

const imagePopup = new PopupWithImage(formImage);

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

const cardAdd = new PopupWithForm(popupCard, {
  handleFormSubmit: (item) => {
    cardList.addItem(renderCard(item));
  },
});

const openProfilePopup = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  activiteInput.value = userData.about;
  profilePopup.open();
};

const profilePopup = new PopupWithForm(popupProfile, {
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData);
  },
});

const profileValidator = new FormValidator(selectors, formProfile);
profileValidator.enableValidation();

profileButton.addEventListener("click", () => {
  profileValidator.resetValidation();
  openProfilePopup();
});

const cardValidator = new FormValidator(selectors, formCard);
cardValidator.enableValidation();

cardButton.addEventListener("click", () => {
  cardValidator.resetValidation();
  cardAdd.open();
});

imagePopup.setEventListeners();
cardAdd.setEventListeners();
profilePopup.setEventListeners();
// cardList.renderItems();
