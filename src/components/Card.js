export default class Card {
  constructor(
    data,
    userId,
    cardSelector,
    handleCardClick,
    handleLikeAdd,
    handleLikeRemove,
    handleDeleteClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;
    this._likes = data.likes;
    this._ownerId = data.ownerId;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeAdd = handleLikeAdd;
    this._handleLikeRemove = handleLikeRemove;
    this._handleDeleteClick = handleDeleteClick;
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
    this._cardCaption = this._element.querySelector(".element__caption-text");
    this._cardImage = this._element.querySelector(".element__image");
    this._cardCaption.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._like = this._element.querySelector(".element__like");
    this._likeCount = this._element.querySelector(".element__like-count");

    this.setupLikes(this._likes);

    if (this._userId !== this._ownerId) {
      this._element.querySelector(".element__delete").remove();
    }

    this._setEventListeners();

    return this._element;
  }

  likeCard() {
    return this._likes.find((user) => user._id === this._userId);
  }

  _activeLike = () => {
    this._like.classList.add("element__liked");
  };

  _disableLike = () => {
    this._like.classList.remove("element__liked");
  };

  setupLikes(newLike) {
    this._likes = newLike;
    this._likeCount.textContent = this._likes.length;
    if (this.likeCard()) {
      this._activeLike();
    } else {
      this._disableLike();
    }
  }

  deleteCard = () => {
    this._element.remove();
  };

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", this._likeCard);
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._deleteCard);
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }
}
