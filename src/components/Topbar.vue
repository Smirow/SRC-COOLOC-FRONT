<template lang="html">
	<!-- Top Bar Start -->
		<div class="topbar">

			<!-- LOGO -->
			<div class="topbar-left">
					<div class="text-center">
							<router-link  class="logo" :to="{ name: 'Home'}">
								<i class="icon-c-logo"> <img src="../assets/logo.png" height="42"/> </i>
								<span><img alt="Brand" src="../assets/logo.png" height="50"></span>
							</router-link>
					</div>
			</div>

			<!-- Button mobile view to collapse sidebar menu -->
			<nav class="navbar-custom">

				<!-- <ul class="list-inline float-right mb-0">

					<li class="list-inline-item notification-list">
							<router-link class="nav-link right-bar-toggle waves-light waves-effect" :to="{ name: 'Signup'}"><i><b>S'inscrire</b></i></router-link>
					</li>

					<li class="list-inline-item notification-list">
						<router-link class="nav-link right-bar-toggle waves-light waves-effect" :to="{ name: 'Login'}"><i><b>Se connecter</b></i></router-link>
					</li>

				</ul> -->

				<ul class="list-inline float-right mb-0">

						<li class="list-inline-item notification-list">
							<button class="logButton nav-link right-bar-toggle waves-light waves-effect" type="button" name="button" @click.preventDefault="logout()"> Se déconnecter</button>
						</li>

				</ul>

				<ul class="list-inline menu-left mb-0">
						<li class="float-left">
								<button class="button-menu-mobile open-left waves-light waves-effect " v-on:click.preventDefault="display">
										<i class="fa fa-bars"></i>
								</button>
						</li>
				</ul>

			</nav>

		</div>
		<!-- Top Bar End -->
</template>

<script>

export default {
	data: function () {
		return {};
	},
	methods: {
		display: function () {
			this.$emit('display');
		},
		logout: function () {
			this.$emit('hideSideBar');
		},
		login: function () {

		}
	}
};
</script>

<style scoped>
.logButton {
  background: none;
  border: none;
  font-weight: bold;
  font-style: italic;
  font-family: inherit;
  /*margin-top: 30px;*/
}
.topbar-custom {
	background-color: white;
	border: none;
	border-bottom: solid;
	border-color: #65B8AC;
	border-radius: 0;
	margin-bottom: 0;
	padding: 0 10px;
	margin-left: 240px;
	min-height: 73px;
}
.topbar-custom .nav-link {
	padding: 0;
	line-height: 70px;
	color: #333;
}
.topbar-custom .dropdown-toggle:after {
	content: initial; }
.topbar-custom .menu-left {
	overflow: hidden;
}
@media (max-width: 480px) {
	.topbar-custom  {
		margin-left: 70px !important;
	}
}

#wrapper.enlarged .topbar-custom {
	margin-left: 70px;
}
</style>

