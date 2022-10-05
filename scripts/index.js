const buttonCloseList = document.querySelectorAll('.popup__close');

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

const popupPicture = document.querySelector('.popup_picture');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const template = document.querySelector('#elementTemplate');
const elementsSection = document.querySelector('.elements')



initialCards.forEach((item) => {
  addElement(item.name, item.link);
})

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
  disableSubmitButton(evt.submitter, enableValidation)
  closePopup(popupMestoAdd)
}

function createCard(namecard, linkcard) {
  const templateCopy = template.content.cloneNode(true);
  const elementImage = templateCopy.querySelector('.element__image');
  const elementTitle = templateCopy.querySelector('.element__title')
  elementImage.src = linkcard;
  elementImage.alt = namecard;
  elementTitle.textContent = namecard;

  elementImage.addEventListener('click', (event) => showPopupImg(nameCard, linkCard));

  const likeElement = templateCopy.querySelector('.element__like');
  likeElement.addEventListener('click', (event) => like(likeElement));

  const elementTrash = templateCopy.querySelector('.element__trash');
  elementTrash.addEventListener('click', (event) => deleteCard(elementTrash));

  return templateCopy;
}

function addElement(nameCard, linkCard) {
  const newElement = createCard(nameCard, linkCard);
  elementsSection.prepend(newElement);
}

function like(item) {
  item.classList.toggle('element__like_active');
}

function deleteCard(item) {
  item.closest('.element').remove();
}

function showPopupImg(nameCard, linkCard) {
  openPopup(popupPicture);
  popupImage.src = linkCard;
  popupImage.alt = namecard;
  popupImageCaption.textContent = namecard;

}


