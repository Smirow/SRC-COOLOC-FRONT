import Vue from 'vue';
import Router from 'vue-router';
import Balance from '@/components/Balance';
import Depenses from '@/components/Depenses';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Balance',
			component: Balance
		},
		{
			path: '/depenses',
			name: 'Depenses',
			component: Depenses
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
	]
});
