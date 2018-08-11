<template>
	<div class="wrap">
		<v-select v-model="trend" :items="trends" label="Periodic Trend" class="select" height="2.5vw" @change="updateChart()" dark :color="selectColor[trend]"></v-select>
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
	data() {
		return {
			elements: pt.all(),
			graph: null,
			trends: [
				'Electronegativity',
				'Atomic Radius',
				'Density',
				'Ionization Energy',
				'Electron Affinity',
				'Melting Point',
			],
			trend: 'Ionization Energy',
			selectColor: {
				'Electronegativity': 'yellow darken-1',
				'Atomic Radius': 'blue',
				'Density': 'deep-purple accent-1',
				'Ionization Energy': 'red',
				'Electron Affinity': 'purple accent-3',
				'Melting Point': 'orange',
			}
		};
	},
	methods: {
		selectColors() {
			var myColors = {
				'Electronegativity': 'rgba(110, 60, 70, 0.2)',
				'Atomic Radius': 'rgba(110, 60, 70, 0.2)',
				'Density': 'rgba(110, 60, 70, 0.2)',
				'Ionization Energy': 'rgba(110, 60, 70, 0.2)',
				'Electron Affinity': 'rgba(110, 60, 70, 0.2)',
				'Melting Point': 'rgba(110, 60, 70, 0.2)',
			};
			return myColors[this.trend];
			alert(this.trend);
		},
		renderChart() {
			var atomicNumbers = this.elements
				.map(function(el) {
					return el.atomicNumber;
				})
				.slice(0, 102);
			var trendToGraph = this.elements
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
							data: trendToGraph,
							backgroundColor: 'rgba(110, 60, 70, 0.2)',
							borderColor: 'rgba(110, 60, 70, 0.75)',
							pointBackgroundColor: 'rgba(158, 49, 71, 1)',
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
			this.graph = new Chart(ctx, options);
		},
		updateChart() {
			if (this.trend === 'Ionization Energy') {
				//Ionization Energy
				var atomicNumbers = this.elements
					.map(function(el) {
						return el.atomicNumber;
					})
					.slice(0, 102);
				var trendToGraph = this.elements
					.map(function(el) {
						return el.ionizationEnergy;
					})
					.slice(0, 102);
				var backgroundColor = 'rgba(155, 37, 60, 0.2)';
				var borderColor = 'rgba(155, 37, 60, 0.75)';
				var pointBackgroundColor = 'rgba(155, 37, 60, 1)';
			} else if (this.trend === 'Electronegativity') {
				//Electronegativity
				var atomicNumbers = this.elements
					.map(function(el) {
						return el.atomicNumber;
					})
					.slice(0, 103);
				var trendToGraph = this.elements
					.map(function(el) {
						return el.electronegativity;
					})
					.slice(0, 103);
				var backgroundColor = 'rgba(239, 187, 49, 0.2)';
				var borderColor = 'rgba(239, 187, 49, 0.75)';
				var pointBackgroundColor = 'rgba(239, 187, 49, 1)';
			} else if (this.trend === 'Atomic Radius') {
				// Atomic Radius
				var atomicNumbers = this.elements
					.map(function(el) {
						return el.atomicNumber;
					})
					.slice(0, 57);
				var trendToGraph = this.elements
					.map(function(el) {
						return el.atomicRadius;
					})
					.slice(0, 57);
				var backgroundColor = 'rgba(90, 137, 219, 0.2)';
				var borderColor = 'rgba(90, 137, 219, 0.75)';
				var pointBackgroundColor = 'rgba(90, 137, 219, 1)';
			} else if (this.trend === 'Electron Affinity') {
				// Electron Affinity
				var atomicNumbers = this.elements
					.map(function(el) {
						return el.atomicNumber;
					})
					.slice(0, 86);
				var trendToGraph = this.elements
					.map(function(el) {
						return -el.electronAffinity;
					})
					.slice(0, 86);
				var backgroundColor = 'rgba(175, 26, 163, 0.2)';
				var borderColor = 'rgba(175, 26, 163, 0.6)';
				var pointBackgroundColor = 'rgba(175, 26, 163, 1)';
			} else if (this.trend === 'Density') {
				//Density
				var atomicNumbers = this.elements
					.map(function(el) {
						return el.atomicNumber;
					})
					.slice(0, 98);
				atomicNumbers = atomicNumbers.filter(item => ![85, 87, 95].includes(item));
				var trendToGraph = this.elements
					.map(function(el) {
						return el.density;
					})
					.slice(0, 98);
				trendToGraph = trendToGraph.filter(item => item !== 0).filter(Number);
				var backgroundColor = 'rgba(106, 70, 140, 0.2)';
				var borderColor = 'rgba(106, 70, 140, 0.75)';
				var pointBackgroundColor = 'rgba(136, 100, 170, 1)';
			} else if (this.trend === 'Melting Point') {
				// Melting Point
				var atomicNumbers = this.elements
					.map(function(el) {
						return el.atomicNumber;
					})
					.slice(0, 104);
				var trendToGraph = this.elements
					.map(function(el) {
						return el.meltingPoint;
					})
					.slice(0, 104);
				trendToGraph[86] = 300;
				var backgroundColor = 'rgba(180, 85, 30, 0.2)';
				var borderColor = 'rgba(180, 85, 30, 0.75)';
				var pointBackgroundColor = 'rgba(180, 85, 30, 1)';
			}
			var newData = {
				labels: atomicNumbers,
				datasets: [
					{
						data: trendToGraph,
						backgroundColor: backgroundColor,
						borderColor: borderColor,
						pointBackgroundColor: pointBackgroundColor,
					},
				],
			};
			this.graph.data = newData;
			this.graph.update();
		},
	},
};
</script>

<style lang="scss">
.v-menu__content {
	background: none;
	max-height: none;
	.v-select-list {
		background: rgba(60, 66, 80, 0.95);
		.v-list {
			background: none;
			padding: 0 !important;
			.v-list__tile {
				color: rgba(255, 255, 255, 0.9);
			}
		}
	}
}
.v-menu__content.menuable__content__active {
	background: none;
}
.wrap {
	width: 97%;
	height: 100%;
	margin: auto;
	.v-input__slot {
		border-color: white;
	}
	.select {
		width: 40% !important;
		opacity: 0.8;
		margin: auto;
		margin-top: 0.5vw;
		height: 3vw;
		.v-select__selection {
			color: white;
		}
		label {
			color: white;
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

