import { initialCards } from './initialCards.js';
import '../pages/index.css';
import { 
  openModal, 
  closeModal } from '../components/modal.js';
import {
  createCard,
  removeCard } from '../components/card.js';
import { enableValidation } from '../components/validate.js';





// Анимация всплывающим окнам
const popups = document.querySelectorAll('.popup');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardPopupClose = cardPopup.querySelector('.popup__close');

for (let i = 0; i < popups.length; i++){
  popups[i].classList.add('popup_is-animated');
}

cardPopupClose.addEventListener('click', function(){
  closeModal(cardPopup);
});

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupClose = imagePopup.querySelector('.popup__close');
imagePopupClose.addEventListener('click', function(){
  closeModal(imagePopup);
});





// Редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button'); 
const profilePopup = document.querySelector('.popup_type_edit');
const profilePopupClose = profilePopup.querySelector('.popup__close');

profilePopupClose.addEventListener('click', function(){
  profilePopup.classList.remove('popup_is-opened');
});

profileEditButton.addEventListener('click', function(){
  const profileFormElement = document.querySelector(".popup__form"); 
  const nameInput = profileFormElement.querySelector(".popup__input_type_name");
  const jobInput = profileFormElement.querySelector(".popup__input_type_description")

  // profileFormElement.addEventListener('submit', handleProfileFormSubmit);  // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(profilePopup);
});

profilePopup.querySelector('.popup__button').addEventListener('click', /* Подтверждение создания карточки */
  function(evt){
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = profilePopup.querySelector('.popup__input_type_name').value;
    document.querySelector('.profile__description').textContent = profilePopup.querySelector('.popup__input_type_description').value;
    closeModal(profilePopup);
  }
);




// Работа с картами
var cardsArray = [];  // Массив карточек
const profileAddButton = document.querySelector('.profile__add-button');  
const placesList = document.querySelector('.places__list');

profileAddButton.addEventListener('click', function() {
  openModal(cardPopup);
});

function cardHandler (evt) /* Обработчик действий внутри карт */ {  
  // console.log(evt.currentTarget);  // На нём висит обработчик
  // console.log(evt.target);

  const target = evt.target;  // На нём сработало событие
  const card = target.parentNode; 

  if (target.classList.contains('card__delete-button')) {     // Это кнопка удаления?
    removeCard(target.parentNode);
  }
  else if (target.classList.contains('card__like-button')) {  // Это кнопка подобайки?
    target.classList.toggle('card__like-button_is-active');
  }
  else if (target.classList.contains('card__image')) {        // Это изображение?
    imagePopup.classList.add('popup_is-opened');

    imagePopup.querySelector('.popup__image').src = target.src;
    imagePopup.querySelector('.popup__caption').textContent = card.querySelector('.card__title').textContent;
    imagePopup.querySelector('.popup__image').alt = String("Фотография " + card.querySelector('.card__title').textContent);
  }
}

function addCardToPage(card) /* Добавление новой карты на страницу */ {   
  placesList.insertAdjacentElement("afterbegin", card);
}

cardPopup.querySelector('.popup__button').addEventListener('click', 
  function(evt){
    evt.preventDefault();
    addCardToPage(createCard(
      cardPopup.querySelector('.popup__input_type_url').value, 
      cardPopup.querySelector('.popup__input_type_card-name').value)
    );

    closeModal(cardPopup);
    cardPopup.querySelector('.popup__input_type_card-name').value = '';
    cardPopup.querySelector('.popup__input_type_url').value = '';  
  }
);

function createCardDefault() /* Инициализация карт по умолчанию */ {
  for (let i = 0; i < initialCards.length; i++){
    cardsArray.push(createCard(initialCards[i].link, initialCards[i].name));
  }
  for (let i = cardsArray.length - 1; i >= 0; i--){
    addCardToPage(cardsArray[i]);
  }
}




placesList.addEventListener('click', (evt) => { cardHandler(evt) });
createCardDefault();
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
enableValidation(validationSettings);



