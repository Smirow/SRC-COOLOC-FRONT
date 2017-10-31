<template>
	<div id="wrapper">
		<Topbar @display="changeSideBar" @hideSideBar="hideSideBar" ></Topbar>
		<transition name="component-slide">
			<sidebar v-if="sidebarState"></sidebar>
		</transition>
		<transition name="component-fade" mode="out-in">
			<router-view v-if="sidebarState" class="content-page" id="app"></router-view>
			<router-view v-else id="app"></router-view>
		</transition>
	</div>
</template>

<script>
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

import './assets/css/bootstrap.min.css';
import './assets/css/icons.css';
export default {
	name: 'app',
	components: {
		Topbar,
		Sidebar
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

<style src="./assets/css/main.css"></style>
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

</style>
