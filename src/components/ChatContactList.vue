<template>
<div id="contacts">
          <ul>
            <chat-contact v-for="contact in chatContacts" v-bind:contact="contact" :key="contact.user_id"/>
            
          </ul>
        </div>
</template>

<script>
import ChatContact from './ChatContact'

export default {
	name : 'ChatContactList',
	components : {
		ChatContact
	},
	props : {

	},
	computed : {
		chatContacts(){
			return this.$store.getters.chatContacts;
		}

	}
}

</script>