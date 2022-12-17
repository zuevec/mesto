export default class Card {

  constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
    this._text = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = data.currentUserId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;


    this._cardSelector = cardSelector;
  }

  _like() {


    this._likeCount.textContent = this._likes.length;

    if (this.isLiked()) this._likeButton
      .classList.add('element__like_active');
    else this._likeButton
      .classList.remove('element__like_active');

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {

    this._elementImage.addEventListener('click', () => {
     this._handleCardClick(this._cardId)
   });

   this._likeButton.addEventListener('click', () => {
    this._handleLikeClick(this._cardId)
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId)
    });


  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._element = this._getTemplate();
    this._likeCount =  this._element.querySelector('.element__like-count');
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteBtn = this._element.querySelector('.element__trash');
    this._elementImage = this._element.querySelector('.element__image')
    this._like();
    this._setEventListeners();
    this._hasDeleteBtn();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._text;
    this._element.querySelector('.element__title').textContent = this._text;

    return this._element;
  }

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  id() {
    return this._cardId;
  }

  setLikesInfo(data) {
    this._likes = data.likes;
    this._like();
  }

  _hasDeleteBtn() {
    if (this._userId !== this._ownerId) {
      this._deleteBtn.remove();
    }
  }
}
