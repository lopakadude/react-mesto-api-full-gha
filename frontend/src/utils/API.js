class Api {
	constructor(settings) {
		this.baseUrl = settings.baseUrl;
		this.headers = settings.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`Ошибка: ${res.status}`);
	}

	_request(endpoint, options) {
		return fetch(`${this.baseUrl}/${endpoint}`, options)
			.then(this._checkResponse);
	};

	getUserInfo() {
		this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
		return this._request(`users/me`, {
			method: 'GET',
			headers: this.headers,
		})
	}

	setUserInfo(data) {
		return this._request(`users/me`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		})
	}

	setChangeAvatar(info) {
		return this._request(`users/me/avatar`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				avatar: info.avatar
			})
		})
	}

	getInitialCards() {
		return this._request(`cards`, {
			method: 'GET',
			headers: this.headers
		})
	}

	postNewCard(data) {
		return this._request(`cards`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				name: data.name,
				link: data.link
			})
		})
	}

	deleteCard(cardId) {
		return this._request(`cards/${cardId}`, {
			method: 'DELETE',
			headers: this.headers
		})
	}

	_likeCard(cardId) {
		return this._request(`cards/${cardId}/likes`, {
			method: 'PUT',
			headers: this.headers
		})
	}

	_unlikeCard(cardId) {
		return this._request(`cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: this.headers
		})
	}

	changeLikeCardStatus(cardId, isLiked) {
		if (!isLiked) {
			return this._likeCard(cardId)
		}
		else {
			return this._unlikeCard(cardId)
		}
	}
}

export const api = new Api({
	baseUrl: 'https://api.express.lopakadude.nomoredomains.xyz',
	headers: {
		authorization: `Bearer ${localStorage.getItem('jwt')}`,
		'Content-Type': 'application/json'
	}
});
