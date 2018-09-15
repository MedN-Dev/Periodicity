<template>
	<div class="nav">
		<span class="menuWrap" :style="menuPreload">
			<Menu/>
		</span>
		<h1 :style="preloads">
			Periodic
			<span class="modeSelect" :class="isActive('table')" id="m1" @click="changeMode('table')">Table</span>
			<span class="modeSelect" :class="isActive('trends')" id="m2" @click="changeMode('trends')">Trends</span>
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
	data() {
		return {
			activeMode: 'table',
			preloads: 'opacity: 0; margin-top: -1vw',
			menuPreload: 'opacity: 0',
		};
	},
	mounted: function() {
		setTimeout(() => {
			this.preloads = '';
			this.menuPreload = '';
		}, 1700);
		this.$root.$on('pushChange', text => {
			this.activeMode = text;
		});
	},
	methods: {
		changeMode(mode) {
			if (mode === 'trends') {
				document.getElementById('m1').classList.remove('active');
				document.getElementById('m2').classList.add('active');
			} else {
				document.getElementById('m2').classList.remove('active');
				document.getElementById('m1').classList.add('active');
				this.$root.$emit('defaultCurrent', `Add default current`);
			}
			this.$root.$emit(`${mode}`, `Changed mode to ${mode}`);
		},
		isActive(mode) {
			if (this.activeMode === mode) {
				return 'active';
			} else return '';
		},
	},
};
</script>

<style lang="scss" scoped>
.nav {
	width: 100%;
	padding: 2vw;
	.menuWrap {
		float: left;
		transition: 0.5s;
	}
	h1 {
		position: absolute;
		margin-left: 18vw;
		margin-top: 0;
		width: 50%;
		text-align: center;
		color: rgba(255, 255, 255, 0.9);
		font-weight: 300;
		font-size: 2.3vw;
		opacity: 1;
		transition: 0.5s;
		.modeSelect {
			opacity: 0.3;
			transition: 0.5s ease;
			position: absolute;
			margin-top: 2.6vw;
			margin-left: 1vw;
			font-weight: 300;
			z-index: 3;
			font-size: 1.5vw;
			&:hover {
				cursor: pointer;
				opacity: 0.6;
			}
		}
		.active {
			opacity: 1;
			font-size: 2.3vw;
			margin-top: 0;
			&:hover {
				cursor: auto;
				opacity: 1;
			}
		}
	}
}
@media only screen and (max-width: 600px) {
	.nav {
		width: 100%;
		padding: 6vw;
		.menuWrap {
			float: left;
		}
		h1 {
			width: 37%;
			text-align: center;
			color: rgba(255, 255, 255, 0.9);
			font-weight: 300;
			font-size: 5.3vw;
			.modeSelect {
				opacity: 0.3;
				transition: 0.5s ease;
				position: absolute;
				margin-top: 5.6vw;
				margin-left: 1vw;
				font-weight: 300;
				z-index: 3;
				font-size: 4vw;
				&:hover {
					cursor: pointer;
					opacity: 0.6;
				}
			}
			.active {
				opacity: 1;
				font-size: 5.3vw;
				margin-top: 0;
				&:hover {
					cursor: auto;
					opacity: 1;
				}
			}
		}
	}
}
</style>
