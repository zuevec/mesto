import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._formInputsList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__button');
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputsValues = {};
    this._formInputsList.forEach(input => {
      this._inputsValues[input.name] = input.value;
    });

    return this._inputsValues;
  }

  setInputValues(data) {
    this._formInputsList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }



}
