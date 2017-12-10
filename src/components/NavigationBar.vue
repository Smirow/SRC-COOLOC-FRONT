<template lang="html">
<!-- Navigation Bar-->
<header id="topnav">
	<div class="topbar-main">
		<div class="container-fluid">

			<!-- Logo container-->
			<div class="logo">
				<!-- Text Logo -->
				<!--<a href="index.html" class="logo">-->
				<!--UBold-->
				<!--</a>-->
				<!-- Image Logo -->
				<router-link :to="{ name: 'Balance'}" class="logo">
					<h1>COOLOC</h1>
						<!-- <img src="static/images/logo_dark.png" alt="" height="20" class="logo-lg">
						<img src="static/images/logo_sm.png" alt="" height="24" class="logo-sm"> -->
				</router-link>
			</div>
			<!-- End Logo container-->


			<div class="menu-extras topbar-custom">
				<ul class="list-inline float-right mb-0">
					<li class="menu-item list-inline-item">
						<!-- Mobile menu toggle-->
						<a class="navbar-toggle nav-link">
							<div class="lines">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</a>
							<!-- End mobile menu toggle-->
					</li>
				</ul>
			</div>
			<!-- end menu-extras -->

			<div class="clearfix"></div>

		</div> <!-- end container -->
	</div>
		<!-- end topbar-main -->

		<div class="navbar-custom navbar-default">
				<div class="container-fluid">
						<div id="navigation">
								<!-- Navigation Menu-->
								<ul class="navigation-menu">

										<li class="has-submenu">
											<router-link :to="{ name: 'Balance'}"><i class="md md-insert-chart"></i>Balance</router-link>
										</li>

										<li class="has-submenu">
											<router-link :to="{ name: 'Depenses'}"><i class="md md-credit-card"></i>Dépenses</router-link>
										</li>

										<li class="has-submenu">
											<router-link :to="{ name: 'Compte'}"><i class="icon-emotsmile"></i>Mon compte</router-link>
										</li>

										<li class="has-submenu">
											<a  @click.prevent="logout()"><i class="md md-exit-to-app"></i>Se Déconnecter</a>
										</li>


								</ul>
								<!-- End navigation menu -->
						</div> <!-- end #navigation -->
				</div> <!-- end container -->
		</div> <!-- end navbar-custom -->
</header>
<!-- End Navigation Bar-->

</template>

<script>
import auth from '../auth';
export default {
	methods: {
		logout () {
			auth.logout('Login');
		}
	}
};
</script>

<style lang="css">

</style>
