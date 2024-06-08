// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(element, deleteCard) {
    const elementCard = cardTemplate.querySelector('.places__item').cloneNode(true);    
    const deleteButton = elementCard.querySelector('.card__delete-button');

    elementCard.querySelector('.card__image').alt = element.name;
    elementCard.querySelector('.card__image').src = element.link;
    elementCard.querySelector('.card__title').textContent = element.name;

    deleteButton.addEventListener('click', deleteCard);
    
    return elementCard;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    const elementCard = createCard(element, deleteCard);
    placesList.append(elementCard);
})
