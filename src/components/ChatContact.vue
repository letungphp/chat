<template>
	<li class="contact" v-bind:class="{active : isActive(contact)}">
      <div class="wrap">
        <span class="contact-status" v-bind:class="{ online: contact.status == 'online' , away: contact.status == 'away' , busy: contact.status == 'busy'}"></span>
        <img v-bind:src="contact.user_image"/>
        <div class="meta">
          <p class="name">{{contact.user_name}}</p>
          <p class="preview">{{contact.last_message}}</p>
        </div>
      </div>
    </li>
</template>

<script>

export default {
	name : 'ChatContact',
	props : [
		'contact'
	],
	computed : {

	},
	methods : {
		isActive : function(contact){
			return this.$store.getters.chatActive == contact.user_id;
		}

	}
}

</script>