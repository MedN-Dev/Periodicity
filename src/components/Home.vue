<template>
	<v-app class="vueWrap" dark>
		<Navigation/>
		<div class="tableWrap">
			<PeriodicTable/>
		</div>
		<div style="clear:both;"></div>
		<div class="footerWrap">
			<Footer/>
		</div>
	</v-app>
</template>

<script>
import PeriodicTable from './home/PeriodicTable';
import Footer from './Footer';
import Navigation from './home/Navigation';

export default {
	name: 'Home',
	components: {
		Navigation,
		PeriodicTable,
		Footer,
	},
};
</script>

<style lang="scss">
body {
	margin: 0;
}
.application.theme--dark {
	background: rgba(30, 36, 50, 1) !important;
}
.application .theme--dark.v-navigation-drawer .v-divider,
.application .theme--dark.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border,
.theme--dark .v-navigation-drawer .v-divider,
.theme--dark .v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
	background: none;
}
.tableWrap {
	width: 88.1%;
	margin-left: auto;
	margin-right: auto;
	clear: both;
	padding-bottom: 4vw;
}
.footerWrap {
	width: 100%;
}
@media only screen and (max-width: 600px) {
	.tableWrap {
		width: 100%;
		// margin-left: auto;
		// margin-right: auto;
		overflow: scroll;
		clear: both;
		padding-bottom: 4vw;
	}
}
</style>