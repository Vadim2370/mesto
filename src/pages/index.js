import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PicturePopup from "../components/PicturePopup.js";
import UserInfo from "../components/UserInfo.js";

import {
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
} from "../utils/constans.js";

function renderCard(item) {
  const cardElement = new Card(
    item,
    templateCard,
    handleCardClick
  ).createCard();
  return cardElement;
}

const cardList = new Section(
  {
    items: initialCards.reverse(),
    renderer: (item) => {
      cardList.addItem(renderCard(item));
    },
  },
  ".elements__grid"
);

const picturePopup = new PicturePopup(formImage);

function handleCardClick(name, link) {
  picturePopup.open(name, link);
}

const cardAdd = new PopupWithForm(popupCard, {
  handleFormSubmit: (item) => {
    cardList.addItem(renderCard(item));
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  activitySelector: ".profile__activity",
});

const openProfilePopup = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  activiteInput.value = userData.activity;
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

picturePopup.setEventListeners();
cardAdd.setEventListeners();
profilePopup.setEventListeners();
cardList.renderItems();
