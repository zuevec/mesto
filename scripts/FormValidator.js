export class FormValidator {
  constructor(settings, popupName) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._popupName = popupName;
    this._inputList = Array.from(this._popupName.querySelectorAll(this._inputSelector));
    this._buttonElement = this._popupName.querySelector(this._submitButtonSelector);
    this._formList = Array.from(this._popupName.querySelectorAll(this._formSelector));

  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._popupName.querySelector(`.${inputElement.id}-placeholder`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._popupName.querySelector(`.${inputElement.id}-placeholder`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
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

_toggleButtonState () {
  if (this._hasInvalidInput (this._inputList)) {
    this.disableSubmitButton()
  } else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
		this._buttonElement.removeAttribute("disabled");
  }
}

disableSubmitButton() {
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.setAttribute("disabled", "disabled");
}

  enableValidation() {
    this._setEventListeners(this._formSelector);
  }

}
