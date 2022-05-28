export default class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeleteClick },
    cardSelector,
    api,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._api = api;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardCaption = this._element.querySelector(".element__caption-text");
    this._cardImage = this._element.querySelector(".element__image");
    this._cardCaption.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCount = this._element.querySelector(".element__like-count");
    this._likeButton = this._element.querySelector(".element__like");
    this._likeCount.textContent = this._likes.length;

    if (!(this._ownerId === this._userId)) {
      this._element.querySelector(".element__delete").style.display = "none";
    }

    if (this._likes.find((obj) => this._userId === obj._id)) {
      this._likeButton.classList.add("element__liked");
    }
    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  handlCardLike() {
    if (!this._likeButton.classList.contains("element__liked")) {
      this._api
        .addLike(this._id)
        .then((data) => {
          this._likeButton.classList.add("element__liked");
          this._likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .deleteLike(this._id)
        .then((data) => {
          this._likeButton.classList.remove("element__liked");
          this._likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__large")
      .addEventListener("click", this._handleCardClick);
    this._element
      .querySelector(".element__like")
      .addEventListener("click", this._handleLikeClick);
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._handleDeleteClick);
  }
}
