<template>
	<li v-bind:class="getClassMessage()">
	<img v-bind:src="message.user_image" />
	<p>
	<span>
	{{message.content}}
	</span>
	<br>
	<span class="m-time">at {{message.created_at}}</span>
	</p>

	</li>
</template>

<script>

export default {
	name : 'ChatMessage',
	props : [
		'message'
	],
	computed : {
		
	},
	methods : {
		getClassMessage(){
			return this.$store.getters.authInfo.user_id == this.message.user_id ? 'replies' : 'sent';
		}

	}
}

</script>

<style>
.m-time{
	font-size : 11px	
}
.sent.m-time{
	float : right
}
.replies.m-time{
	float : left
}
</style>