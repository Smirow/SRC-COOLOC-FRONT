<template>
	<div>
	<div class="row">
			<div class="col-lg-12 col-xl-3">
				<div class="card-box widget-box-1">
						<h4 class="font-18">Balance personnelle</h4>
						<h2 class="text-danger text-center"><span class="counter">-225</span>€</h2>
						<p class="text-muted">Sur la dernière semaine<span class="pull-right"><i class="fa fa-caret-up text-success m-r-5"></i><span class="counter">10.25</span>%</span></p>
				</div>
			</div>

			<div class="col-lg-12 col-xl-3">
				<div class="card-box widget-box-1">
						<h4 class="font-18">Dépenses personnelles</h4>
						<h2 class="text-pink text-center"><span class="counter">4</span></h2>
						<p class="text-muted">Sur la dernière semaine<span class="pull-right"><i class="fa fa-caret-down text-danger m-r-5"></i><span class="counter">7.85</span>%</span></p>
				</div>
			</div>

			<div class="col-lg-12 col-xl-3">
				<div class="card-box widget-box-1">
						<h4 class="font-18">Budget de la COOLOC</h4>
						<h2 class="text-success text-center"><span class="counter">652</span>€</h2>
						<p class="text-muted">Sur la dernière semaine<span class="pull-right"><i class="fa fa-caret-down text-danger m-r-5"></i><span class="counter">3.5</span>%</span></p>
				</div>
			</div>

			<div class="col-lg-12 col-xl-3">
				<div class="card-box widget-box-1">
						<h4 class="font-18">Dépenses de la COOLOC</h4>
						<h2 class="text-warning text-center"><span class="counter">16</span></h2>
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
									resize="true">
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
						<div>
							<div class="form-group">
							  <label class="col-2 col-form-label">Rembourser 225 € à Rémy</label>
								<button type="button" class="pull-right btn-group btn-default waves-effect waves-light" @click="showModal = true;">Rembourser 225€</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<modalRembourse v-if="showModal" @close="showModal = false"></modalRembourse>
	</div>
</template>

<script>
import modalRembourse from './modalRembourse';
import { DonutChart, BarChart } from 'vue-morris';
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
			donutData: [
				{ label: 'Alimentaire', value: 451 },
				{ label: 'Ménage/Entretien', value: 40 },
				{ label: 'Autre', value: 161 }
			],
			barData: [
				{ cooloc: 'Magued', balance: -225 },
				{ cooloc: 'Rémy', balance: 451 },
				{ cooloc: 'Théophile', balance: -226 },
			]
		};
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
