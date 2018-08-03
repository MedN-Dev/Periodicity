<template>
	<div class="nav">
		<!-- <div class="menuWrap">
            <Menu/>
        </div> -->

		<h1>
			<span class="menuWrap">
				<Menu/>
			</span>{{header}}</h1>
	</div>
</template>

<script>
import Menu from './Menu';
export default {
	name: 'Navigation',
	data() {
		return {
			header: 'Periodic Table of the Elements',
		};
	},
	components: {
		Menu,
	},
};
</script>

<style lang="scss" scoped>
.nav {
	width: 100%;
	padding: 2vw;
	.menuWrap {
		float: left;
	}
	h1 {
		width: 100%;
		text-align: center;
		color: rgba(255, 255, 255, 0.9);
		font-weight: 400;
		font-size: 2.5vw;
	}
}
</style>
