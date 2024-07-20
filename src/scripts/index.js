import '../pages/index.css';
import { createCard, openImagePopup } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
import { getUserInfo, getInitialCards, updateUserInfo, updateAvatar } from '../components/api.js';
import { enableValidation } from '../components/validation.js';

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileform = popupEdit.querySelector('.popup__form');
const popupAddForm = popupAddCard.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const cardTitle = popupAddCard.querySelector('.popup__input_type_card-name');
const cardLink = popupAddCard.querySelector('.popup__input_type_url');

// Переменные для попапа обновления аватара
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarPopup.querySelector('#avatar-url_input');
const avatarImage = document.querySelector('.profile__image');

// Загрузка начальных карточек и информации о пользователе
Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, initialCards]) => {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        avatarImage.src = userData.avatar;

        initialCards.forEach((card) => {
            const cardElement = createCard(card, userData._id);
            placesList.append(cardElement);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Попап редактирования профиля
buttonEdit.addEventListener('click', function () {
    openModal(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
});

// Попап добавления карточки
buttonAddCard.addEventListener('click', function () {
    openModal(popupAddCard);
    popupAddForm.reset();
});

// Открытие попапа обновления аватара
avatarImage.addEventListener('click', function() {
    openModal(avatarPopup);
});

// Сохранение формы профиля
editProfileform.addEventListener('submit', function handleFormSubmit(evt) {
    evt.preventDefault();
    const saveButton = evt.target.querySelector('.popup__button');
    saveButton.textContent = 'Сохранение...';
    updateUserInfo(nameInput.value, jobInput.value)
        .then((userData) => {
            profileName.textContent = userData.name;
            profileDescription.textContent = userData.about;
            closeModal(popupEdit);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Сохранение формы добавления карточки
popupAddForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const saveButton = evt.target.querySelector('.popup__button');
    saveButton.textContent = 'Сохранение...';
    const newCard = {
        name: cardTitle.value,
        link: cardLink.value,
    };
    // Добавление новой карточки
    addNewCard(newCard.name, newCard.link)
        .then((newCard) => {
            const cardElement = createCard(newCard, newCard.owner._id);
            placesList.prepend(cardElement);
            closeModal(popupAddCard);
            popupAddForm.reset();
        })
        .catch((err) => {
            console.log(err);
        });
});

// Обработчик формы обновления аватара
avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const saveButton = evt.target.querySelector('.popup__button');
    saveButton.textContent = 'Сохранение...';
    updateAvatar(avatarInput.value)
        .then((userData) => {
            avatarImage.src = userData.avatar;
            closeModal(avatarPopup);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Закрытие попапов по кнопке и оверлею
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
            closeModal(popup);
        }
    });
});

// Включение валидации
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
});