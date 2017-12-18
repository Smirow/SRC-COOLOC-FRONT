<template>
	<div>
		<div class="clearfix"></div>
		<a style="cursor: pointer;" @click.prevent="logout()" ><i class="md md-exit-to-app"></i>Se Déconnecter</a>
			<div class="row">
			<div class="col-6">
			<div class="card-box">
				<div class="panel-heading">
					<h3 class="text-center"> Inscrire sa <strong class="text-custom">COOLOC</strong> </h3>
				</div>

				<div class="p-20">
					<form class="form-horizontal m-t-20">

						<div class="form-group ">
							<div class="col-12">
								<input v-model="colName" class="form-control" type="nom" required="" placeholder="Nom">
							</div>
						</div>
					<br><br><br>

						<div class="panel-heading">
							<h3 class="text-center"> Ajouter des <strong class="text-custom">COOLOC</strong>ataires </h3>
						</div>

						<div class="form-group p-20">
							<div class="row">
								<div class="col-8">
									<input v-model="memberEmail" class="form-control" type="email" required="" placeholder="Email">
								</div>
								<div class="col-4">
									<a class="btn btn-pink btn-block text-uppercase waves-effect waves-light" @click="members.push(memberEmail)">Ajouter</a>
								</div>
							</div>
						</div>

						<ul style="list-style-type: none;">
  						<li v-for="(member,index) in members">
								<div class="row">
									<div class="col-9">
    					<p class="text-left">{{ member }}</p>
						</div>
								<div class="col-3">
							<button class="remove" @click="members.splice(index, 1);">Remove</button>
						</div>
							</div>
						</li>
						</ul>

						<div class="form-group">
							<div class="col-12">
								<div class="checkbox checkbox-primary">
									<input id="checkbox-signup" type="checkbox" checked="checked">
									<label for="checkbox-signup">J'accepte les <a href="#">Conditions</a></label>
								</div>
							</div>
						</div>

						<div class="form-group text-center m-t-40">
							<div class="col-12">
								<button @click.prevent="signCol()" class="btn btn-pink btn-block text-uppercase waves-effect waves-light">Inscrire</button>
							</div>
						</div>

					</form>

				</div>
			</div>

		</div>
		<div class="col-6">
			<div class="wrapper-page">
				<div class="card-box">
					<div class="panel-heading">
						<h3 class="text-center"> Vos invitations aux <strong class="text-custom">COOLOC</strong>s</h3>
					</div>
					<br>
					<br>
					<br>

						<ul v-for="invit in invits" style="list-style-type: none;" :key="invit.id">
							<li><div class="row">
								<div class="col-9">
									<p class="text-left">{{ invit.collocName }}</p>
								</div>
								<div class="col-3">
									<button class="remove" @click="acceptColloc(invit.colloc)">Accept</button>
								</div>
							</div>
							</li>
						</ul>


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
	name: 'SignColoc',
	data () {
		return {
			colName: '',
			memberEmail: '',
			members: [],
			invits: []
		};
	},
	created () {
		this.fetchInvit();
	},
	methods: {
		signCol: function () {
			let toPost = {
				name: this.colName
			};

			this.$http.post(config.url + 'Collocs', toPost)
			.then((response) => {
				let collocId = response.body.id;
				for (let toInvite of this.members) {
					this.$http.post(config.url + 'Collocs/' + collocId + '/' + 'invitation',
						{ email: toInvite });
				}
				this.$http.post(config.url + 'RoomMates/' + auth.getAuthId() + '/setColloc',
				{ collocId: collocId }, auth.getAuthHeader())
				.then(() => { localStorage.setItem('colloc', collocId); this.$router.push('/'); })
				.catch((err) => { console.log(err); });
			})
			.catch((err) => { console.log(err); });
		},
		acceptColloc: function (collocId) {
			this.$http.post(config.url + 'RoomMates/' + auth.getAuthId() + '/setColloc',
			{ collocId: collocId }, auth.getAuthHeader())
			.then(() => { localStorage.setItem('colloc', collocId); this.$router.push('/'); })
			.catch((err) => { console.log(err); });
		},
		fetchInvit: function () {
			this.$http.get(config.url + 'invitations/?filter=%7B%22where%22%3A%20%7B%22email%22%3A%20%22' +
			localStorage.getItem('email') + '%22%7D%7D')
			.then((response) => {
				for (let invit of response.body) {
					if (invit.colloc) {
						this.$http.get(config.url + 'Collocs/' + invit.colloc)
						.then((data) => {
							invit.collocName = data.body.name;
							this.invits.push(invit);
						});
					}
				}
			})
			.catch((err) => { console.log(err); });
		},
		logout () {
			console.log('hey');
			auth.logout('Login');
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.remove {
	background: none;
	color : grey;
	border: none;
	cursor: pointer;
}
</style>
