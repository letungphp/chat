<template>
	<div>
		<div id="profile">
          <div class="wrap" >
            <img id="profile-img" v-bind:src="login_user_info.user_image" v-bind:class="login_user_info.online_status" v-on:click="toggleStatusModal()"/>
            <p>{{login_user_info.user_name}}</p>
            <i class="fa fa-chevron-down expand-button" ></i>
            <div id="status-options" v-bind:class="{ 'show-status-modal' : show_modal_status}">
              <ul>
                <li id="status-online" v-on:click="changeMyStatus('online')" v-bind:class="{active: login_user_info.status == 'active'}"><span class="status-circle"></span> <p>Online</p></li>
                <li id="status-away" v-on:click="changeMyStatus('away')" v-bind:class="{active: login_user_info.status == 'away'}"><span class="status-circle"></span> <p>Away</p></li>
                <li id="status-busy" v-on:click="changeMyStatus('busy')" v-bind:class="{active: login_user_info.status == 'busy'}"><span class="status-circle"></span> <p>Busy</p></li>
                <li id="status-offline" v-on:click="changeMyStatus('offline')" v-bind:class="{active: login_user_info.status == 'offline'}"><span class="status-circle"></span> <p>Offline</p></li>
              </ul>
            </div>
          </div>
        </div>
        <div id="search">
          <label for=""><i class="fa fa-search" aria-hidden="true"></i></label>
          <input type="text" placeholder="Search contacts..." />
        </div>
	</div>
</template>
<script>
export default {
	name : 'ChatSideBarHead',
	data : function(){
		return {
			show_modal_status : false
		}
	},
	computed : {
		login_user_info(){
			return this.$store.getters.authInfo;
		}
	},
	methods : {
		toggleStatusModal(){
			this.show_modal_status = !this.show_modal_status;
		},
		changeMyStatus(status){
			this.$store.dispatch('A_CHANGE_MY_STATUS',status);
			this.show_modal_status = false;
		}
	}
}

</script>

<style>
.show-status-modal{
	opacity : 1 !important;
	visibility: visible !important;
}

</style>