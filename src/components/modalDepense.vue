<template>
	<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container col-8 col-lg-4">

          <!-- <div class="modal-header">
            <slot name="header">
              Nouvelle dépense
            </slot>
          </div> -->

          <div class="modal-body">
            <slot name="body">
              <div class="modal-body">
									<div class="row">
											<div class="col-md-6">
													<div class="form-group">
															<label for="field-1" class="control-label">Domaine</label>
															 <select class="form-control">
																<option>Courses</option>
																<option>Ménage</option>
																<option>Autre</option>
														</select>
													</div>
											</div>
											<div class="col-md-6">
													<div class="form-group">
															<label for="field-2" class="control-label">Date</label>
															<input type="text" class="form-control" id="field-2" placeholder="01/01/1990">
													</div>
											</div>
									</div>
									<div class="row">
											<div class="col-md-12">
													<div class="form-group no-margin">
															<label for="field-7" class="control-label">Description</label>
															<textarea class="form-control" id="field-7" placeholder="Petite description de la dépense"></textarea>
													</div>
											</div>
									</div>
									<div class="row">
										<div class="col-md-6">
												<div class="form-group">
													<label for="field-1" class="control-label">Participant</label>
													<input type="text" class="form-control" disabled="" value="Magued">
												</div>
										</div>
										<div class="col-md-6">
												<div class="form-group">
															<label for="field-2" class="control-label">Amount</label>
															<input type="text" class="form-control" id="field-2" placeholder="0.00">
													</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-6">
												<div class="form-group">
													<input type="text" class="form-control" disabled="" value="Rémy">
												</div>
										</div>
										<div class="col-md-6">
												<div class="form-group">
															<input type="text" class="form-control" id="field-2" placeholder="0.00">
													</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-6">
												<div class="form-group">
													<input type="text" class="form-control" disabled="" value="Théophile">
												</div>
										</div>
										<div class="col-md-6">
												<div class="form-group">
															<input type="text" class="form-control" id="field-2" placeholder="0.00">
													</div>
										</div>
									</div>
							</div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
							<button type="button" class="btn btn-secondary waves-effect" @click="$emit('close')">Annuler</button>
							<button type="button" class="btn btn-info waves-effect waves-light" @click="$emit('close')">Enregistrer</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
	name: 'modalDepense',
	components: {},
	data () {
		return {};
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
