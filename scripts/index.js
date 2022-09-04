const buttonProfileEdit = document.querySelector('.profile__edit');
const buttonProfileEditSave = document.querySelector('.popup__button-profile-save');
const buttonClosePopup = document.querySelector('.popup__close');

const popup = document.querySelector('.popup-profile-edit');

const inputName = document.querySelector('.popup__input-name');
const inputJob = document.querySelector('.popup__input-job');

const formProfile = document.querySelector('.popup__form');

const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

buttonProfileEdit.addEventListener('click', clickButtonProfileEdit);
buttonClosePopup.addEventListener('click', clickClosePopup);
formProfile.addEventListener('submit', formProfileEdit);


function clickButtonProfileEdit() {
  popup.classList.remove('close');
  popup.classList.add('open');
  inputName.value = name.textContent;
  inputJob.value = job.textContent;
}

function formProfileEdit(evt) {
  evt.preventDefault();
  name.textContent = inputName.value;
  job.textContent = inputJob.value;
  console.log(inputName.value)
  popup.classList.remove('open');
  popup.classList.add('close');
}

function clickClosePopup() {
  popup.classList.remove('open');
  popup.classList.add('close');
}
