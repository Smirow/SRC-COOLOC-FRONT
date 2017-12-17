import router from '../router';
import config from '../config';

const API_URL = config.url;
const LOGIN_URL = API_URL + 'RoomMates/login/';
const SIGNUP_URL = API_URL + 'RoomMates';

export default {

	user: {
		authenticated: false
	},

	login (context, creds, redirect) {
		context.$http.post(LOGIN_URL, creds)
		.then((data) => {
			localStorage.setItem('userId', data.body.userId);
			localStorage.setItem('access_token', data.body.id);

			this.user.authenticated = true;

			context.$http.get(API_URL + 'RoomMates/' + localStorage.getItem('userId'), {
				headers: {
					'Authorization': localStorage.getItem('access_token')
				}
			})
			.then((data) => {
				console.log(data);
				if (!data.body.colloc) {
					router.push({ name: SignColoc });
				}
				localStorage.setItem('username', data.body.username);
				localStorage.setItem('email', data.body.email);
				context.$http.get(API_URL + 'RoomMates/' + localStorage.getItem('userId'), {
					headers: {
						'Authorization': localStorage.getItem('access_token')
					}
				})
				.then((data) => {
					if (!data.body.id) {
						router.push({ name: SignColoc });
					}
					localStorage.setItem('colloc', data.body.colloc);
					if (redirect) {
						router.push({ name: redirect });
					}
				}).catch((err) => { context.error = 'Erreur inconnue (' + err + ').'; });
			}).catch((err) => { context.error = 'Erreur inconnue (' + err + ').'; });
		})
		.catch((err) => {
			if (err.status === 400) context.error = 'Merci de rentrer un identifiant et un mot de passe.';
			else if (err.status === 401) context.error = 'Mauvais Identifiant/Mot de passe';
			else context.error = 'Erreur inconnue (' + err + ').';
		});
	},

	signup (context, creds, redirect) {
		context.$http.post(SIGNUP_URL, creds)
		.then((data) => {
			// localStorage.setItem('userId', data.userId);
			// localStorage.setItem('access_token', data.id);

			// this.user.authenticated = true;

			if (redirect) {
				router.push({ name: redirect });
			}
		}).catch((err) => {
			context.error = err;
		});
	},

	logout (redirect) {
		localStorage.removeItem('userId');
		localStorage.removeItem('access_token');
		localStorage.removeItem('colloc');
		localStorage.removeItem('email');
		localStorage.removeItem('username');
		this.user.authenticated = false;

		if (redirect) {
			router.push({ name: redirect });
		}
	},

	checkAuth () {
		let jwt = localStorage.getItem('userId');
		if (jwt) {
			this.user.authenticated = true;
		} else {
			this.user.authenticated = false;
		}
	},

	getAuthHeader () {
		return {
			headers: {
				'Authorization': localStorage.getItem('access_token')
			}
		};
	},

	getAuthSignupHeader () {
		return {
			headers: {
				'Authorization': localStorage.getItem('access_signup_token')
			}
		};
	},

	getAuthId () {
		return localStorage.getItem('userId');
	},

	getCollocId () {
		return localStorage.getItem('colloc');
	}
};
