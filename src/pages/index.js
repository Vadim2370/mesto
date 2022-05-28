import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
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
} from "../utils/constans.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "f3c649e7-6f2a-4944-a10d-90e02594a0a0",
    "Content-type": "application/json",
  },
});

let userId;

api
  .getData()
  .then(([initialCards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({
  nameSelector: nameProfile,
  aboutSelector: aboutProfile,
  avatarSelector: avatarProfile,
});

function renderCard(data) {
  const card = new Card(
    {
      data: data,
      handleCardClick: () => popupWithImage.open(data),
      handleLikeClick: () => card.handlCardLike(),
      handleDeleteClick: () => {
        popupWithConfirm.submitHandle(() => {
          popupWithConfirm.renederLoadDelete(true);
          api
            .removeCard(data._id)
            .then(() => {
              card.deleteCard();
              popupWithConfirm.close();
            })
            .catch((err) => console.log(err))
            .finally(() => popupWithConfirm.renederLoadDelete(false));
        });
        popupWithConfirm.open();
      },
    },
    cardSelector,
    api,
    userId
  );
  return card;
}

const cardList = new Section(
  {
    renderer: (item) => {
      const card = renderCard(item);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  ".elements__grid"
);

const cardEdit = new PopupWithForm(popupCard, (values) => {
  cardEdit.renederLoad(true);
  api
    .addCard(values)
    .then((data) => {
      const card = renderCard(data);
      cardList.addItem(card.createCard());
      cardEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => cardEdit.renederLoad(false));
});

const openProfileEdit = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  activiteInput.value = userData.about;
  profileEdit.open();
};

const profileEdit = new PopupWithForm(popupProfile, (values) => {
  profileEdit.renederLoad(true);
  api
    .editProfile(values)
    .then((data) => {
      userInfo.setUserInfo(data);
      profileEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => profileEdit.renederLoad(false));
});

const avatarEdit = new PopupWithForm(popupAvatar, (values) => {
  avatarEdit.renederLoad(true);
  api
    .editAvatar(values)
    .then((data) => {
      userInfo.setUserInfo(data);
      avatarEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarEdit.renederLoad(false));
});

const profileValidator = new FormValidator(selectors, formProfile);
profileValidator.enableValidation();

profileButton.addEventListener("click", () => {
  profileValidator.resetValidation();
  openProfileEdit();
});

const cardValidator = new FormValidator(selectors, formCard);
cardValidator.enableValidation();

cardButton.addEventListener("click", () => {
  cardValidator.resetValidation();
  cardEdit.open();
});

const avatarValidator = new FormValidator(selectors, formAvatar);
avatarValidator.enableValidation();

avatarButton.addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarEdit.open();
});

const popupWithImage = new PopupWithImage(formImage);

const popupWithConfirm = new PopupWithConfirm(popupConfirm);

popupWithConfirm.setEventListeners();
popupWithImage.setEventListeners();
cardEdit.setEventListeners();
profileEdit.setEventListeners();
avatarEdit.setEventListeners();
