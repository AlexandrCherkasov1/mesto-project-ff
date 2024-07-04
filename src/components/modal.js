export function closeModalEsc(evt) {
    if (evt.key === 'Escape') {
      closeModal(document.querySelector('.popup_is-opened'));
    };
}
  
//Закрытие попапа
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
}
  
//Открытие попапа
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
}