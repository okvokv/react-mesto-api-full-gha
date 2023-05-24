// информационные запросы
import BaseApi from './BaseApi.js';
class Api extends BaseApi {

	//метод получения данных пользователя
	getUserData() {
		// const token = this._getToken();
		return this._request('users/me', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				// authorization: token,
			}
		})
	};

	//метод получения массива карточек с сервера
	getAllCardsData() {
		return this._request('cards', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			}
		})
	};

	//метод замены аватара пользователя	
	setAvatar(_link) {
		return this._request('users/me/avatar', {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				avatar: _link
			})
		})
	};

	//метод сохранения данных пользователя в профиль на сервер
	setUserInfo(_name, _description) {
		return this._request('users/me', {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
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
		return this._request('cards', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: _cardName,
				link: _cardLink
			})
		})
	};

	//метод удаления своей карточки на сервере и получения информации о результате
	deleteCard(_cardId) {
		return this._request(`cards/${_cardId}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			}
		})
	};

	//метод установки лайка и получения данных о результате
	setLike(_cardId) {
		return this._request(`cards/${_cardId}/likes`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			}
		})
	};

	//метод удаления лайка (поставленного пользователем)
	deleteLike(_cardId) {
		return this._request(`cards/${_cardId}/likes`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			}
		})
	};

};

//инициализация класса запросов к серверу
const api = new Api();

export default api;