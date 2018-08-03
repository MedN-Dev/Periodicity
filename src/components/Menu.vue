<template>
	<v-layout wrap>
		<v-btn class="menuBtn" @click.stop="drawer = !drawer">
			<v-icon class="menuIcon">menu</v-icon>
		</v-btn>

		<v-navigation-drawer v-model="drawer" absolute temporary class="drawer" style="width: 13vw">

			<v-list class="pt-0" dense style="background: none">
				<v-list-tile v-for="item in items" :key="item.title" class="item">
					<v-list-tile-action class="iconWrap">
						<v-icon class="icon">{{ item.icon }}</v-icon>
					</v-list-tile-action>

					<v-list-tile-content style="height: auto">
						{{ item.title }}
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
	</v-layout>
</template>

<script>
export default {
	name: 'Menu',
	data() {
		return {
			drawer: null,
			items: [{ title: 'Periodic Table', icon: 'bubble_chart' }, { title: 'Periodic Trends', icon: 'poll' }],
		};
	},
};
</script>

<style lang="scss" scoped>
* {
	font-size: 1.5vw;
	max-height: none;
	// line-height: 2vw;
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
	padding: 0.4vw;
	padding-top: 2.5vw;
	background: rgba(60, 66, 80, 0.85);
	max-width: none;
	.item {
		height: 5.5vw;
		.iconWrap {
			min-width: 0;
			width: 1.5vw;
			height: 1.5vw;
			margin-right: 2.5vw;
			.icon {
				font-size: 2.5vw;
			}
		}
	}
	width: 10vw;
}
</style>

