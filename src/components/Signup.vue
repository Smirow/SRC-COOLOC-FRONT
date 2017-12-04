<template>
	<div>
	<div class="account-pages"></div>
		<div class="clearfix"></div>
		<div class="wrapper-page">
			<div class="card-box">
				<div class="panel-heading">
					<h3 class="text-center"> S'inscrire à <strong class="text-custom">COOLOC</strong> </h3>
				</div>

				<div class="p-20">
					<form class="form-horizontal m-t-20" action="http://coderthemes.com/ubold/dark_hori/index.html">

						<div class="form-group ">
							<div class="col-12">
								<input class="form-control" type="email" required="" placeholder="Email" v-model="roommate.email">
							</div>
						</div>

						<div class="form-group ">
							<div class="col-12">
								<input class="form-control" type="text" required="" placeholder="Username" v-model="roommate.username">
							</div>
						</div>

						<div class="form-group">
							<div class="col-12">
								<input class="form-control" type="password" required="" placeholder="Password" v-model="roommate.password">
							</div>
						</div>
						<div class="form-group">
							<div class="col-12">
								<input class="form-control" type="password" required="" placeholder="Password Confirmation" v-model="roommate.passwordCheck">
							</div>
						</div>

						<div class="form-group">
							<div class="col-12">
								<div class="checkbox checkbox-primary">
									<input id="checkbox-signup" type="checkbox" checked="checked">
									<label for="checkbox-signup">J'accepte les <a href="#">Conditions</a></label>
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
								<button class="btn btn-pink btn-block text-uppercase waves-effect waves-light" @click.prevent="signup()">S'inscrire</button>
							</div>
						</div>

					</form>

				</div>
			</div>

			<div class="row">
				<div class="col-12 text-center">
					<p>Déja un compte ? <router-link :to="{ name: 'Login'}" class="text-dark"><i class="fa fa-lock m-r-5"></i>Se connecter</router-link></p>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import auth from '../auth';
export default {
	name: 'Signup',
	data () {
		return {
			roommate: {
				email: '',
				username: '',
				password: ''
			},
			error: ''
		};
	},
	methods: {
		signup: function () {
			if (this.roommate.password == this.roommate.passwordCheck) {
				let credentials = {
					email: this.roommate.email,
					username: this.roommate.username,
					password: this.roommate.password
				};
				auth.signup(this, credentials, 'Login');
			} else {
				this.error = 'Les mots de passe de correspondent pas.';
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
