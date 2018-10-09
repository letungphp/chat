<template>
	<div class="messages">
    <ul>
      <chat-message v-for="message in messages" v-bind:message="message"/>
      
    </ul>
    </div>
</template>

<script>
import ChatMessage from './ChatMessage'

export default {
	name : 'ChatMessageList',
	components : {
		ChatMessage
	},
	computed : {
		messages(){
			return this.$store.getters.chatMessageFromStore;
		}

	}
}

</script>