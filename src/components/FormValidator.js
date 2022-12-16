export default class FormValidator {
  constructor(config, popupName) {
    this._config = config;
    this._popupName = popupName;
    this._inputList = Array.from(this._popupName.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._popupName.querySelector(this._config.submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._popupName.querySelector(`.${inputElement.id}-placeholder`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._popupName.querySelector(`.${inputElement.id}-placeholder`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  };

  _setEventListeners() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };


_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
};

_hasInvalidInput () {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

toggleButtonState() {
  if (this._hasInvalidInput()) {
    this.disableButton();
  } else {
    this.enableButton();
  }
}


disableButton() {
  this._buttonElement.classList.add(this._config.inactiveButtonClass);
  this._buttonElement.disabled = true;
}


enableButton() {
  this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  this._buttonElement.disabled = false;
}

  enableValidation() {
    this._setEventListeners();
  }


  hideErrors() {
    this._inputList.forEach((inputElement) => {
      this._errorElement = this._popupName.querySelector(`.${inputElement.id}-placeholder`);
      this._hideInputError(inputElement);
    });
  }
}
