import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._formInputsList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('button[type="submit"]');
    this._buttonDefaultText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputsValues = {};
    this._formInputsList.forEach(input => {
      this._inputsValues[input.name] = input.value;
    });

    return this._inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isSending) {
    this._submitButton.textContent = isSending ? 'Сохранение...' : this._buttonDefaultText;
  }

}
