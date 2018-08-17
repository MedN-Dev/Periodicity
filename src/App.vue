<template>
	<div id="app">
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
	</div>
</template>

<script>
import PeriodicTable from './components/PeriodicTable';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

export default {
	name: 'App',
	components: {
		Navigation,
		PeriodicTable,
		Footer,
	},
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,800|Raleway');
body {
	background-color: rgba(35, 41, 55, 1);
	margin: 0;
}
sup {
	font-size: 1.5vw;
}
#app {
	font-family: 'Open Sans', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	height: 100%;
	position: relative;
	.vueWrap {
		background: rgba(35, 41, 55, 1);
		height: 50vw;
	}
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
