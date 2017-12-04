<template>
	<div>
	<div class="account-pages"></div>
		<div class="clearfix"></div>
		<div class="wrapper-page">
			<div class="card-box">
					<div class="panel-heading">
							<h4 class="text-center"> Connexion à <strong class="text-custom">COOLOC</strong></h4>
					</div>


				<div class="p-20">
						<form class="form-horizontal m-t-20" action="http://coderthemes.com/ubold/dark_hori/index.html">

								<div class="form-group ">
										<div class="col-12">
												<input class="form-control" type="text" required="" placeholder="Email" v-model="credentials.email">
										</div>
								</div>

								<div class="form-group">
										<div class="col-12">
												<input class="form-control" type="password" required="" placeholder="Mot de passe" v-model="credentials.password">
										</div>
								</div>

								<div class="form-group ">
										<div class="col-12">
												<div class="checkbox checkbox-primary">
														<input id="checkbox-signup" type="checkbox">
														<label for="checkbox-signup">
																Se rappeler de moi
														</label>
												</div>

										</div>
								</div>

								<div v-if="error" class="form-group text-center m-t-40">
										<div class="col-12">
												{{ error }}
										</div>
								</div>

								<div class="form-group text-center m-t-40">
										<div class="col-12">
												<button class="btn btn-pink btn-block text-uppercase waves-effect waves-light" @click.prevent="login()">
													Se connecter
												</button>
										</div>
								</div>

								<div class="form-group m-t-30 m-b-0">
										<div class="col-12">
											<router-link :to="{ name: 'Forgot'}" class="text-dark"><i class="fa fa-lock m-r-5"></i>Mot de passe oublié ?</router-link>
										</div>
								</div>
						</form>

				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 text-center">
					<p>Pas de compte ? <router-link :to="{ name: 'Signup'}" class="text-dark"><i class="fa fa-lock m-r-5"></i>S'inscrire</router-link></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import auth from '../auth';
export default {
	name: 'Login',
	data () {
		return {
			credentials: {
				email: '',
				password: ''
			},
			error: ''
		};
	},
	methods: {
		login: function () {
			let credentials = {
				email: this.credentials.email,
				password: this.credentials.password
			};
			auth.login(this, credentials, 'Balance');
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
