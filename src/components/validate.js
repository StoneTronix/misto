export function enableValidation(settings) {
  // Создание объекта с настройками валидации
  // const validationSettings = {
  //   formSelector: '.popup__form',
  //   inputSelector: '.popup__input',
  //   submitButtonSelector: '.popup__button',
  //   inactiveButtonClass: 'popup__button_disabled',
  //   inputErrorClass: 'popup__input_type_error',
  //   errorClass: 'popup__error_visible'
  // }
  
  var formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener( 'submit', (evt) => { evt.preventDefault() } );
    setEventListeners(formElement, settings);
  }); 
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, submitButton, settings);   // Кнопка подтверждения отключается заранее 
  
  inputList.forEach((element) => {
    element.addEventListener('input',   // Проверка повторяется во время ввода каждого символа
      () => {
        checkInputValidity(formElement, element, settings);
        toggleButtonState(inputList, submitButton, settings); 
      }
    );
  });
}

function checkInputValidity(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  if (!inputElement.validity.valid) {
    const errorMessage = inputElement.validationMessage;
    
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  } else {    
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);    
  }
}

function toggleButtonState(inputList, submitButton, settings) {
  function hasInvalidInput (inputList) {
    return inputList.some(
      (inputElement) => {
        return !inputElement.validity.valid;
      }
    ); 
  }

  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(settings.inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(settings.inactiveButtonClass);
  }
}
