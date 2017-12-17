<template>
<div>
	<div class="row">
    <div class="col-lg-12 col-xl-6">
			<div class="card-box widget-box-1">
				<h2 class="font-20">Mes infos</h2>
				<hr>
				<h4 class="font-18"><b>Mon pseudo :</b> {{ pseudo }}</h4>
				<h4 class="font-18"><b>Mon email :</b> {{ email }}</h4>
			</div>
				<div class="card-box widget-box-1">
						<h2 class="font-20">Supprimer mon compte</h2>
						<div class="col-3">
							<button class="btn btn-pink btn-block text-uppercase waves-effect waves-light" @click="delAccount()">Supprimer</button>
						</div>
				</div>
	</div>

	 <div class="col-lg-12 col-xl-6">
		<div class="card-box widget-box-1">
				<h2 class="font-20">Ma colloc</h2>
				<hr>
				<h4 class="font-18"><b>Nom :</b> {{ collocName }}	</h4>
				<br>
				<h4 class="font-18"><b>Membres :</b> </h4>

				<ul style="list-style-type: none;">
				<li v-for="m in members">
					<div class="row">
							<p class="text-left">{{ m }}</p>
					</div>
				</li>
			</ul>
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
			members: ['cul', 'bite', 'ta mère']
		};
	},
	methods: {
		delAccount: function () {
			this.$http.delete(config.url + 'RoomMates/' + auth.getAuthId(), auth.getAuthHeader());
			auth.logout('Login');
		}

	},
	beforeCreate () {
		this.$http.get(config.url + 'RoomMates/' + auth.getAuthId(), auth.getAuthHeader()).then(response => {
			this.pseudo = response.body.username;
			this.email = response.body.email;
			this.collocName = response.body.colloc;
		});
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
