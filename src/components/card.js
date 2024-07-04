import { openImagePopup } from './modal.js';

// Функция создания карточки
export function createCard(element, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const elementCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = elementCard.querySelector('.card__delete-button');
    const likeButton = elementCard.querySelector('.card__like-button');
    const cardImage = elementCard.querySelector('.card__image');

    elementCard.querySelector('.card__image').alt = element.name;
    elementCard.querySelector('.card__image').src = element.link;
    elementCard.querySelector('.card__title').textContent = element.name;

    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeCard);
    cardImage.addEventListener('click', () => openImagePopup(element.link, element.name));

    return elementCard;
}

//Функция удаления карточки
export function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

//Функция лайка карточки
export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}
