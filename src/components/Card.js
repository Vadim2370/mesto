export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
        return cardElement;
        
    }

    createCard() {
        this._element = this._getTemplate();
        this._cardCaption = this._element.querySelector('.element__caption-text');
        this._cardImage = this._element.querySelector('.element__image');
        this._cardCaption.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._setEventListeners();
        
        return this._element;
    }

    _likeCard = () => {
        this._element.querySelector('.element__like').classList.toggle('element__liked');
    }

    _deleteCard = () => {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', this._likeCard);
        this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard);
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }
}