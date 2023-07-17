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

  getIngredients() {
    return this._request(`${this._baseUrl}/ingredients`, {
      headers: {
        ...this._headers,
      },
    });
  }

  postOrder(ingredients) {
    return fetch(`${this._baseUrl}/orders`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    }).then(this._getRequestResult);
  }

  register(userData) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        name: userData.name,
      }),
    }).then(this._getRequestResult);
  }

  login(userData) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    }).then(this._getRequestResult);
  }

  refreshToken() {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        token: localStorage.getItem("refresh_token"),
      }),
    }).then(this._getRequestResult);
  }

  logout() {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        token: localStorage.getItem("refresh_token"),
      }),
    }).then(this._getRequestResult);
  }

  editUserInfo(newUserInfo) {
    const userObj = {
      email: newUserInfo.email,
      password: newUserInfo.password,
      name: newUserInfo.name,
    };

    if (userObj.password === "") delete userObj.password;

    return fetch(`${this._baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(userObj),
    }).then(this._getRequestResult);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then(this._getRequestResult);
  }

  forgotPassword(email) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
      }),
    }).then(this._getRequestResult);
  }

  resetPassword(password, token) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    }).then(this._getRequestResult);
  }
}

// Создание экземпляра класса Api
const mainApi = new MainApi({
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
