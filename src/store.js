import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import api_config from './config/api';

Vue.use(Vuex);

const store = new Vuex.Store({
	//State chứa tất cả các thông tin muốn sử dụng cho ứng dụng
	state : {
		//Loading
		page_loading : false,
		//token for login user
		auth_token : localStorage.getItem('token') || '',
		auth_status : '',
		auth_info : {
			user_id : 1,
			user_name : 'letungphp@gmail.com',
			user_image : 'http://emilcarlsson.se/assets/louislitt.png',
			online_status : 'online'

		},
		chat_active : 2,
		chat_contacts : [
			{
				user_id : 1,
				user_name : 'Tùng',
				user_image : 'http://emilcarlsson.se/assets/louislitt.png',
				last_message : 'Hi ...',
				status : 'online'
			},
			{
				user_id : 2,
				user_name : 'tuyến',
				user_image : 'http://emilcarlsson.se/assets/louislitt.png',
				last_message : 'Hi hahha ...',
				status : 'away'
			},
			{
				user_id : 3,
				user_name : 'Toàn',
				user_image : 'http://emilcarlsson.se/assets/louislitt.png',
				last_message : 'Hi kskskskk ksksk...',
				status : 'busy'
			}
		],
		chat_messages : [
			{ user_id : 1, user_image : "http://emilcarlsson.se/assets/louislitt.png" , content : 'Xin chào kdsfdsfdsfdsfsdfsd dsfdsfsd' , created_at : '15-11-2018 12:00'},
			{ user_id : 2, user_image : 'http://emilcarlsson.se/assets/louislitt.png' , content : 'Hello dsfdsfsd sdf sdf sd dsf fds fsd' , created_at : '15-11-2018 12:00'}
		]
	},
	actions : {
		//PAGE LOGIN
		A_LOGIN ({commit}, logindata){
			commit('M_LOADING');
			axios.post(api_config.HOST+"/user/login",{...api_config.DEFAUT_PARAMS, ...logindata})
            .then((response) => {
            	localStorage.setItem('token',response.data.data.token);
            	axios.defaults.params = {};
				axios.defaults.params[ 'token' ] = response.data.data.token;
                commit("M_LOGIN_SUCCESS", response.data.data);
            })
            .catch((error => {
            	localStorage.removeItem('token');
            	axios.defaults.params = {};
                commit("M_LOGIN_FAIL");
            }));
		},
		A_LOGOUT ({commit}){
			console.log('Log out');
			localStorage.removeItem('token');
			commit('M_LOGOUT');
		},
		//PAGE CHAT
		A_CHANGE_MY_STATUS ({commit},status){
			console.log(status);
			commit("M_CHANGE_MY_STATUS", status);
		},



		//PAGE TODO
		A_LOAD_TODO ({commit}){
            axios.get(api_config.HOST+"/todo")
            .then((response) => {
            	console.log(response);
                commit("M_LOAD_TODO", response);
            })
            .catch((error => {
                console.log(error);
            }));

		},
		A_ADD_TODO ({ commit }, todo ){
			let new_todo_obj = {
				title : todo.title,
				description : todo.description,
				status : 0
			}

            axios.post(api_config.HOST+"/todo",new_todo_obj)
            .then((response) => {
                commit("M_ADD_TODO", new_todo_obj);
            })
            .catch((error => {
                console.log(error);
            }));
		},
		A_DEL_TODO ({ commit }, todo ) {
			axios.delete(api_config.HOST+"/todo/"+todo.id,todo)
            .then((response) => {
                commit("M_DEL_TODO", todo);
            })
            .catch((error => {
                console.log(error);
            }));
		},
		A_UPT_TODO ({ commit }, todo ) {
			axios.put(api_config.HOST+"/todo",todo)
            .then((response) => {
                commit("M_UPT_TODO", todo);
            })
            .catch((error => {
                console.log(error);
            }));
		}
	},
	getters : {
		isAuthenticated 	: state => !!state.auth_token,
  		authStatus 			: state => state.auth_status,
  		authInfo 			: state => state.auth_info,
  		showloading 		: state => state.page_loading,
		//Hàm lấy thông tin từ state , các component sử dụng sẽ gọi bằng cách sử dụng computed function "this.$store.getters.todoFromStore"
		chatMessageFromStore : (state) => {
			return state.chat_messages;
		},
		chatContacts : (state) => {
			return state.chat_contacts;
		},
		chatActive : (state) => {
			return state.chat_active;
		}

	},
	mutations : {
		M_LOADING (state){
			state.page_loading = true;
		},
		M_LOGIN_SUCCESS ( state , logindata){
			state.auth_status = true;
			state.auth_token  = logindata.token;
			state.page_loading = false;
		},
		M_LOGIN_FAIL (state ){
			state.page_loading = false;
		},
		M_LOGOUT (state){
			state.auth_status = false;
			state.auth_token = '';
		},

		//Page Chat
		M_CHANGE_MY_STATUS (state ,status){
			state.auth_info.online_status = status;
		},



		//Set data from api to store state
		M_LOAD_MSG ( state , api_response ){
			state.chat_messages = api_response.data;
		},
		M_ADD_MSG( state , obj ){
			return state.chat_messages.push(obj);
		},
		M_DEL_MSG (state , obj ) {
			const idx = state.chat_messages.indexOf(obj);
	      	state.chat_messages.splice(idx, 1);
		},
		M_UPT_MSG ( state , obj ) {
			const idx = state.chat_messages.indexOf(obj);
			state.chat_messages[idx] = obj;
		}
	}
});

export default store;