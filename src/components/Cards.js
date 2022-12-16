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
    this._element.querySelector('.element__like-count').textContent = this._likes.length;

    if (this.isLiked()) this._element.querySelector('.element__like')
      .classList.add('element__like_active');
    else this._element.querySelector('.element__like')
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
    this._element.querySelector('.element__image').addEventListener('click', () => {
     this._handleCardClick(this._cardId)
   });

   this._element.querySelector('.element__like').addEventListener('click', () => {
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
    this._like();
    this._setEventListeners();
    this._deleteBtn = this._element.querySelector('.element__trash');
    this._hasDeleteBtn();
    this._element.querySelector('.element__image').src = this._link;
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












/*


  _getTemplate() {

    const cardElement = this._templateSelector
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardLike = this._element.querySelector('.element__like');
    this._cardTrash = this._element.querySelector('.element__trash')

    this._cardImage.src = this._item.link;
    this._cardImage.alt = this._item.name;
    this._cardTitle.textContent = this._item.name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
     this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._item)
    });

     this._cardLike.addEventListener('click', () => {
       this._like();
     });

     this._cardTrash.addEventListener('click', () => {
       this._deleteCard();
     });

   }

  _like() {
    this._cardLike.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._cardTrash.closest('.element').remove();
  }*/
}
