<template>
	<div class="wrap">
		<v-select v-model="trend" :items="trends" label="Periodic Trend" class="select" dark></v-select>
		<div style="height: 10.5vw">
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
			trend: '',
		};
	},
	methods: {
		renderChart() {
			var atomicNumbers = this.elements.map(function(el) {
				return el.atomicNumber;
			});
			var ionizationEnergies = this.elements.map(function(el) {
				return el.ionizationEnergy;
			});
			var options = {
				type: 'line',
				data: {
					labels: atomicNumbers,
					datasets: [
						{
							data: ionizationEnergies,
							backgroundColor: ['rgba(255,255,255,0.2)'],
							pointBorderWidth: 2,
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

<style lang="scss" scoped>
.wrap {
	width: 95%;
	height: 95%;
	margin: auto;
	.select {
		width: 50%;
		color: white;
		opacity: 0.8;
	}
	div.menuable__content__active {
		left: 0;
		top: 0;
	}
	#trendChart {
		width: 100%;
		margin: auto;
		height: 95%;
		z-index: 100;
	}
}
</style>

