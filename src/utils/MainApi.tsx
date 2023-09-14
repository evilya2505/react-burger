import { TIngredientItem, TOrder, TUserInfo } from "../services/types/data";

class MainApi {
  private _baseUrl: string;
  private _headers: Record<string, string>;

  constructor(options: { baseUrl: string; headers: Record<string, string> }) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  private _getRequestResult<T>(res: Response): Promise<T> {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getIngredients(): Promise<{ data: TIngredientItem[] }> {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: {
        ...this._headers,
      },
    }).then((res) => this._getRequestResult<{ data: TIngredientItem[] }>(res));
  }

  postOrder(
    ingredients: Array<TIngredientItem>
  ): Promise<{ name: string; order: { number: number }; success: boolean }> {
    return fetch(`${this._baseUrl}/orders`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    }).then((res) =>
      this._getRequestResult<{
        name: string;
        order: { number: number };
        success: boolean;
      }>(res)
    );
  }

  register(userData: TUserInfo): Promise<{
    success: boolean;
    user: TUserInfo;
    accessToken: string;
    refreshToken: string;
  }> {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        name: userData.name,
      }),
    }).then((res) =>
      this._getRequestResult<{
        success: boolean;
        user: TUserInfo;
        accessToken: string;
        refreshToken: string;
      }>(res)
    );
  }

  login(userData: TUserInfo): Promise<{
    success: boolean;
    user: TUserInfo;
    accessToken: string;
    refreshToken: string;
  }> {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    }).then((res) =>
      this._getRequestResult<{
        success: boolean;
        user: TUserInfo;
        accessToken: string;
        refreshToken: string;
      }>(res)
    );
  }

  refreshToken(): Promise<{
    success: boolean;
    accessToken: string;
    refreshToken: string;
  }> {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        token: localStorage.getItem("refresh_token"),
      }),
    }).then((res) =>
      this._getRequestResult<{
        success: boolean;
        accessToken: string;
        refreshToken: string;
      }>(res)
    );
  }

  logout(): Promise<{ success: boolean; message: string }> {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        token: localStorage.getItem("refresh_token"),
      }),
    }).then((res) =>
      this._getRequestResult<{ success: boolean; message: string }>(res)
    );
  }

  editUserInfo(newUserInfo: TUserInfo): Promise<{
    success: boolean;
    user: TUserInfo;
  }> {
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
    }).then((res) =>
      this._getRequestResult<{
        success: boolean;
        user: TUserInfo;
      }>(res)
    );
  }

  getUserInfo(): Promise<{
    success: boolean;
    user: TUserInfo;
  }> {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then((res) =>
      this._getRequestResult<{
        success: boolean;
        user: TUserInfo;
      }>(res)
    );
  }

  forgotPassword(email: string): Promise<{ email: string }> {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
      }),
    }).then((res) => this._getRequestResult<{ email: string }>(res));
  }

  resetPassword(
    password: string,
    token: string
  ): Promise<{ success: boolean; message: string }> {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    }).then((res) =>
      this._getRequestResult<{ success: boolean; message: string }>(res)
    );
  }

  getOrder(
    number: string | undefined
  ): Promise<{ orders: TOrder[]; success: boolean }> {
    return fetch(`${this._baseUrl}/orders/${number}`, {
      method: "GET",
      headers: {
        ...this._headers,
      },
    }).then((res) =>
      this._getRequestResult<{ orders: TOrder[]; success: boolean }>(res)
    );
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
