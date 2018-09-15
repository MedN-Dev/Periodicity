<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,800|Raleway');
#app {
	font-family: 'Open Sans', sans-serif !important;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100%;
	position: relative;
}
text {
	font-family: 'Open Sans', sans-serif !important;
	opacity: 0.9 !important;
}
</style>
