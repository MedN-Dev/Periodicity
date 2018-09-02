<template>
	<v-footer height="auto" :style="'width: '+ width">
		<v-layout justify-center row wrap>
			<v-card-text class="pt-0 about">
				Periodicity.io is an MIT licensed, open-source application that animates and graphs periodic data in order to make the visualization of chemical concepts easier. It uses Vue.js for API structuring and data from primarily Chris Andrejewski's npm package. Source code can be found
				<a href="https://github.com/kadinzhang/Periodic-Table">here</a>.
			</v-card-text>
			<v-flex primary lighten-2 py-3 text-xs-center xs12 class="copy">
				&copy;2018 -
				<span>Kadin Zhang</span>
			</v-flex>
		</v-layout>
	</v-footer>
</template>

<script>
export default {
	name: 'Footer',
	props: ['width'],
	data: () => ({
		links: ['Help', '', 'Team', '', 'Github'],
	}),
};
</script>

<style lang="scss" scoped>
* {
	opacity: 0.85;
	font-weight: 200;
}
footer {
	color: rgba(255, 255, 255, 0.7);
	font-size: 16px;
	padding-bottom: 10px;
	margin: 1vw auto auto auto;
}
.v-footer {
	background: rgba(30, 36, 50, 1) !important;
	color: rgba(255, 255, 255, 0.8) !important;
	width: 88%;
	.copy {
		background: none !important;
		border: none !important;
	}
}
.about {
	padding: 0;
	border-bottom: 0.5px solid rgba(240, 240, 240, 0.5);
	padding-bottom: 20px;
	font-size: 15px;
	a {
		text-decoration: none;
		color: lightslategray;
		font-style: italic;
	}
}
span {
	font-weight: 400;
}
@media only screen and (max-width: 600px) {
	footer {
		color: rgba(255, 255, 255, 0.7);
		margin: 4vw auto auto auto;
		font-size: 12px;
	}
	.v-footer {
		background: rgba(30, 36, 50, 1);
		color: rgba(255, 255, 255, 0.8);
		width: 90%;
		.copy {
			background: none !important;
			border: none !important;
		}
	}
	.about {
		font-size: 10px;
	}
}
</style>
