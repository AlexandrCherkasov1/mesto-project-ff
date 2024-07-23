export { getUserInfo, getInitialCards, updateUserInfo, addNewCard, deleteCard, likeCard, unlikeCard, updateAvatar, headValidUrl };

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: 'd9027374-eb80-4b90-a01a-d8a675ab1b69',
    'Content-Type': 'application/json'
  }
}

// Универсальная функция запроса с проверкой ответа
const request = (endpoint, options) => {
  return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse);
}

// Проверка ответа от сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Получение информации о пользователе
const getUserInfo = () => {
  return request('/users/me', {
    headers: config.headers
  });
}

// Получение начальных карточек
const getInitialCards = () => {
  return request('/cards', {
    headers: config.headers
  });
}

// Обновление информации о пользователе
const updateUserInfo = (name, about) => {
  return request('/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}

// Добавление новой карточки
const addNewCard = (name, link) => {
  return request('/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  });
}

// Функция для удаления карточки
const deleteCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

// Лайк карточки
const likeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  });
}

// Удаление лайка
const unlikeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

// Обновление аватарки пользователя
const updateAvatar = (avatarUrl) => {
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  });
}

// Проверка валидности URL
const headValidUrl = (linkImage) => {
  return fetch(linkImage, {
    method: 'HEAD'
  })
  .then((res) => {
    if (res.ok) {
      return res.headers.get('content-type');
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}