<template>
	<div>
		<div class="row">
			<div class="col-12">
					<div class="card-box">
							<h4 class="m-t-0 header-title">Dépenses <a class="pull-right md md-note-add" @click="showModal = true"></a></h4>
							<table class="table">
							<thead>
								<tr>
									<th>Créateur</th>
									<th>Domaine</th>
									<th>Description</th>
									<th>Date</th>
									<th>Participation(s)</th>
									<th>Prix</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="depense in depenses" :key="depense.id">
									<td>{{ depense.creatorUsername }}</td>
									<td>{{ depense.domaine }}</td>
									<td>{{ depense.description }}</td>
									<td>{{ new Date(Date(depense.date)).getDate() + '/' + (new Date(Date(depense.date * 1000)).getMonth()+1) + '/' + new Date(Date(depense.date * 1000)).getFullYear()}}</td>
									<td><span v-for="participation in depense.participations" v-if="participation.amount > 0" :key="participation.id" >{{participation.username}}: {{participation.amount}}€ </span></td>
									<td>{{ depense.price }} €</td>
									<td> <button class="btn btn-danger btn-rounded waves-effect waves-light" @click="deleteDep(depense.id)">Remove</button> </td>

								</tr>
							</tbody>
							</table>
					</div>
			</div>
		</div>

		<modalDepenses v-if="showModal" @close="showModal = false"></modalDepenses>
	</div>
</template>

<script>
import modalDepenses from './modalDepense';
import auth from '../auth';
import config from '../config';
export default {
	name: 'Depenses',
	components: {
		modalDepenses
	},
	data () {
		return {
			showModal: false,
			depenses: [],
			roomMates: []
		};
	},
	beforeCreate () {
		if (!auth.user.authenticated) {
			this.$router.push('Login');
		} else if (!auth.getCollocId()) this.$router.push({ name: 'SignColoc' });
	},
	created: function () {
		this.fetchDepenses();
	},
	methods: {
		fetchDepenses: function () {
			this.$http.get(config.url + 'collocs/' + auth.getCollocId() + '/depenses', auth.getAuthHeader())
			.then((data) => {
				this.depenses = data.body;
				this.findUsernames();
			}).catch((err) => {

			});
		},
		fetchRoomMates: function () {
			this.$http.get(config.url + 'collocs/' + auth.getCollocId() + '/room-mate', auth.getAuthHeader())
			.then((data) => {
				this.roomMates = data.body;
				console.log(this.roomMates);
			}).catch((err) => {

			});
		},
		findUsernames: function () {
			for (let depense of this.depenses) {
				for (let participation of depense.participations) {
					participation.username = findMateNameById(participation.id);
				}
			}
		},
		findMateNameById: function (id) {
			return this.roomates.find(_find(id)).username;
			function _find (id) {
				return function __find (element) {
					return element.id == id;
				};
			}
		},
		deleteDep: function (id_dep) {
			this.$http.delete(config.url + 'Depenses/' + id_dep, auth.getAuthHeader());
			for (var i in this.depenses) {
				if (this.depenses[i].id == id_dep) {
					this.depenses.splice(i, 1);
				}
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
