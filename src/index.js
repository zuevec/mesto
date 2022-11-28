import './pages/index.css';
import Card from './components/Cards.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';


import {
  buttonProfileEdit,
  buttonMestoAdd,
  initialCards,
  enableValidation,
  template,
  formEditProfile,
  formAddNewCard
} from './utils/constants.js';

const section = new Section({items: initialCards, renderer: renderCard}, '.elements')
section.renderItems()

const showPopupImg = new PopupWithImage('.popup_picture');
showPopupImg.setEventListeners();

const profileEditFormValidator = new FormValidator(enableValidation, formEditProfile);
profileEditFormValidator.enableValidation();

const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__job'
});


const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_profile',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});

popupEditProfile.setEventListeners();

const newCardFormValidator = new FormValidator(enableValidation, formAddNewCard);
newCardFormValidator.enableValidation();


const popupNewCard = new PopupWithForm({
  popupSelector: '.popup_mesto-add',
  handleFormSubmit: (data) => {
    section.addItem(createCard(data));
  }
});

popupNewCard.setEventListeners();


function renderCard(cardData) {
  const cardElement = createCard(cardData)
  section.addItem(cardElement)
 }

function createCard(item) {
  const card = new Card({
    item: item,
    templateSelector: template,
    handleCardClick: (item) => {
      showPopupImg.open(item);
    }
  });
  const cardItem = card.generateCard();
  return cardItem;
}


  buttonProfileEdit.addEventListener('click', () => {
    popupEditProfile.setInputValues(userInfo.getUserInfo());
    profileEditFormValidator.hideErrors();
    popupEditProfile.open();
  });

  buttonMestoAdd.addEventListener('click', () => {
    newCardFormValidator.hideErrors();
    newCardFormValidator.disableButton();
    popupNewCard.open();
  });
