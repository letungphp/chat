<template>
	<div class="content">
        <chat-main-header />
        <chat-main-content />
        <chat-main-foot />
      </div>
</template>

<script>
import ChatMainHeader from './ChatMainHeader'
import ChatMainContent from './ChatMainContent'
import ChatMainFoot from './ChatMainFoot'

export default {
	name : 'ChatMain',
	components : {
		ChatMainHeader,
		ChatMainContent,
		ChatMainFoot
	},
	props : {

	}
}

</script>