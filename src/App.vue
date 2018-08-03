<template>
	<div id="app">
		<Navigation/>
		<div class="tableWrap">
			<PeriodicTable/>
		</div>
		<div style="clear:both;"></div>
		<div class="footerWrap">
			<Footer/>
		</div>
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

<style>
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
}
.tableWrap {
	width: 88.1%;
	margin: auto;
	clear: both;
	height: 100%;
	padding-bottom: 50vw;
	/* display: none; */
}
.footerWrap {
	width: 100%;
	/* position: absolute; */
	/* clear: both; */
	/* bottom: 0; */
}
</style>
