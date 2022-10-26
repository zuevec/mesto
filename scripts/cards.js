import {showPopupImg, initialCards} from '/scripts/index.js';
export class Card {
  constructor(item, template) {
    this._name = item.name;
    this._link = item.link;
    this._template = template;
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

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
     this._element.querySelector('.element__image').addEventListener('click', () => {
      showPopupImg(this._name,this._link);
     });

     this._element.querySelector('.element__like').addEventListener('click', () => {
      console.log(this._element.querySelector('.element__like'))
       this._like();
     });

     this._element.querySelector('.element__trash').addEventListener('click', () => {
       this._deleteCard();
     });

   }

  _showPopupImg() {
    console.log(popupPicture)
    openPopup(popupPicture);

    popupImage.src = this._link;
    popupImage.alt = this._text;
    popupImageCaption.textContent = this._text;
  }

  _like() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._element.querySelector('.element__trash').closest('.element').remove();
  }
}
