import './pages/index.css';
import Card from './components/Cards.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithFormSubmit from './components/PopupWithFormSubmit.js';
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';


import {
  buttonMestoAdd,
  buttonProfileEdit,
  popupConfig,
  enableValidation,
  cardsConfig,
  formEditProfile,
  formAddNewCard,
  apiConfig,
  inputJob,
  inputName
} from './utils/constants.js';

const api = new Api(apiConfig);

let userId;

const userInfo = new UserInfo({
  userName: '.profile__name',
  job: '.profile__job',
  avatar: '.profile__avatar'
});

const openAvatarFormButton = document.querySelector('.profile__avatar-btn');


const imagePopup = new PopupWithImage(popupConfig.imageModalWindow);
imagePopup.setEventListeners();


const deleteCardPopup = new PopupWithFormSubmit({
  popupSelector: popupConfig.removeCardModalWindow,
  handleFormSubmit: () => { }
});
deleteCardPopup.setEventListeners();




const userInfoPopup = new PopupWithForm({
  popupSelector: popupConfig.editFormModalWindow,
  handleFormSubmit: (data) => {

    userInfoPopup.renderLoading(true);
    api.setUserInfo({
      name: data.name,
      job: data.job,
    })
      .then((info) => {

        userInfo.setUserInfo(info)

        userInfoPopup.close();
      })
      .catch(err => console.log(`Ошибка при обновлении информации о пользователе: ${err}`))
      .finally(() => userInfoPopup.renderLoading(false));
  }
});
userInfoPopup.setEventListeners();


buttonProfileEdit.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs({
    userName: info.userName,
    job: info.job
  });

  userInfoPopup.open();
});

const newCardPopup = new PopupWithForm({
  popupSelector: popupConfig.cardFormModalWindow,
  handleFormSubmit: (data) => {

    api.addCard(data)
      .then((cardData) => {
        cardList.addItem(createCard(cardData));
        newCardPopup.close();
      })
      .catch(err => console.log(`Ошибка добавление карточки: ${err}`))
      .finally(() => newCardPopup.renderLoading(false));
  }
});
newCardPopup.setEventListeners();

buttonMestoAdd.addEventListener('click', () => {
  newCardFormValidator.toggleButtonState();
  newCardPopup.open();
})

const changeAvatarPopup = new PopupWithForm({
  popupSelector: popupConfig.changeAvatarModalWindow,
  handleFormSubmit: (data) => {
    console.log(api.setUserAvatar({
      avatar2: data.avatar
    }))
    changeAvatarPopup.renderLoading(true);
    api.setUserAvatar({
      avatar: data.avatar
    })
      .then((info) => {
        console.log('sss')
        userInfo.setUserInfo(info);
        changeAvatarPopup.close();
      })
      .catch(err => console.log(`При изменении аватара пользователя: ${err}`))
      .finally(() => changeAvatarPopup.renderLoading(false));
  }
});
changeAvatarPopup.setEventListeners();

openAvatarFormButton.addEventListener('click', () => {
  changeAvatarPopup.open();
});


const createCard = (cardData) => {
  const card = new Card({
    data: { ...cardData, currentUserId: userId },
    handleCardClick: () => {
      imagePopup.open(cardData);
    },
    handleLikeClick: (cardId) => {
      api.changeLikeCardStatus(cardId, !card.isLiked())
        .then(data => {

          card.setLikesInfo({ ...data });
        })
        .catch(err => console.log(`Ошибка изменения лайка: ${err}`))
    },
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        api.removeCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
  }, cardsConfig.cardSelector);

  return card.getView();
}

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(createCard(data));
  }
}, '.elements'
);


function fillInEditProfileFormInputs({ userName, job }) {
  inputName.value = userName;
  inputJob.value = job;
}

const profileEditFormValidator = new FormValidator(enableValidation, formEditProfile);
profileEditFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(enableValidation, formAddNewCard);
newCardFormValidator.enableValidation();

Promise.all([api.getCardList(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);

    cardList.renderItems(cards.reverse());
  })
  .catch(err => console.log(`Ошибка загрузки данных: ${err}`));

