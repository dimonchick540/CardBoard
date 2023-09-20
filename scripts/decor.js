'use strict';

let slideList = document.getElementById("slideList");
let slider = document.getElementById("slider");

slideList.addEventListener("click", (event) => {
  let item = event.target.closest(".slide-list__item");
  if (item) moveSlider(item);
});

function moveSlider(item) {
  slider.style.translate = `${item.offsetLeft}px`;
  slider.style.width = `${item.offsetWidth}px`;
}