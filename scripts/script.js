let elements = document.querySelectorAll('.element__like');

for (let i = 0; i < elements.length; i = i + 1) {
    elements[i].addEventListener('click', function() {
        elements[i].classList.toggle('element__liked');
    });
};

let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit');
let formElement = document.querySelector('.popup__form');
let closeButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');
let nameInput = formElement.querySelector('#popup__input_type_name');
let activiteInput = formElement.querySelector('#popup__input_type_activity');

function popupOpen() {
    popup.classList.toggle('popup__opened');
    nameInput.value = profileName.textContent;
    activiteInput.value = profileActivity.textContent;
};

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupOpen);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileActivity.textContent = activiteInput.value;
    popupOpen();
};

formElement.addEventListener('submit', formSubmitHandler);