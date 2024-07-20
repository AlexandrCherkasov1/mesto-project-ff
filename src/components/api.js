export { getUserInfo, getInitialCards, updateUserInfo, addNewCard, deleteCard, likeCard, unlikeCard, updateAvatar };

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-18',
    headers: {
      authorization: 'd9027374-eb80-4b90-a01a-d8a675ab1b69',
      'Content-Type': 'application/json'
    }
}

// Далее функции
// Вынес в отдельную функцию проверку ответа от сервера
const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Получение информации о пользователе
const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(checkResponse);
}

// Получение начальных карточек
const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(checkResponse);
}

// Обновление информации о пользователе
const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(checkResponse);
}

// Добавление новой карточки
const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(checkResponse);
}

// Функция для удаления карточки
const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(checkResponse);
}
  
// Лайк карточки
const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
      .then(checkResponse);
}
  
// Удаление лайка
const unlikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(checkResponse);
}
  
// Обновления аватарки пользователя
const updateAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then(checkResponse);
}

export const headValidUrl = (linkImage) => {
    return fetch(`${linkImage}`, {
      method: 'HEAD'
    })
    .then((res) => {
      if (res.ok) {
        return res.headers.get('content-type')
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}