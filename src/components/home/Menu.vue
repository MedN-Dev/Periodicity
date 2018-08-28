<template>
	<v-layout wrap>
		<!-- <v-btn class="menuBtn" @click.stop="drawer = !drawer" depressed> -->
		<v-icon class="menuIcon" @click.stop="drawer = !drawer" v-ripple>menu</v-icon>
		<!-- </v-btn> -->
		<v-navigation-drawer v-model="drawer" absolute temporary class="drawer info" style="width: 14vw">
			<h1>Modes</h1>
			<div class="item" v-for="item in items" :key="item.title" @click="changeMode(item.class)">
				<v-icon :class="item.class+' icon'">{{ item.icon }}</v-icon>
				<p class="text">
					{{ item.title }}
				</p>
			</div>
			<v-switch label="Orbital Animations" v-model="electronAnimations" input-value="true" class="switch" color="white"></v-switch>
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
			electronAnimations: true,
		};
	},
	watch: {
		electronAnimations: function() {
			this.$root.$emit('toggleAnimations', '');
		},
	},
	methods: {
		changeMode(mode) {
			this.$root.$emit(`${mode}`, `Changed mode to ${mode}`);
			this.drawer = !this.drawer;
		},
	},
};
</script>

<style lang="scss">
.menuIcon {
	font-size: 3.5vw;
	margin-left: 3.6vw;
	opacity: 0.8;
	&:hover {
		background: rgba(230, 230, 230, 0.2);
	}
}
.v-navigation-drawer--close.v-navigation-drawer--temporary {
	transform: translateX(-14vw) !important;
}
.drawer {
	background: rgba(69, 120, 236, 0.85);
	max-width: none;
	padding: 0;
	height: 112vh !important;
	h1 {
		font-weight: 300;
		font-size: 1.5vw;
		margin-top: 1vw;
		border-bottom: 0.5px solid rgba(225, 225, 225, 0.7);
		height: 3vw;
	}
	.v-navigation-drawer__border {
		width: 0 !important;
	}
	.item {
		color: rgba(255, 255, 255, 0.7);
		height: 4vw;
		transition: 0.25s;
		&:hover {
			cursor: pointer;
			background: rgba(80, 86, 100, 0.9);
		}
		.icon {
			float: left;
			font-size: 2.3vw;
			padding: 0.85vw;
			color: rgb(79, 133, 133);
			opacity: 1;
		}
		.trends {
			color: rgb(175, 77, 159);
		}
		.text {
			text-align: left;
			float: right;
			font-size: 1.2vw;
			line-height: 1.7vw;
			padding-top: 1.1vw;
			width: 10vw;
			margin-left: -1.5vw;
			font-weight: 200;
		}
	}
	.switch {
		width: 13vw;
		margin: auto;
		padding: 0;
		position: fixed;
		bottom: 6.5vw;
		label {
			font-size: 1vw !important;
			text-align: left;
			line-height: 1.5vw;
		}
		.v-input--selection-controls__input {
			margin: 0.5vw;
		}
	}
	width: 10vw;
}
@media only screen and (max-width: 600px) {
	.menuBtn {
		position: absolute;
		float: left;
		padding: 0;
		min-width: 0;
		margin: 0;
		width: 7vw;
		height: 7vw;
		background: none !important;
		color: rgba(255, 255, 255, 0.8);
	}
	.menuIcon {
		font-size: 6vw;
	}
	.v-navigation-drawer--close.v-navigation-drawer--temporary {
		transform: translateX(-43vw) !important;
	}
	.drawer {
		background: rgba(60, 66, 80, 0.85);
		max-width: none;
		padding: 0;
		h1 {
			font-weight: 300;
			font-size: 4.5vw;
			margin-top: 2vw;
			border-bottom: 0.5px solid rgba(205, 205, 205, 0.5);
			height: 10vw;
		}
		.v-navigation-drawer__border {
			width: 0 !important;
		}
		.item {
			color: rgba(255, 255, 255, 0.7);
			height: 15vw;
			transition: 0.25s;
			&:hover {
				cursor: pointer;
				background: rgba(80, 86, 100, 0.9);
			}
			.icon {
				float: left;
				font-size: 7vw;
				padding: 2vw;
				padding-top: 3vw;
				color: rgb(79, 133, 133);
				opacity: 1;
			}
			.trends {
				color: rgb(175, 77, 159);
			}
			.text {
				text-align: left;
				float: right;
				font-size: 3vw;
				width: 28vw;
				padding: 4.5vw 1.5vw 0 0;
				margin: 0;
				font-weight: 200;
			}
		}
		.switch {
			display: none;
		}
		width: 40vw !important;
	}
}
</style>

