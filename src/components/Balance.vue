<template>
	<div>
	<div class="row">
			<div class="col-lg-12 col-xl-3">
				<div class="card-box widget-box-1">
						<h4 class="font-18">Budget personnel</h4>
						<h2 class="text-danger text-center"><span class="counter">{{personalDepenseAmount}}</span>€</h2>
						<p class="text-muted">Sur la dernière semaine<span class="pull-right"><i class="fa fa-caret-up text-success m-r-5"></i><span class="counter">10.25</span>%</span></p>
				</div>
			</div>

			<div class="col-lg-12 col-xl-3">
				<div class="card-box widget-box-1">
						<h4 class="font-18">Dépenses personnelles</h4>
						<h2 class="text-pink text-center"><span class="counter">{{personalDepense}}</span></h2>
						<p class="text-muted">Sur la dernière semaine<span class="pull-right"><i class="fa fa-caret-down text-danger m-r-5"></i><span class="counter">7.85</span>%</span></p>
				</div>
			</div>

			<div class="col-lg-12 col-xl-3">
				<div class="card-box widget-box-1">
						<h4 class="font-18">Budget de la COOLOC</h4>
						<h2 class="text-success text-center"><span class="counter">{{collocDepenseAmount}}</span>€</h2>
						<p class="text-muted">Sur la dernière semaine<span class="pull-right"><i class="fa fa-caret-down text-danger m-r-5"></i><span class="counter">3.5</span>%</span></p>
				</div>
			</div>

			<div class="col-lg-12 col-xl-3">
				<div class="card-box widget-box-1">
						<h4 class="font-18">Dépenses de la COOLOC</h4>
						<h2 class="text-warning text-center"><span class="counter">{{collocDepense}}</span></h2>
						<p class="text-muted">Sur la dernière semaine<span class="pull-right"><i class="fa fa-caret-down text-danger m-r-5"></i><span class="counter">9.85</span>%</span></p>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-lg-12 col-xl-4">
				<div class="card-box">
						<h4 class="header-title m-t-0 m-b-30">Dépenses (en €)</h4>
						<div class="widget-chart text-center">
								<donut-chart
									id="donut"
									:data="donutData"
									colors='[ "#5d9cec", "#5fbeaa", "#ebeff2" ]'
									resize="true"
									:formatter="function (y, data) { return y + ' €' }">
								</donut-chart>
						</div>
				</div>
			</div>

			<div class="col-lg-12 col-xl-8">
					<div class="card-box">
							<h4 class=" header-title m-t-0">Balance (en €)</h4>
							<div class="text-center">
										<bar-chart
									id="bar"
									:data="barData"
									xkey="cooloc"
									ykeys='[ "balance" ]'
									bar-colors='[ "#36A2EB" ]'
									grid="true"
									grid-text-weight="bold"
									resize="true"
									hide-hover="auto">
								</bar-chart>
							</div>
					</div>
			</div>
		</div>

		<div class="row">
			<div class="col-lg-12 col-xl-12">
				<div class="card-box">
					<div>
						<div v-for="remboursement in remboursements" :key="remboursement.to">
							<div class="form-group" style="margin-bottom: 0px">
							  <label class="col-2 col-form-label">Rembourser {{remboursement.amount}}€ à {{remboursement.toName}}</label>
								<button type="button" class="pull-right btn-group btn-default waves-effect waves-light" @click="showModal = true;">Rembourser {{remboursement.amount}}€</button>
							</div>
								<modalRembourse v-if="showModal" v-bind:remboursement="remboursement" v-bind:depenses="depenses" @close="showModal = false"></modalRembourse>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import modalRembourse from './modalRembourse';
import { DonutChart, BarChart } from 'vue-morris';
import auth from '../auth';
import config from '../config';
export default {
	name: 'Balance',
	components: {
		DonutChart,
		BarChart,
		modalRembourse
	},
	data () {
		return {
			showModal: false,
			personalDepense: 0,
			personalDepenseAmount: 0,
			collocDepense: 0,
			collocDepenseAmount: 0,
			roomates: [],
			depenses: [],
			remboursements: [],
			donutData: [{ value: '', label: '' }],
			barData: [{ cooloc: '', balance: 0 }]
		};
	},
	beforeCreate () {
		if (!auth.user.authenticated) {
			this.$router.push('Login');
		} else if (!auth.getCollocId()) this.$router.push({ name: 'SignColoc' });
	},
	created: function () {
		this.fetchDepenses(() => {
			this.personalAndCollocDepense();
			this.donutDataFunc();
			this.fetchRoomMates(() => {
				this.barDataFunc();
				this.remboursementsFunc();
			});
		});
	},
	methods: {
		fetchDepenses: function (cb) {
			this.$http.get(config.url + 'collocs/' + auth.getCollocId() + '/depenses', auth.getAuthHeader())
			.then((data) => {
				this.depenses = data.body;
				cb();
				// this.donutData = this.donutDataFunc();
				// console.log(this.donutData);
			}).catch((err) => {
				console.log(err);
			});
		},
		fetchRoomMates: function (cb) {
			this.$http.get(config.url + 'collocs/' + auth.getCollocId() + '/room-mate', auth.getAuthHeader())
			.then((data) => {
				this.roomates = data.body;
				cb();
			}).catch((err) => {
				console.log(err);
			});
		},
		findUsernameById: function (id) {
			return function _findUsernameById (element) {
  			return element.id == id;
			};
		},
		donutDataFunc: function () {
			this.donutData = [];
			let donutDataDomain = [];
			for (let depense of this.depenses) {
				if (donutDataDomain.indexOf(depense.domaine) == -1) {
					this.donutData.push({ label: depense.domaine, value: 0 });
					donutDataDomain.push(depense.domaine);
				}
				this.donutData[donutDataDomain.indexOf(depense.domaine)].value += depense.price;
			}
			console.log(this.donutData);
		},
		barDataFunc: function () {
			let barData = [];
			let barDataRoomMateName = [];
			let barDataRoomMateId = [];
			for (let roomate of this.roomates) {
				barDataRoomMateName.push(roomate.name);
				barDataRoomMateId.push(roomate.id);
				barData.push({ cooloc: roomate.username, balance: 0 });
			}
			for (let depense of this.depenses) {
				for (let participation of depense.participations) {
					if (barData[barDataRoomMateId.indexOf(depense.creator)] &&
							barData[barDataRoomMateId.indexOf(participation.id)]) {
						barData[barDataRoomMateId.indexOf(participation.id)].balance += participation.solde;
						barData[barDataRoomMateId.indexOf(depense.creator)].balance -= participation.solde;
					}
				}
			}
			this.barData = barData;
		},
		balanceCalcul: function () {
			let balance = {};
			for (let depense of this.depenses) {
				for (let participation of depense.participations) {
					if (participation.solde > 0) {
						if (!balance[participation.id]) balance[participation.id] = 0;
						if (!balance[participation.creator]) balance[depense.creator] = 0;
						balance[participation.id] += participation.solde;
						balance[depense.creator] -= participation.solde;
					}
				}
			}
			return balance;
		},
		remboursementsFunc: function () {
			let balance = this.balanceCalcul();
			console.log(balance);
			let ok = 0;
			let remboursements = [];
			while (!ok) {
				console.log(balance);

				let min = min_balance_index(balance);
				// console.log("min : " + min);
				let max = max_balance_index(balance);
				// console.log("max : " + max);

				let new_min;
				if (Math.abs(balance[min]) < balance[max]) {
					new_min = 0;
				} else {
					new_min = Math.abs(balance[min] + balance[max]);
				}

				balance[max] += (balance[min] + new_min);

				// console.log(min + " rembourse " + (balance[min] + new_min) + " à " + max);
				remboursements.push({
					from: min,
					to: max,
					amount: Math.abs(balance[min] + new_min),
					toName: this.findMateNameById(max) });

				balance[min] = -new_min;

				ok = 1;
				for (let user in balance) {
					if (Math.abs(balance[user]) != 0) {
						ok = 0;
					}
				}
			}

			console.log(remboursements);
			function min_balance_index (b) {
				let min = 0;
				let key = '';
				for (let user in b) {
					if (b[user] < min) {
						min = b[user];
						key = user;
					}
				}
				return key;
			}

			function max_balance_index (b) {
				let max = 0;
				let key = '';
				for (let user in b) {
					if (b[user] > max) {
						max = b[user];
						key = user;
					}
				}
				return key;
			}

			this.remboursements = remboursements;
		},
		findMateNameById: function (id) {
			return this.roomates.find(_find(id)).username;
			function _find (id) {
				return function __find (element) {
					return element.id == id;
				};
			}
		},
		personalAndCollocDepense: function () {
			console.log(this.depenses.length);
			for (let depense of this.depenses) {
				for (let participation of depense.participations) {
					if (participation.id == auth.getAuthId()) {
						this.personalDepense++;
						this.personalDepenseAmount += participation.amount;
					}
				}
				this.collocDepense++;
				this.collocDepenseAmount += depense.price;
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
