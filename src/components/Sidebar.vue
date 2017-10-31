<template lang="html">
	<!-- ========== Left Sidebar Start ========== -->
		<div class="left side-menu">
			<div class="sidebar-inner slimscrollleft">
				<!--- Divider -->
				<div id="sidebar-menu">
					<ul>

						<li class="has_sub">
							<router-link :to="{ name: 'Balance'}"  class=""><i class="ti-user"></i> <span> Balance </span> </router-link>
						</li>

						<li class="has_sub">
							<router-link :to="{ name: 'Dépenses'}"  class=""><i class="ti-credit-card"></i> <span> Dépenses </span> </router-link>
						</li>

						<li class="has_sub">
							<router-link :to="{ name: 'ListeCourse'}"  class=""><i class="ti-shopping-cart"></i> <span> Liste de courses </span> </router-link>
						</li>

						<li class="has_sub">
							<router-link :to="{ name: 'Autre'}"  class=""><i class="ti-star"></i> <span> Autre </span> </router-link>
						</li>

					</ul>
					<div class="clearfix"></div>
					</div>
				<div class="clearfix"></div>
			</div>
		</div>
	<!-- Left Sidebar End -->

</template>

<script>
export default {

};
</script>

<style lang="css">

</style>
