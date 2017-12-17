<template>
	<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container col-8 col-lg-4">
          <div class="modal-body">
            <slot name="body">
              <div class="modal-body">
									<div class="row">
										<h3 class="col-md-12">Vous certifiez avoir envoyé {{remboursement.amount}}€ à {{remboursement.toName}}</h3>
									</div>
							</div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
							<button type="button" class="btn btn-secondary waves-effect" @click="$emit('close')">Annuler</button>
							<button type="button" class="btn btn-info waves-effect waves-light" @click.prevent="rembourser()">J'ai remboursé</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import config from '../config';
export default {
	name: 'modalDepense',
	props: ['remboursement', 'depenses'],
	components: {},
	data () {
		return {};
	},
	methods: {
		rembourser: function () {
			var depense = {
				creator: auth.getAuthId(),
				creatorUsername: remboursement.from,
				domaine: '',
				description: 'Remboursement',
				date: new Date(),
				price: remboursement.amount,
				participations: [{ id: remboursement.to, amount: remboursement.amount, solde: -remboursement.amount,
					username: remboursement.toName }]
			};
			this.$http.post(config.url + 'collocs/' + auth.getCollocId() + '/depenses', depense);
		},
		rembourserDepense: function (depense) {
			this.$http.patch(config.url + 'depenses/' + depense.id, depense)
			.then((data) => {
				this.$emit('close'); this.$router.go(this.$router.currentRoute);
			}).catch((err) => { console.log(err); });
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
	 margin: 0px auto;
  padding: 20px 30px;
  background-color: #303841;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
