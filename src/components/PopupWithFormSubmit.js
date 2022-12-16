import Popup from './Popup.js';

export default class PopupWithFormSubmit extends Popup {

    constructor({ popupSelector }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    setSubmitAction(action) {
        this._handleFormSubmit = action;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('click', (event) => {
            event.preventDefault();
            this._handleFormSubmit();
        });
    }

}

