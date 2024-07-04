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

//Открытие попапа с картинкой
export function openImagePopup(link, name) {
    const popupImage = document.querySelector('.popup_type_image');
    const popupImagePicture = popupImage.querySelector('.popup__image');
    const popupImageCaption = popupImage.querySelector('.popup__caption');

    popupImagePicture.src = link;
    popupImagePicture.alt = name;
    popupImageCaption.textContent = name;
    openModal(popupImage);
}