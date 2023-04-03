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

  _request(url, options) {
    return fetch(url, options).then(this._getRequestResult);
  }

  getIngredients(token) {
    return this._request(`${this._baseUrl}/ingredients`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    });
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