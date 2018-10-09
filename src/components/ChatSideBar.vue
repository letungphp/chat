<template>
	<div id="sidepanel">
        <chat-side-bar-head />

        <chat-contact-list />
        <chat-side-bar-foot />
      </div>
</template>

<script>
import ChatSideBarHead from './ChatSideBarHead'
import ChatContactList from './ChatContactList'
import ChatSideBarFoot from './ChatSideBarFoot'

export default {
	name : 'ChatSideBar',
	components : {
		ChatSideBarHead,
		ChatContactList,
		ChatSideBarFoot
	},
	props : {

	}
}

</script>