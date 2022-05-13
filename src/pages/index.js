import './index.css';

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PicturePopup from "../components/PicturePopup.js";
import UserInfo from "../components/UserInfo.js";

import {editProfileButton, addCardButton, popupProfile, popupCard, formProfile, formCard, nameInput, activiteInput, templateCard, formImage, formList, formValidators, selectors, initialCards} from '../utils/constans.js';

function renderCard(item) {      
    const cardElement = new Card(item, templateCard, handleCardClick).createCard();
    return(cardElement);
};

const cardList = new Section({
    items: initialCards.reverse(),
    renderer: (item) => {
      cardList.addItem(renderCard(item));
    },
},
    '.elements__grid'
);

const picturePopup = new PicturePopup(formImage);

function handleCardClick(name, link) {
     picturePopup.open(name, link);
}

const addCard = new PopupWithForm(popupCard, {
    handleFormSubmit: (item) => {
      cardList.addItem(renderCard(item));
    }
})

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    activitySelector: '.profile__activity',
});

const openProfilePopup = () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    activiteInput.value = userData.activity;
    profilePopup.open();
}

const profilePopup = new PopupWithForm(popupProfile, {
    handleFormSubmit: (userData) => {
      userInfo.setUserInfo(userData)
  }
});

editProfileButton.addEventListener('click', () => {
    formValidators[formProfile.id].resetValidation();
    openProfilePopup();
})

addCardButton.addEventListener('click', () => {
    formValidators[formCard.id].resetValidation();
    addCard.open();
});

picturePopup.setEventListeners();
addCard.setEventListeners();
profilePopup.setEventListeners();
cardList.renderItems();

const enableValidation = (selectors) => {
formList.forEach((formElement) => {
    const validator = new FormValidator(selectors, formElement);
    formValidators[formElement.id] = validator;
    validator.enableValidation();
});
};

enableValidation(selectors);