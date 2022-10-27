export class Card {
  constructor(item, template, showPopupImg) {
    this._name = item.name;
    this._link = item.link;
    this._template = template;
    this._showPopupImg = showPopupImg;
  }

  _getTemplate() {
    const cardElement = this._template
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

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
     this._cardImage.addEventListener('click', () => {
      this._showPopupImg(this._name, this._link)
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
