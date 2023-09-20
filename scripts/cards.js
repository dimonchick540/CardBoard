'use strict';
// this file is responsible for the html block modal-add
// the code is divided into sections corresponding to the classes(or id) specified in the header

let templates = {
  card: document.querySelector('#templates .card'),
  card__img: document.querySelector('#templates .card__img'),
  card__title: document.querySelector('#templates .card__title')
};
let cardsGridPassed = document.getElementById('cardsGridPassed');
let modalAdd = document.getElementById('modalAdd');
let addCardBtn = document.getElementById('addCardBtn');
addCardBtn.addEventListener('click', () => {
  if (modalAdd.style.visibility) {
    openModalAdd();
  } else closeModalAdd();
});
document.documentElement.addEventListener('click', (event) => {
  if (modalAdd.style.visibility === 'hidden' || event.target.closest('.container_add')) return;
  closeModalAdd();
});



/* | | | | | | | | | | | | | | | field_close | | | | | | | | | | | | | | | */

let closeModalAddBtn = document.getElementById('closeModalAddBtn');
closeModalAddBtn.addEventListener('click', closeModalAdd);



/* | | | | | | | | | | | | | | | field_state | | | | | | | | | | | | | | | */

let stateBtnGroup = document.getElementById('stateBtnGroup');
stateBtnGroup.addEventListener('click', wrapClickRadioBtn(stateBtnGroup.querySelector('[data-checked]')));

function wrapClickRadioBtn(pressedRadioBtn) {
  return function clickRadioBtn(event) {
    let btn = event.target.closest('button');
    if (!btn || btn === pressedRadioBtn) return;
    pressedRadioBtn?.removeAttribute('data-checked');
    btn.setAttribute('data-checked', '');
    pressedRadioBtn = btn;
  }
}



/* | | | | | | | | | | | | | | | | | field_title | | | | | | | | | | | | | | | */

let titleInput = document.getElementById('titleInput');

function resetFieldTitle() {
  titleInput.value = '';
}

function isValidTitleInput() {
  if (titleInput.value) return true;
  markInvalid(titleInput);
  return false;
};



/* | | | | | | | | | | | | | | | | | | field_upload | | | | | | | | | | | | | | | | */

let imgInput = document.getElementById('imgInput');
let imgInputLabel = document.getElementById('imgInputLabel');
let imgInputInfo = document.getElementById('imgInputInfo');
let imgCancelBtn = document.getElementById('imgCancelBtn');
imgInput.addEventListener('change', imgInputChanged);
imgCancelBtn.addEventListener('click', resetFieldUpload);


function imgInputChanged() {
  let img = this.files[0];
  if (img) {
    imgInputInfo.textContent = img.name;
    imgCancelBtn.style.visibility = '';
  } else {
    imgInputInfo.textContent = 'no img chosen';
    imgCancelBtn.style.visibility = 'hidden';
  }
}

function resetFieldUpload() {
  imgInput.value = '';
  imgInput.dispatchEvent(new Event('change'));
}

function isValidImgInput() {
  if (imgInput.files[0]) return true;
  markInvalid(imgInputLabel);
  return false;
}



/* | | | | | | | | | | | | | | | | | | field_add | | | | | | | | | | | | | | | | */

let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', clickBtnAdd);

function clickBtnAdd() {
  if (!isValidModalAdd()) return;
  let card = createCard(titleInput.value, URL.createObjectURL(imgInput.files[0]));
  cardsGridPassed.append(card);
  resetModalAdd();
};

function createCard(title, imgSrc) {
  templates.card__title.textContent = title;
  templates.card__img.src = imgSrc;
  return templates.card.cloneNode(true);
}



/* | | | | | | | | | | | | | | | | | | general | | | | | | | | | | | | | | | | */

function isValidModalAdd() {
  let isValidTitle = isValidTitleInput();
  let isValidImg = isValidImgInput();
  return isValidTitle && isValidImg;
}

function markInvalid(elem) {
  elem.style.borderColor = 'red';
  setTimeout(() => elem.style.borderColor = '', 1000);
}

function resetModalAdd() {
  resetFieldTitle();
  resetFieldUpload();
}

function closeModalAdd() {
  modalAdd.style.visibility = 'hidden';
  resetModalAdd();
}

function openModalAdd() {
  modalAdd.style.visibility = '';
}