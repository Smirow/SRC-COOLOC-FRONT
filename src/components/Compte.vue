<template>
<div>
	<div class="row">
    <div class="col-lg-12 col-xl-6">
			<div class="card-box widget-box-1">
				<h2>Mes infos</h2>
				<hr>
				<h4><b>Mon pseudo :</b> {{ pseudo }}</h4>
				<h4><b>Mon email :</b> {{ email }}</h4>
			</div>
				<div class="card-box widget-box-1">
						<h2>Supprimer mon compte</h2>
						<div class="col-3">
							<button class="btn btn-pink btn-block text-uppercase waves-effect waves-light" @click="delAccount()">Supprimer</button>
						</div>
				</div>
	</div>

	 <div class="col-lg-12 col-xl-6">
		<div class="card-box widget-box-1">
				<h2>Ma colloc</h2>
				<hr>
				<h4><b>Nom :</b> {{ collocName }}	</h4>
				<br>
				<h4><b>Membres :</b> </h4>
				<br>
				<ul style="list-style-type:circle" v-for="roommate in roomates" :key="roommate.id">
					<li>{{ roommate.username }}</li>
				</ul>
				<br>
				<h4> Inviter mes COOLOCataires </h4>
				<div class="form-group p-t-10" >
					<div class="row">
						<div class="col-8">
							<input v-model="inviteEmail" class="form-control" type="email" required="" placeholder="Email">
						</div>
						<div class="col-4">
							<a class="btn btn-pink btn-block text-uppercase waves-effect waves-light" @click="inviteEmailFunc()">Ajouter</a>
						</div>
						<span v-if="inviteMessage" class="p-t-10 p-l-10">
							{{inviteMessage}}
						</span>
					</div>
				</div>
		</div>
	</div>

	</div>

</div>
</template>

<script>
import config from '../config';
import auth from '../auth';
export default {
	name: 'Compte',
	data () {
		return {
			pseudo: '',
    		email: '',
			collocName: '',
			roomates: [],
			inviteEmail: '',
			inviteMessage: '',
		};
	},
	beforeCreate () {
		var id_colloc = '';
		this.$http.get(config.url + 'RoomMates/' + auth.getAuthId(), auth.getAuthHeader()).then(response => {
			this.pseudo = response.body.username;
			this.email = response.body.email;
			this.$http.get(config.url + 'Collocs/' + response.body.colloc, auth.getAuthHeader())
			.then(response => {
				this.collocName = response.body.name;
			});

			this.$http.get(config.url + 'Collocs/' + response.body.colloc + '/room-mate', auth.getAuthHeader())
			.then(response => {
				for (var i in response.body) {
					this.members.push(response.body[i].username);
				}
			});
		});
	},
	created () {
		this.fetchRoomMates();
	},
	methods: {
		delAccount: function () {
			this.$http.delete(config.url + 'RoomMates/' + auth.getAuthId(), auth.getAuthHeader());
			auth.logout('Login');
		},
		fetchRoomMates: function (cb) {
			this.$http.get(config.url + 'collocs/' + auth.getCollocId() + '/room-mate', auth.getAuthHeader())
			.then((data) => {
				this.roomates = data.body;
				if (cb) cb();
			}).catch((err) => {
				console.log(err);
			});
		},
		inviteEmailFunc: function () {
			this.$http.get(config.url + 'Collocs/' + auth.getCollocId() + '/' + 'invitation').then(response => {
				let found = response.body.find(checkIfInvitExist(this.inviteEmail));
				if (!found) {
					this.$http.post(config.url + 'Collocs/' + auth.getCollocId() + '/' + 'invitation',
					{ email: this.inviteEmail })
					.then(response => {
						this.inviteEmail = '';
						this.inviteMessage = 'Votre COOLOCataire à été invité !';
					})
					.catch((err) => { this.inviteMessage = 'Une erreur est survenue.'; });
				} else this.inviteMessage = 'Vous avez déja invité ce COOLOCataire !';
			});

			function checkIfInvitExist (email) {
				return function _findByEmail (element) {
					return element.email == email;
				};
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
