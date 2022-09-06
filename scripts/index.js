const buttonProfileEdit = document.querySelector('.profile__edit');
const buttonProfileEditSave = document.querySelector('.popup__button-profile-save');
const buttonClosePopup = document.querySelector('.popup__close');

const popup = document.querySelector('.popup');

const inputName = document.querySelector('.popup__input_name_name');
const inputJob = document.querySelector('.popup__input_name_job');

const formProfile = document.querySelector('.popup__form');

const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

buttonProfileEdit.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
formProfile.addEventListener('submit', formProfileEdit);


function openPopup() {
  popup.classList.remove('popup_closed');
  inputName.value = name.textContent;
  inputJob.value = job.textContent;
}

function formProfileEdit(evt) {
  evt.preventDefault();
  name.textContent = inputName.value;
  job.textContent = inputJob.value;
  popup.classList.add('popup_closed');
}

function closePopup() {
  popup.classList.add('popup_closed');
}
