import {Card} from '/scripts/Cards.js';
import {FormValidator}from './FormValidator.js';

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


const enableValidation = ({
  popupSelector: ".popup",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error-message_active"
});

const buttonCloseList = document.querySelectorAll('.popup__close');

const buttonProfileEdit = document.querySelector('.profile__edit');
const buttonMestoAdd = document.querySelector('.profile__add-button');

export const popupProfile = document.querySelector('.popup_profile');
export const popupMestoAdd = document.querySelector('.popup_mesto-add');

const inputName = document.querySelector('.popup__input_name_name');
const inputJob = document.querySelector('.popup__input_name_job');
const nameAuthor = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

const inputMesto = document.querySelector('.popup__input_name_mesto');
const inputlinkImg = document.querySelector('.popup__input_name_linkImg');

const popupPicture = document.querySelector('.popup_picture');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const template = document.querySelector('#elementTemplate');
const elementsSection = document.querySelector('.elements')

initialCards.forEach((item) => {
  const card = new Card(item, template);
  const cardElement = card.generateCard();

  elementsSection.append(cardElement);
});

buttonProfileEdit.addEventListener('click', () => { openPropfilePopup(), openPopup(popupProfile) });
buttonMestoAdd.addEventListener('click', () => openPopup(popupMestoAdd));

popupProfile.addEventListener('submit', editformProfileEdit);
popupMestoAdd.addEventListener('submit', addMesto);

buttonCloseList.forEach(button => {
  button.addEventListener('click', () => closePopup(button.closest('.popup')));
});


function openPopup(item) {
  item.classList.add('popup_opened');
  item.addEventListener('click', (event) => clickOnOverlay(event, item));
  document.addEventListener('keydown', (event) => EscOnKeyDown(event, item));
}

function clickOnOverlay(event, item) {
  if (event.target.classList.contains('popup_opened')){
    closePopup(item);
  }
}

function EscOnKeyDown(event, item) {
  if (event.key === "Escape"){
    closePopup(item);
  }
}

function openPropfilePopup() {
  inputName.value = nameAuthor.textContent;
  inputJob.value = job.textContent;
}

function closePopup(item) {
  item.classList.remove('popup_opened');
  item.removeEventListener('click', clickOnOverlay);
  document.removeEventListener('keydown', EscOnKeyDown);
}

function editformProfileEdit(evt) {
  evt.preventDefault();
  nameAuthor.textContent = inputName.value;
  job.textContent = inputJob.value;
  closePopup(popupProfile);
}

function addMesto(evt) {
  evt.preventDefault();
  addElement(inputMesto.value, inputlinkImg.value);
  evt.target.reset();
  popupMestoAddValidator.disableSubmitButton();
  closePopup(popupMestoAdd)
}

function addElement(nameCard, linkCard) {
  const item = new Object();
  item.name = nameCard;
  item.link = linkCard;
  const card = new Card(item, template);
  const cardElement = card.generateCard();
  elementsSection.prepend(cardElement);
}

export function showPopupImg(nameCard, linkCard) {
  openPopup(popupPicture);
  popupImage.src = linkCard;
  popupImage.alt = nameCard;
  popupImageCaption.textContent = nameCard;
}

const popupProfileValidator = new FormValidator(enableValidation, popupProfile);
popupProfileValidator.enableValidation();

const popupMestoAddValidator = new FormValidator(enableValidation, popupMestoAdd);
popupMestoAddValidator.enableValidation();
