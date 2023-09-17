'use strict';

function isValidModalAdd() {
  let isValidTitle = isValidTitleInput();
  let isValidImg = isValidImgInput();
  return isValidTitle && isValidImg;
}

function markInvalid(elem) {
  elem.style.borderColor = 'red';
  setTimeout(() => elem.style.borderColor = '', 1000);
}



/* | | | | | | | | | | | | | | | field_state | | | | | | | | | | | | | | | */

let stateBtnGroup = document.getElementById('stateBtnGroup');
stateBtnGroup.addEventListener('click', wrapClickedRadioBtn(stateBtnGroup.querySelector('[data-checked]')));

function wrapClickedRadioBtn(pressedRadioBtn) {
  return function clickedRadioBtn(event) {
    let btn = event.target.closest('button');
    if (!btn || btn === pressedRadioBtn) return;
    pressedRadioBtn?.removeAttribute('data-checked');
    btn.setAttribute('data-checked', '');
    pressedRadioBtn = btn;
  }
}




/* | | | | | | | | | | | | | | | | | field_title | | | | | | | | | | | | | | | */

let titleInput = document.getElementById('titleInput');

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
imgCancelBtn.addEventListener('click', resetImgInput);


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

function resetImgInput() {
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
btnAdd.addEventListener('click', clickedBtnAdd);


function clickedBtnAdd() {
  if (!isValidModalAdd()) return;
  let card = createCard(titleInput.value, URL.createObjectURL(imgInput.files[0]));
  cardGridPassed.append(card);
};

function createCard(title, imgSrc) {
  templates.card__title.textContent = title;
  templates.card__img.src = imgSrc;
  return templates.card.cloneNode(true);
}