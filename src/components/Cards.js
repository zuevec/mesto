export default class Card {
  constructor({item, templateSelector, handleCardClick}) {
    this._item = item;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

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
  }
}
