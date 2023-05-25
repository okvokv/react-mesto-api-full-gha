// административные запросы
import BaseApi from './BaseApi.js';
class Auth extends BaseApi {
	constructor() {
		super();
		this._headers = { 'Content-Type': 'application/json' };
	}

	//метод регистрации пользователя
	registrate(_email, _password) {
		return this._request('signup', {
			method: 'POST',
			// credentials: 'include', куки должны приходить, когда после регистрации пользователь сразу входит на сайт 
			headers: this._headers,
			body: JSON.stringify({
				email: _email,
				password: _password
			})
		})
	};

	//метод авторизации пользователя
	logIn(_email, _password) {
		return this._request('signin', {
			method: 'POST',
			credentials: 'include', // разрешают браузеру отсылать и принимать куки
			headers: this._headers,
			body: JSON.stringify({
				email: _email,
				password: _password
			})
		})
	};

};

//инициализация класса авторизации
const auth = new Auth();

export default auth;