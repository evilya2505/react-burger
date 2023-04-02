class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getRequestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getIngredients(token) {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    })
      .then(this._getRequestResult);
  }
}

// Создание экземпляра класса Api
const mainApi = new MainApi({
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;