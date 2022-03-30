const popup = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit');
const addCardButton = document.querySelector('.profile__add');
const formProfile = document.querySelector('.popup-profile');
const formCard = document.querySelector('.popup-card');
const closeButtonProfile = document.querySelector('.popup__close-profile');
const closeButtonCard = document.querySelector('.popup__close-card');
const saveButtonCard = document.querySelector('.popup__submit-card');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const activiteInput = formProfile.querySelector('.popup__input_type_activity');
const cardContainer = document.querySelector('.elements__grid');
const cardName = formCard.querySelector('.popup__input_type_card-name');
const cardLink = formCard.querySelector('.popup__input_type_card-link');
const cardGrid = document.querySelector('.elements__grid');
const formImage = document.querySelector('.popup-image');
const imageLarge = formImage.querySelector('.popup__image');
const imageName = formImage.querySelector('.popup__image-caption');
const closeButtonImage = formImage.querySelector('.popup__close-image');

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

function openPopup(popup) {            //открытие попап
    popup.classList.add('popup_opened');
};

function closePopup(popup) {           //закрытие попап
    popup.classList.remove('popup_opened');
};

function openProfile() {   //открываем форму профиля кнопкой Edit
    nameInput.value = profileName.textContent;    //заполняем поля данными со страницы
    activiteInput.value = profileActivity.textContent;
    openPopup(formProfile);
};

function closeProfile() {      //закрываем форму профиля без сохранения
    closePopup(formProfile);
};

function saveFormProfile(evt) {    //сохраняем данные из полей формы на страницу и закрываем форму кнопкой Сохранить
    evt.preventDefault();       //отменяем отправку формы и перезагрузку страницы
    profileName.textContent = nameInput.value;
    profileActivity.textContent = activiteInput.value;
    closePopup(formProfile);
};

function addCard() {           //открываем форму добавления карточки
    openPopup(formCard);
};

function closeCard() {         //закрываем форму добавления карточки без сохранения
    closePopup(formCard);
};

function createCard(data) {     //подготавливаем карточку
    const cardElement = document.querySelector('.element-template').content.firstElementChild.cloneNode(true);
    const cardCaption = cardElement.querySelector('.element__caption-text');
    const cardImage = cardElement.querySelector('.element__image');
    cardElement.querySelector('.element__delete').addEventListener('click', function(evt) {  //удаление карточки
      evt.currentTarget.closest('.element').remove();
    });
    cardElement.querySelector('.element__like').addEventListener('click', function(evt) {   //"лайк"
      evt.target.classList.toggle('element__liked');
    });
    cardElement.querySelector('.element__large').addEventListener('click', function(evt) {  //увеличиваем фотографию
      imageName.textContent = evt.target.alt;
      imageLarge.src = evt.target.src;
      imageLarge.alt = evt.target.alt;
      openPopup(formImage);
    });
    cardCaption.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;
    return cardElement;
};

function closeImage() {
    closePopup(formImage);
};

function renderCard(data) {       //собираем и размещаем карточку на странице
    const cardElement = createCard(data);
    cardContainer.prepend(cardElement);
};

function createSubmitCard(evt) {   //сохраняем карточку
    evt.preventDefault();
    const data = {
      name: cardName.value,
      link: cardLink.value,
    };
    renderCard(data);
    evt.target.reset();   //очистка полей формы 
    closePopup(formCard);
};

initialCards.reverse().forEach((item) => {    //начальный набор карточек
    renderCard(item);
});

editProfileButton.addEventListener('click', openProfile);
addCardButton.addEventListener('click', addCard);
closeButtonProfile.addEventListener('click', closeProfile);
closeButtonCard.addEventListener('click', closeCard);
formProfile.addEventListener('submit', saveFormProfile);
formCard.addEventListener('submit', createSubmitCard);
closeButtonImage.addEventListener('click', closeImage);