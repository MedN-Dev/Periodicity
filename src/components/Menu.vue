<template>
	<v-layout wrap>
		<v-btn class="menuBtn" @click.stop="drawer = !drawer">
			<v-icon class="menuIcon">menu</v-icon>
		</v-btn>

		<v-navigation-drawer v-model="drawer" absolute temporary class="drawer" style="width: 13vw">
			<h1>Modes</h1>
			<div class="item" v-for="item in items" :key="item.title" @click="changeMode(item.class)">
				<v-icon :class="item.class+' icon'">{{ item.icon }}</v-icon>
				<p class="text">
					{{ item.title }}
				</p>
			</div>
		</v-navigation-drawer>
	</v-layout>
</template>

<script>
export default {
	name: 'Menu',
	data() {
		return {
			drawer: null,
			items: [
				{ title: 'Periodic Table', class: 'table', icon: 'bubble_chart' },
				{ title: 'Periodic Trends', class: 'trends', icon: 'poll' },
			],
		};
	},
	methods: {
		changeMode(mode) {
			this.$root.$emit(`${mode}`, `Changed mode to ${mode}`);
			this.drawer = !this.drawer;
		},
	},
};
</script>

<style lang="scss" scoped>
* {
	font-size: 1.4vw;
	max-height: none;
	// line-height: 2vw;
}
.v-list__tile {
	height: 5vw;
}
.menuBtn {
	position: absolute;
	float: left;
	padding: 0;
	min-width: 0;
	margin-left: 3.5vw;
	width: 3.5vw;
	height: 3.5vw;
}
.menuIcon {
	font-size: 3.5vw;
}
.drawer {
	// padding: 0.4vw;
	// padding-top: 1.5vw;
	background: rgba(60, 66, 80, 0.85);
	max-width: none;
	padding: 0;
	h1 {
		font-weight: 300;
		font-size: 1.5vw;
		margin-top: 1vw;
		border-bottom: 0.5px solid rgba(205, 205, 205, 0.5);
		height: 3vw;
	}
	.item {
		color: rgba(255, 255, 255, 0.7);
		height: 5vw;
		// padding: 1vw;
		transition: 0.25s;
		&:hover {
			cursor: pointer;
			background: rgba(80, 86, 100, 0.9);
		}
		.icon {
			float: left;
			font-size: 2.7vw;
			padding: 1.1vw;
			color: rgb(79, 133, 133);
			opacity: 1;
		}
		.trends {
			color: rgb(175, 77, 159);
		}
		.text {
			text-align: left;
			float: right;
			font-size: 1.3vw;
			width: 8vw;
			padding: 0.5vw 1.5vw 0 0;
			margin: 0;
			font-weight: 200;
		}
	}
	width: 10vw;
}
</style>

