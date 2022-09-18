const initialCards = [
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

initialCards.forEach((item) => {
  createElement(item.name, item.link);
})

const popup = document.querySelector('.popup');
const buttonClosePopup = document.querySelectorAll('.popup__close');

const buttonProfileEdit = document.querySelector('.profile__edit');
const buttonMestoAdd = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_profile');
const popupMestoAdd = document.querySelector('.popup_mesto-add');

const inputName = document.querySelector('.popup__input_name_name');
const inputJob = document.querySelector('.popup__input_name_job');
const nameAuthor = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

const inputMesto = document.querySelector('.popup__input_name_mesto');
const inputlinkImg = document.querySelector('.popup__input_name_linkImg');

const elements = document.querySelector('.elements');

const elementImage = document.querySelector('.element__image');

const popupPicture = document.querySelector('.popup_picture');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const elementLike = document.querySelector('.element__like');
const elementTrash = document.querySelector('.element__trash');



buttonProfileEdit.addEventListener('click', () => openPopup(popupProfile));
buttonMestoAdd.addEventListener('click', () => openPopup(popupMestoAdd));

popupProfile.addEventListener('submit', editformProfileEdit);
popupMestoAdd.addEventListener('submit', addMesto);

elements.addEventListener('click', (event) => {
  if (event.target.className == 'element__like' || event.target.className == 'element__like element__like_active') {
    return like(event.target);
  }
  if (event.target.className == 'element__trash') {
    return deleteImg(event.target);
  }
  if (event.target.className == 'element__image') {
    return showPopupImg(event.target);
  }
})

buttonClosePopup.forEach(button => {
  button.addEventListener('click', () => closePopup(button.parentElement.parentElement));
});

function openPopup(item) {
  if (item == popupProfile) {
    inputName.value = nameAuthor.textContent;
    inputJob.value = job.textContent;
  }
  item.classList.add('popup_opened');
}

function closePopup(item) {
  item.classList.remove('popup_opened');
}

function editformProfileEdit(evt) {
  evt.preventDefault();
  nameAuthor.textContent = inputName.value;
  job.textContent = inputJob.value;
  closePopup(popupProfile);
}

function addMesto(evt) {
  evt.preventDefault();
  createElement(inputMesto.value, inputlinkImg.value);
  closePopup(popupMestoAdd)
}

function createElement(namecard, linkcard) {
  const elements = document.querySelector('.elements')
  const template = document.querySelector('#elementTemplate')
  const templateCopy = template.content.cloneNode(true);
  templateCopy.querySelector('img').src = linkcard;
  templateCopy.querySelector('img').alt = namecard;
  templateCopy.querySelector('h2').textContent = namecard;
  return elements.prepend(templateCopy);
}

function like(item) {
  item.classList.toggle('element__like_active');
}

function deleteImg(item) {
  item.parentElement.remove();
}

function showPopupImg(item) {
  openPopup(popupPicture);
  popupImage.src = item.src;
  popupImage.alt = item.alt;
  popupImageCaption.textContent = item.alt;
}
