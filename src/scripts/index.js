import '../pages/index.css';
import { createCard, deleteCard } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';
import { initialCards } from '../components/cards.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const popupAddForm = popupAddCard.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const cardTitle = popupAddCard.querySelector('.popup__input_type_card-name');
const cardLink = popupAddCard.querySelector('.popup__input_type_url');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    const elementCard = createCard(element, deleteCard);
    placesList.append(elementCard);
})

//Попап редактирования
buttonEdit.addEventListener('click', function() {
    openModal(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
});

//Попап добавления
buttonAddCard.addEventListener('click', function(){
    openModal(popupAddCard);
    popupAddForm.reset();
});

//Сохранение форм
formElement.addEventListener('submit', function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEdit);
});

popupAddForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCard = createCard({ name: cardTitle.value, link: cardLink.value }, deleteCard);
    placesList.prepend(newCard);
    closeModal(popupAddCard);
    popupAddForm.reset();
});

popups.forEach((popup) =>{
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
        closeModal(popup);
      }
    });
});