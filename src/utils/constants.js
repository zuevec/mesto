export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const enableValidation = ({
  popupSelector: ".popup",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error-message_active"
});

export const template = document.querySelector('#elementTemplate');
export const popupProfile = document.querySelector('.popup_profile');
export const buttonProfileEdit = document.querySelector('.profile__edit');
export const buttonMestoAdd = document.querySelector('.profile__add-button');
export const popupMestoAdd = document.querySelector('.popup_mesto-add');

export const buttonCloseList = document.querySelectorAll('.popup__close');

export const inputName = document.querySelector('.popup__input_name_name');
export const inputJob = document.querySelector('.popup__input_name_job');
export const nameAuthor = document.querySelector('.profile__name');
export const job = document.querySelector('.profile__job');

export const inputMesto = document.querySelector('.popup__input_name_mesto');
export const inputlinkImg = document.querySelector('.popup__input_name_linkImg');

export const popupPicture = document.querySelector('.popup_picture');
export const popupImage = document.querySelector('.popup__image');
export const popupImageCaption = document.querySelector('.popup__caption');


export const elementsSection = document.querySelector('.elements')

export const newCardItem = {};

export const formEditProfile = document.forms.editProfile;
export const newUserName = formEditProfile.elements.nameprofile;
export const newUserOccupation = formEditProfile.elements.job;

export const formAddNewCard = document.forms.addMesto;
export const newCardName = formAddNewCard.elements.mesto;
export const newCardLink = formAddNewCard.elements.link;
