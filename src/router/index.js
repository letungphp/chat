import Vue from 'vue';
import Router from 'vue-router';
import store from './../store';
import Chat from './../pages/Chat'
import Login from './../pages/Login'

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default new Router({
	routes : [
		{
			path : '/',
			name : 'Chat',
			component : Chat,
			//beforeEnter: ifAuthenticated,
		},
		{
			path : '/login',
			name : 'Login',
			component : Login
		},
	]
});