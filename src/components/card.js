import { getInitialCards, addNewCard, deleteCard, likeCard, unlikeCard } from './api.js';
import { openModal } from './modal.js';

export { loadInitialCards, handleAddCard, openImagePopup };

// Функция создания карточки
export function createCard(data, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeCount = cardElement.querySelector('.card__like-counter');

    cardImage.alt = data.name;
    cardImage.src = data.link;
    cardTitle.textContent = data.name;
    likeCount.textContent = data.likes.length;

    if (data.owner._id !== userId) {
        deleteButton.style.display = 'none';
    }

    deleteButton.addEventListener('click', () => handleDeleteCard(data._id, cardElement));
    likeButton.addEventListener('click', () => {
        if (likeButton.classList.contains('card__like-button_active')) {
            handleUnlikeCard(data._id, likeButton, likeCount);
        } else {
            handleLikeCard(data._id, likeButton, likeCount);
        }
    });
    cardImage.addEventListener('click', () => openImagePopup(data.link, data.name));

    if (data.likes.some((like) => like._id === userId)) {
        likeButton.classList.add('card__like-button_active');
    }

    return cardElement;
}

// Функция добавления карточки в контейнер
function renderCard(cardElement) {
    const cardContainer = document.querySelector('.places__list');
    cardContainer.prepend(cardElement);
}

// Загрузка начальных карточек
function loadInitialCards(userId) {
    getInitialCards()
        .then((cards) => {
            cards.forEach((card) => {
                const cardElement = createCard(card, userId);
                renderCard(cardElement);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

// Обработчик добавления новой карточки
function handleAddCard(formData) {
    addNewCard(formData.name, formData.link)
        .then((newCard) => {
            const cardElement = createCard(newCard, newCard.owner._id);
            renderCard(cardElement);
        })
        .catch((err) => {
            console.log(err);
        });
}

// Обработчик удаления карточки
function handleDeleteCard(cardId, cardElement) {
    deleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}

// Обработчик лайка карточки
function handleLikeCard(cardId, likeButton, likeCount) {
    likeCard(cardId)
        .then((updatedCard) => {
            likeButton.classList.add('card__like-button_is-active');
            likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
}

// Обработчик дизлайка карточки
function handleUnlikeCard(cardId, likeButton, likeCount) {
    unlikeCard(cardId)
        .then((updatedCard) => {
            likeButton.classList.remove('card__like-button_is-active');
            likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
}

// Функция открытия попапа картинки
function openImagePopup(link, name) {
    const popupImage = document.querySelector('.popup_type_image');
    const popupImagePicture = popupImage.querySelector('.popup__image');
    const popupImageCaption = popupImage.querySelector('.popup__caption');
    popupImagePicture.src = link;
    popupImagePicture.alt = name;
    popupImageCaption.textContent = name;
    openModal(popupImage);
}