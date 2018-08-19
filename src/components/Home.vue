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
import Footer from './home/Footer';
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
	background-color: rgba(35, 41, 55, 1);
	margin: 0;
}
sup {
	font-size: 1.5vw;
}
.application.theme--dark {
	background: rgba(35, 41, 55, 1);
}
.application .theme--light.v-navigation-drawer .v-divider,
.application .theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border,
.theme--light .v-navigation-drawer .v-divider,
.theme--light .v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
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
</style>