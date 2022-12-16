export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(`.${popupSelector}`);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }


  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup')) {
        this.close();
      }
    });
  }


}
