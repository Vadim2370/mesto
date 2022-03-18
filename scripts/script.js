let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit');
let formElement = document.querySelector('.popup__form');
let closeButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');
let nameInput = formElement.querySelector('.popup__input_type_name');
let activiteInput = formElement.querySelector('.popup__input_type_activity');

function openPopup() {   //открываем форму кнопкой Edit
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;    //заполняем поля данными со страницы
    activiteInput.value = profileActivity.textContent;
};

function closePopup() {    //закрываем форму кнопкой Close без сохранения
    popup.classList.remove('popup_opened');
};

function saveFormPopup(evt) {    //сохраняем данные из полей формы на страницу и закрываем форму кнопкой Сохранить
    evt.preventDefault();        //отменяем отправку формы и перезагрузку страницы
    profileName.textContent = nameInput.value;
    profileActivity.textContent = activiteInput.value;
    closePopup();
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', saveFormPopup);