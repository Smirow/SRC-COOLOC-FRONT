<template>
	<div>
	<div class="account-pages"></div>
		<div class="clearfix"></div>
		<div class="wrapper-page">
			<div class="card-box">
				<div class="panel-heading">
					<h3 class="text-center"> Inscrire sa <strong class="text-custom">COOLOC</strong> </h3>
				</div>

				<div class="p-20">
					<form class="form-horizontal m-t-20" action="http://coderthemes.com/ubold/dark_hori/index.html">

						<div class="form-group ">
							<div class="col-12">
								<input class="form-control" type="nom" required="" placeholder="Nom">
							</div>
						</div>
					</br></br></br>

						<div class="panel-heading">
							<h3 class="text-center"> Ajouter des <strong class="text-custom">COOLOC</strong>ataires </h3>
						</div>

						<div class="form-group ">
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
								<router-link :to="{ name: 'Balance'}" class="btn btn-pink btn-block text-uppercase waves-effect waves-light">Inscrire</router-link>
							</div>
						</div>

					</form>

				</div>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	name: 'SignColoc',
	data () {
		return {
			memberEmail: '',
			members: []
		};
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
