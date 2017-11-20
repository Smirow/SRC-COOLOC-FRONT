<template>
	<div>
		<NavigationBar v-if="$route.name != 'Login' && $route.name != 'Signup'"  @display="changeSideBar" @hideSideBar="hideSideBar" ></NavigationBar>
		<!-- <transition name="component-slide">
			<sidebar v-if="sidebarState"></sidebar>
		</transition> -->
		<transition name="component-fade" mode="out-in">
			<div class="wrapper">
        <div class="container-fluid">
					<div class="row" v-if="$route.name != 'Login' && $route.name != 'Signup'">
						<div class="col-sm-12">
              <div class="page-title-box">
							</div>
          	</div>
					</div>
						<router-view id="app"></router-view>
					</div>
			</div>
		</transition>
	</div>
</template>

<script>
import NavigationBar from './components/NavigationBar';

export default {
	name: 'app',
	components: {
		NavigationBar
	},
	data: function () {
		return {
			sidebarState: true
		};
	},
	methods: {
		changeSideBar () {
			this.sidebarState = !this.sidebarState;
		},
		hideSideBar () {
			this.sidebarState = false;
		}
	}
};
</script>


<style lang="css">
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.component-slide-enter-active, .component-slide-leave-active {
  transition: all 0.20s;
}
.component-slide-enter, .component-slide-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-100px);
}
.page-title-box {
	padding: 10px 0;
}

</style>
