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
  createElement('append', item.name, item.link);
})

const popup = document.querySelector('.popup');
const popupBlock = document.querySelector('.popup__block');
const buttonProfileEdit = document.querySelector('.profile__edit');
const buttonMestoAdd = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelector('.popup__close');

buttonProfileEdit.addEventListener('click', openPopup);
buttonMestoAdd.addEventListener('click', openPopup);

function openPopup() {
  let eventClassevent = event.target.className;
  popup.classList.remove('popup_closed');
  popupTemplate(eventClassevent)
}

function closePopup() {
  popup.classList.add('popup_closed');
}

function popupTemplate(eventClassevent) {
  if (eventClassevent == 'profile__edit') {
    // шаблон формы
    const template = document.querySelector('#elementPopupProfile');
    const templateCopy = template.content.cloneNode(true);
    popupBlock.append(templateCopy);
    return popupAction(eventClassevent);
  }
  if (eventClassevent == 'profile__add-button') {
    // шаблон формы
    const template = document.querySelector('#elementPopupMesto');
    const templateCopy = template.content.cloneNode(true);
    popupBlock.append(templateCopy);
    return popupAction(eventClassevent);
  }
  if (eventClassevent == 'element__image') {
    const template = document.querySelector('#elementPopupImage');
    const templateCopy = template.content.cloneNode(true);
    popupBlock.append(templateCopy);
    return popupAction(eventClassevent);
  }
}

function popupAction(eventClassevent) {
  const formPopup = document.querySelector('.popup__form');

  buttonClosePopup.addEventListener('click', function (event) {
    if (formPopup) {
      formPopup.remove();
    }
    buttonClosePopup.removeEventListener('click', closePopup());
  })

  if (eventClassevent == 'profile__edit') {
    const inputName = document.querySelector('.popup__input_name_name');
    const inputJob = document.querySelector('.popup__input_name_job');
    const nameAuthor = document.querySelector('.profile__name');
    const job = document.querySelector('.profile__job');

    inputName.value = nameAuthor.textContent;
    inputJob.value = job.textContent;

    function formProfileEdit(evt) {
      evt.preventDefault();
      nameAuthor.textContent = inputName.value;
      job.textContent = inputJob.value;
      popup.classList.add('popup_closed');
      formPopup.remove();
    }

    return formPopup.addEventListener('submit', formProfileEdit);
  }
  if (eventClassevent == 'profile__add-button') {
    const inputMesto = document.querySelector('.popup__input_name_mesto');
    const inputlinkImg = document.querySelector('.popup__input_name_linkImg');

    function formMestoADD(evt) {
      evt.preventDefault();

      createElement('prepend', inputMesto.value, inputlinkImg.value);

      popup.classList.add('popup_closed');
      formPopup.remove();
    }

    return formPopup.addEventListener('submit', formMestoADD);
  }
  if (eventClassevent == 'element__image') {
    const popupImage = document.querySelector('.popup__image');
    popupImage.parentElement.classList.add('popup__block_image');
    popupImage.parentElement.classList.remove('popup__block');
    popupImage.src = event.target.src;
  }
}

function createElement(methodInsert, namecard, linkcard) {
  const elements = document.querySelector('.elements')
  const template = document.querySelector('#elementTemplate')
  const templateCopy = template.content.cloneNode(true);

  templateCopy.querySelector('img').src = linkcard;
  templateCopy.querySelector('img').alt = namecard;
  templateCopy.querySelector('h2').textContent = namecard;

  if (methodInsert == 'append') {
    return elements.append(templateCopy);
  }
  if (methodInsert == 'prepend') {
    return elements.prepend(templateCopy);
  }
}

document.querySelector('.elements').addEventListener('click', event => {
  if (event.target.className == 'element__like' || event.target.className == 'element__like element__like_active') {
    return event.target.classList.toggle('element__like_active');
  }
  if (event.target.className == 'element__trash') {
    return event.target.parentElement.remove();
  }
  if (event.target.className == 'element__image') {
    return openPopup()
  }
});
