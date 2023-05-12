// информационные запросы
import BaseApi from './BaseApi.js';
class Api extends BaseApi {

	//метод получения данных пользователя
	getUserData() {
		const token = this._getToken();
		return this._request('users/me', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
				credentials: 'include'
			}
		})
	};

	//метод получения массива карточек с сервера
	getAllCardsData() {
		const token = this._getToken();
		return this._request('cards', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
				credentials: 'include'
			}
		})
	};

	//метод замены аватара пользователя	
	setAvatar(_link) {
		const token = this._getToken();
		return this._request('users/me/avatar', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
				credentials: 'include'
			},
			body: JSON.stringify({
				avatar: _link
			})
		})
	};

	//метод сохранения данных пользователя в профиль на сервер
	setUserInfo(_name, _description) {
		const token = this._getToken();
		return this._request('users/me', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
				credentials: 'include'
			},
			body: JSON.stringify({
				name: _name,
				about: _description
			})
		})
	};

	//------------------------------------------------------------------------------
	//метод добавления новой карточки на сервер и получения информации о результате
	addNewCard(_cardName, _cardLink) {
		const token = this._getToken();
		return this._request('cards', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
				credentials: 'include'
			},
			body: JSON.stringify({
				name: _cardName,
				link: _cardLink
			})
		})
	};

	//метод удаления своей карточки на сервере и получения информации о результате
	deleteCard(_cardId) {
		const token = this._getToken();
		return this._request(`cards/${_cardId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
				credentials: 'include'
			}
		})
	};

	//метод установки лайка и получения данных о результате
	setLike(_cardId) {
		const token = this._getToken();
		return this._request(`cards/${_cardId}/likes`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
				credentials: 'include'
			}
		})
	};

	//метод удаления лайка (поставленного пользователем)
	deleteLike(_cardId) {
		const token = this._getToken();
		return this._request(`cards/${_cardId}/likes`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
				credentials: 'include'
			}
		})
	};

};

//инициализация класса запросов к серверу
const api = new Api();

export default api;