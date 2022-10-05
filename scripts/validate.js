const enableValidation = ({
  popupSelector: ".popup",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error-message_active"
});

const setEventListeners = (popupElement, settings) => {
  const inputList = Array.from(popupElement.querySelectorAll(settings.inputSelector));
  const buttonElement = popupElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(popupElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const showInputError = (popupElement, inputElement, errorMessage, settings) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-placeholder`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (popupElement, inputElement, settings) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-placeholder`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
};

const checkInputValidity = (popupElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(popupElement, inputElement, settings);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState (inputList, buttonElement, settings) {
  if (hasInvalidInput (inputList)) {
  disableSubmitButton(buttonElement, settings)
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
		buttonElement.removeAttribute("disabled");
  }
}

function disableSubmitButton(buttonElement, settings) {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
}

function enableSettings(settings) {
  const popups = Array.from(document.querySelectorAll(settings.popupSelector));
  popups.forEach((popup) => {
    setEventListeners(popup, settings);
  });
}

enableSettings(enableValidation)

