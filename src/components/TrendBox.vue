<template>
	<div class="wrap">
		<v-select v-model="trend" :items="trends" label="Periodic Trend" class="select" height="2.5vw" dark></v-select>
		<div class="canvasWrap">
			<canvas id="trendChart"></canvas>
		</div>

	</div>
</template>

<script>
import Chart from 'chart.js';
var pt = require('periodic-table');

export default {
	name: 'TrendBox',
	mounted: function() {
		this.renderChart();
	},
	watch: {
		element: function() {
			this.renderChart();
		},
	},
	data() {
		return {
			elements: pt.all(),
			trends: [
				'Electronegativity',
				'Atomic Radius',
				'Ionic Radius',
				'Ionization Energy',
				'Electron Affinity',
				'Melting Point',
				'Boiling Point',
			],
			trend: 'Ionization Energy',
		};
	},
	methods: {
		renderChart() {
			var atomicNumbers = this.elements
				.map(function(el) {
					return el.atomicNumber;
				})
				.slice(0, 102);
			var ionizationEnergies = this.elements
				.map(function(el) {
					return el.ionizationEnergy;
				})
				.slice(0, 102);
			var options = {
				type: 'line',
				data: {
					labels: atomicNumbers,
					datasets: [
						{
							data: ionizationEnergies,
							backgroundColor: ['rgba(255,255,255,0.2)'],
							pointBackgroundColor: 'rgba(255, 255, 255, 1)',
						},
					],
				},
				options: {
					layout: {
						padding: {
							top: 10,
							bottom: 10,
							left: 10,
							right: 10,
						},
					},
					maintainAspectRatio: false,
					responsive: true,
					legend: {
						display: false,
					},
					scales: {
						xAxes: [
							{
								display: false,
							},
						],
						yAxes: [
							{
								display: false,
							},
						],
					},
				},
			};

			var ctx = document.getElementById('trendChart').getContext('2d');
			new Chart(ctx, options);
		},
	},
};
</script>

<style lang="scss">
div.menu__content {
	top: 500px !important;
}
.wrap {
	width: 97%;
	height: 100%;
	margin: auto;
	.select {
		width: 40%;
		color: white;
		opacity: 0.8;
		margin: auto;
		margin-top: 0.5vw;
		height: 3vw;
		>>> div.menu__content {
			background: blue;
		}
	}
	.canvasWrap {
		display: block;
		height: 10.5vw;
		// margin-bottom: -11vw;
		#trendChart {
			width: 100%;
			margin: auto;
			height: 100%;
			z-index: 100;
		}
	}
}
</style>

