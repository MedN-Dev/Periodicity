<template>
	<div class="nav">
		<h1>
			<span class="menuWrap">
				<Menu/>
			</span>
			<span class="titleWrap">Periodic Table of the Elements</span>
		</h1>
	</div>
</template>

<script>
import Menu from './Menu';
export default {
	name: 'Navigation',
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
	.titleWrap {
		margin-left: -7.5vw;
	}
	h1 {
		width: 100%;
		text-align: center;
		color: rgba(255, 255, 255, 0.9);
		font-weight: 300;
		font-size: 2.3vw;
	}
}
@media only screen and (max-width: 600px) {
	.nav {
		width: 100%;
		padding: 7vw;
		.menuWrap {
			float: left;
		}
		h1 {
			width: 100%;
			text-align: center;
			color: rgba(255, 255, 255, 0.9);
			font-weight: 300;
			font-size: 4.3vw;
		}
	}
}
</style>
