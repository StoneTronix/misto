export function createCard(imageLink, name){
  const cardTemplate = document.querySelector("#template").content;

  const currentCard = cardTemplate.querySelector('.places__item').cloneNode(true);  // Скопировали карту  
  currentCard.querySelector('.card__image').src = imageLink;  
  currentCard.querySelector('.card__description').querySelector('.card__title').textContent = name; // Выбрали и добавили описание
  return currentCard;
}

export function removeCard(specifiedCard) {
  specifiedCard.remove();
}