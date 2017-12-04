<template>
	<div>
		<div class="row">
			<div class="col-12">
					<div class="card-box">
							<h4 class="m-t-0 header-title">Dépenses <a class="pull-right md md-note-add" @click="showModal = true"></a></h4>
							<table class="table">
							<thead>
								<tr>
									<th>#</th>
									<th>Créateur</th>
									<th>Domaine</th>
									<th>Description</th>
									<th>Date</th>
									<th>Participant(s)</th>
									<th>Prix</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="depense in depenses" :key="depense.id">
									<td>{{ depense.id }}</td>
									<td>{{ depense.creator }}</td>
									<td>{{ depense.domain }}</td>
									<td>{{ depense.description }}</td>
									<td>{{ depense.date }}</td>
									<td><span v-for="participant in depense.participants" :key="participant.id">{{participant.name}} : {{participant.percentage}}% </span></td>
									<td>{{ depense.amount }}</td>
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
export default {
	name: 'Depenses',
	components: {
		modalDepenses
	},
	data () {
		return {
			showModal: false,
			depenses: [
				{
					id: 1,
					creator: 'Rémy',
					date: '01/03/2000',
					domain: 'Courses',
					description: 'Courses Générales',
					participants: [
						{ id: 1, name: 'Magued', percentage: 50 },
						{ id: 2, name: 'Rémy', percentage: 50 }
					],
					amount: 50
				},
				{
					id: 2,
					creator: 'Magued',
					date: '02/03/2000',
					domain: 'Courses',
					description: 'Courses Générales',
					participants: [
						{ id: 1, name: 'Magued', percentage: 100 }
					],
					amount: 10
				},
				{
					id: 3,
					creator: 'Théophile',
					date: '03/03/2000',
					domain: 'Courses',
					description: 'Courses Générales',
					participants: [
						{ id: 3, name: 'Théophile', percentage: 100 }
					],
					amount: 24
				}
			]
		};
	},
	beforeCreate () {
		if (!auth.user.authenticated) {
			this.$router.push('Login');
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
