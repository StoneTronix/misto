/*
@todo: Темплейт карточки
@todo: DOM узлы
@todo: Функция создания карточки
@todo: Функция удаления карточки
@todo: Вывести карточки на страницу
*/

// Анимация всплывающим окнам
const popups = document.querySelectorAll('.popup'); 
for (let i = 0; i < popups.length; i++){
    popups[i].classList.add('popup_is-animated');
}

// Работа со всплывающими окнами
const profilePopup = document.querySelector('.popup_type_edit');
const profilePopupClose = profilePopup.querySelector('.popup__close');
profilePopupClose.addEventListener('click', function(){
  profilePopup.classList.remove('popup_is-opened');
});

const cardPopup = document.querySelector('.popup_type_new-card');
const cardPopupClose = cardPopup.querySelector('.popup__close');
cardPopupClose.addEventListener('click', function(){
  cardPopup.classList.remove('popup_is-opened');
});

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupClose = imagePopup.querySelector('.popup__close');
imagePopupClose.addEventListener('click', function(){
  imagePopup.classList.remove('popup_is-opened');
});

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

// Редактирование профиля
profileEditButton = document.querySelector('.profile__edit-button'); 
profileEditButton.addEventListener('click', function(){
  const profileFormElement = document.querySelector(".popup__form");   // Находим поля формы в DOM    
  const nameInput = profileFormElement.querySelector(".popup__input_type_name");
  const jobInput = profileFormElement.querySelector(".popup__input_type_description")

  profileFormElement.addEventListener('submit', handleProfileFormSubmit); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  profilePopup.classList.add('popup_is-opened');
});

profilePopup.querySelector('.popup__button').addEventListener('click', function(evt){
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = profilePopup.querySelector('.popup__input_type_name').value;
  document.querySelector('.profile__description').textContent = profilePopup.querySelector('.popup__input_type_description').value;
  profilePopup.classList.remove('popup_is-opened');
});


// Добавление карточек
profileAddButton = document.querySelector('.profile__add-button');  
profileAddButton.addEventListener('click', function(){
  cardPopup.classList.add('popup_is-opened');
});
cardPopup.querySelector('.popup__button').addEventListener('click', function(evt){
  evt.preventDefault();
  addCardToPage(createCard(cardPopup.querySelector('.popup__input_type_url').value, cardPopup.querySelector('.popup__input_type_card-name').value))
  cardPopup.classList.remove('popup_is-opened');
  cardPopup.querySelector('.popup__input_type_url').value = '';
  cardPopup.querySelector('.popup__input_type_card-name').value = '';
});


// Работа с картами 
const cardTemplate = document.querySelector("#template").content;
function createCard(link, name){    
  const currentCard = cardTemplate.querySelector('.places__item').cloneNode(true);  // Скопировали карту
  
  currentCard.querySelector('.card__image').src = link;  
  currentCard.querySelector('.card__description').querySelector('.card__title').textContent = name; // Выбрали и добавили описание
  return currentCard;
}


// Конструктор по умолчанию
function createCardDefault(){
  const cardsArray = [];
  for (let i = 0; i < initialCards.length; i++){
    cardsArray.push(createCard(initialCards[i].link, initialCards[i].name));
  }
  for (let i = 0; i < initialCards.length; i++){
    const deleteCardButton = cardsArray[i].querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function(evt){
        cardsArray[i].style = ('display: none');
    });

    const likeCardButton = cardsArray[i].querySelector('.card__like-button');
    likeCardButton.addEventListener('click', function(){
      likeCardButton.classList.toggle('card__like-button_is-active');
    });

    const imageOpenCard = cardsArray[i].querySelector('.card__image');
    imageOpenCard.addEventListener('click', function(){
      imagePopup.classList.add('popup_is-opened');
      imagePopup.querySelector('.popup__image').src = imageOpenCard.src;
      imagePopup.querySelector('.popup__caption').textContent = cardsArray[i].querySelector('.card__title').textContent;
      imagePopup.querySelector('.popup__image').alt = String("Фотография " + cardsArray[i].querySelector('.card__title').textContent);
    });
  }
  return cardsArray;
}


// Добавление новой карты на страницу
function addCardToPage(card){
  const deleteCardButton = card.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', function(){
    card.style = ('display: none');
  });

  const likeCardButton = card.querySelector('.card__like-button');
  likeCardButton.addEventListener('click', function(){
    likeCardButton.classList.toggle('card__like-button_is-active');
  });

  const imageOpenOnClick = card.querySelector('.card__image');
  const imageOpenCard = card.querySelector('.card__image');
    imageOpenCard.addEventListener('click', function(){
      imagePopup.classList.add('popup_is-opened');
      imagePopup.querySelector('.popup__image').src = imageOpenCard.src;
      imagePopup.querySelector('.popup__caption').textContent = card.querySelector('.card__title').textContent;
      imagePopup.querySelector('.popup__image').alt = String("Фотография " + card.querySelector('.card__title').textContent);
    });

  placesList.querySelector('.places__item').insertAdjacentElement('beforebegin', card);
}

const cardsArray = createCardDefault();
const placesList = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
for (let i = 0; i< cardsArray.length; i++){
  placesList.append(cardsArray[i]);
}