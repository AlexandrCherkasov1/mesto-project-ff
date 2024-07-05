// Функция создания карточки
export function createCard(element, deleteCard, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const elementCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = elementCard.querySelector('.card__delete-button');
    const likeButton = elementCard.querySelector('.card__like-button');
    const cardImage = elementCard.querySelector('.card__image');
    const cardTitle = elementCard.querySelector('.card__title');

    cardImage.alt = element.name;
    cardImage.src = element.link;
    cardTitle.textContent = element.name;

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
