function closeByEsc(evt, popupElement) {     
  if (evt.key === 'Escape') {    
    closeModal(popupElement);
  } 
}

export function openModal(popup) {  
  popup.classList.add('popup_is-opened');  
  
  document.addEventListener('keydown', 
    (evt) => { closeByEsc(evt, popup) } 
  );
  
  window.onclick = function(event) {
    if (event.target == popup) {
      closeModal(popup);
    }
  }
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown',
    (evt) => { closeByEsc(evt, popup) } 
  );  
}