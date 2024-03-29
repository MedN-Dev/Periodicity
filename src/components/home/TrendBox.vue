<template>
	<div class="wrap">
		<v-select v-model="trend" :items="trends" label="Periodic Trend" class="select" @change="renderChart(true)" dark :color="selectColor[trend]" :hint="units[trend]" persistent-hint transition="scale-transition" origin="top right"></v-select>
		<div class="canvasWrap" :style="'height:'+height">
			<canvas id="trendChart"></canvas>
		</div>

	</div>
</template>

<script>
import Chart from 'chart.js';
var pt = require('periodic-table');

export default {
	name: 'TrendBox',
	props: ['current', 'height', 'active'],
	mounted: function() {
		this.renderChart(false);
		if (this.active) {
			this.graph.config.data.datasets[0]['pointBackgroundColor'][this.active - 1] = 'white';
			this.graph.update();
		}
	},
	watch: {
		current: function() {
			if (this.tooltip) {
				var activeElements = this.graph.tooltip._active;
				var requestedElem = this.graph.getDatasetMeta(this.tooltip[0]).data[this.tooltip[1]];
				for (var i = 0; i < activeElements.length; i++) {
					if (requestedElem._index == activeElements[i]._index) {
						activeElements.splice(i, 1);
						break;
					}
				}
				this.graph.tooltip._active = activeElements;
				this.graph.tooltip.update(true);
				this.graph.draw();
				this.tooltip = null;
			}

			if (this.isHoverable()) {
				var datasetIndex = 0;
				var pointIndex = this.current.atomicNumber - 1;
				if (this.trend === 'Atomic Radius') {
					if (this.current.atomicNumber > 70 && this.current.atomicNumber < 84) {
						var pointIndex = this.current.atomicNumber - 14;
					}
				} else if (this.trend === 'Electronegativity') {
					if ([3, 4, 5, 6, 7, 8, 9].includes(this.current.atomicNumber)) {
						var pointIndex = this.current.atomicNumber - 2;
					} else if ([11, 12, 13, 14, 15, 16, 17].includes(this.current.atomicNumber)) {
						var pointIndex = this.current.atomicNumber - 3;
					} else if (this.current.atomicNumber > 18 && this.current.atomicNumber < 86) {
						var pointIndex = this.current.atomicNumber - 4;
					} else if (this.current.atomicNumber > 86) {
						var pointIndex = this.current.atomicNumber - 5;
					}
				} else if (this.trend === 'Density') {
					if (this.current.atomicNumber > 87 && this.current.atomicNumber < 96) {
						var pointIndex = this.current.atomicNumber - 3;
					} else if ([96, 97, 98].includes(this.current.atomicNumber)) {
						var pointIndex = this.current.atomicNumber - 4;
					}
				}

				if (this.graph.tooltip._active == undefined) this.graph.tooltip._active = [];
				var activeElements = this.graph.tooltip._active;
				var requestedElem = this.graph.getDatasetMeta(datasetIndex).data[pointIndex];
				activeElements.push(requestedElem);
				this.graph.tooltip._active = activeElements;
				this.graph.tooltip.update(true);
				this.graph.draw();
				this.tooltip = [datasetIndex, pointIndex];
			}
		},
	},
	data() {
		return {
			elements: pt.all(),
			graph: null,
			current: this.current,
			tooltip: null,
			trends: [
				'Ionization Energy',
				'Electronegativity',
				'Atomic Radius',
				'Electron Affinity',
				'Density',
				'Melting Point',
			],
			trend: 'Ionization Energy',
			selectColor: {
				Electronegativity: 'yellow darken-1',
				'Atomic Radius': 'blue',
				Density: 'deep-purple accent-1',
				'Ionization Energy': 'red',
				'Electron Affinity': 'purple accent-3',
				'Melting Point': 'orange',
			},
			units: {
				Electronegativity: 'in χr',
				'Atomic Radius': 'in pm',
				Density: 'in g/mL, STP',
				'Ionization Energy': 'in kJ/mol',
				'Electron Affinity': 'in -kJ/mol',
				'Melting Point': 'in Kelvin',
			},
		};
	},
	methods: {
		isHoverable() {
			//prettier-ignore
			if (this.trend === 'Ionization Energy') {
				if ([103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118].includes(this.current.atomicNumber)) {
					return false;
				} else {
					return true;
				}
			} else if (this.trend === 'Electronegativity') {
				if ([2, 10, 18, 86, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118].includes(this.current.atomicNumber)) {
					return false;
				} else {
					return true;
				}
			} else if (this.trend === 'Atomic Radius') {
				if ([58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118].includes(this.current.atomicNumber)) {
					return false;
				} else {
					return true;
				}
			} else if (this.trend === 'Electron Affinity') {
				if ([87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118].includes(this.current.atomicNumber)) {
					return false;
				} else {
					return true;
				}
			} else if (this.trend === 'Melting Point') {
				if ([2, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118].includes(this.current.atomicNumber)) {
					return false;
				} else {
					return true;
				}
			} else if (this.trend === 'Density') {
				if ([85, 87, 95, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118].includes(this.current.atomicNumber)) {
					return false;
				} else {
					return true;
				}
			}
		},
		renderChart(isUpdate) {
			this.$root.$emit('displayTrend', this.trend);
			var atomicNumbers = this.elements.map(function(el) {
				return el.atomicNumber + ' - ' + el.name;
			});
			if (this.trend === 'Ionization Energy') {
				atomicNumbers = atomicNumbers.slice(0, 102);
				var trendToGraph = this.elements
					.map(function(el) {
						return el.ionizationEnergy;
					})
					.slice(0, 102);
				var backgroundColor = 'rgba(155, 37, 60, 0.2)';
				var borderColor = 'rgba(155, 37, 60, 0.75)';
				var pointBackgroundColor = [];
				for (var i = 0; i < trendToGraph.length; i++) {
					pointBackgroundColor.push('rgba(155, 37, 60, 1)');
				}
				var label = this.trend;
			} else if (this.trend === 'Electronegativity') {
				atomicNumbers = atomicNumbers
					.slice(0, 103)
					.filter(item => !['2 - Helium', '10 - Neon', '18 - Argon', '86 - Radon'].includes(item));
				var trendToGraph = this.elements
					.map(function(el) {
						return el.electronegativity;
					})
					.slice(0, 103)
					.filter(item => item !== 0)
					.filter(Number);
				var backgroundColor = 'rgba(239, 187, 49, 0.2)';
				var borderColor = 'rgba(239, 187, 49, 0.75)';
				var pointBackgroundColor = [];
				for (var i = 0; i < trendToGraph.length; i++) {
					pointBackgroundColor.push('rgba(239, 187, 49, 1)');
				}
				var label = this.trend;
			} else if (this.trend === 'Atomic Radius') {
				atomicNumbers = atomicNumbers
					.slice(0, 83)
					.filter(
						item =>
							![
								'58 - Cerium',
								'59 - Praseodymium',
								'60 - Neodymium',
								'61 - Promethium',
								'62 - Samarium',
								'63 - Europium',
								'64 - Gadolinium',
								'65 - Terbium',
								'66 - Dysprosium',
								'67 - Holmium',
								'68 - Erbium',
								'69 - Thulium',
								'70 - Ytterbium',
							].includes(item)
					);
				var trendToGraph = this.elements
					.map(function(el) {
						return el.atomicRadius;
					})
					.slice(0, 83)
					.filter(item => item !== 0)
					.filter(Number);
				var backgroundColor = 'rgba(90, 137, 219, 0.2)';
				var borderColor = 'rgba(90, 137, 219, 0.75)';
				var pointBackgroundColor = [];
				for (var i = 0; i < trendToGraph.length; i++) {
					pointBackgroundColor.push('rgba(90, 137, 219, 1)');
				}
				var label = this.trend;
			} else if (this.trend === 'Electron Affinity') {
				atomicNumbers = atomicNumbers.slice(0, 86);
				var trendToGraph = this.elements
					.map(function(el) {
						return -el.electronAffinity;
					})
					.slice(0, 86);
				var backgroundColor = 'rgba(175, 26, 163, 0.2)';
				var borderColor = 'rgba(175, 26, 163, 0.6)';
				var pointBackgroundColor = [];
				for (var i = 0; i < trendToGraph.length; i++) {
					pointBackgroundColor.push('rgba(175, 26, 163, 1)');
				}
				var label = this.trend;
			} else if (this.trend === 'Density') {
				atomicNumbers = atomicNumbers
					.slice(0, 98)
					.filter(item => !['85 - Astatine', '87 - Francium', '95 - Americium'].includes(item));
				var trendToGraph = this.elements
					.map(function(el) {
						return el.density;
					})
					.slice(0, 98);
				trendToGraph = trendToGraph.filter(item => item !== 0).filter(Number);
				var backgroundColor = 'rgba(106, 70, 140, 0.2)';
				var borderColor = 'rgba(106, 70, 140, 0.75)';
				var pointBackgroundColor = [];
				for (var i = 0; i < trendToGraph.length; i++) {
					pointBackgroundColor.push('rgba(136, 100, 170, 1)');
				}
				var label = this.trend;
			} else if (this.trend === 'Melting Point') {
				atomicNumbers = atomicNumbers.slice(0, 104);
				var trendToGraph = this.elements
					.map(function(el) {
						return el.meltingPoint;
					})
					.slice(0, 104);
				var backgroundColor = 'rgba(180, 85, 30, 0.2)';
				var borderColor = 'rgba(180, 85, 30, 0.75)';
				var pointBackgroundColor = [];
				for (var i = 0; i < trendToGraph.length; i++) {
					pointBackgroundColor.push('rgba(180, 85, 30, 1)');
				}
				var label = this.trend;
			}
			if (isUpdate === false) {
				var options = {
					type: 'line',
					data: {
						labels: atomicNumbers,
						datasets: [
							{
								label: label,
								data: trendToGraph,
								backgroundColor: backgroundColor,
								borderColor: borderColor,
								pointBackgroundColor: pointBackgroundColor,
								borderWidth: 2.5,
								pointBorderWidth: 0.1,
								hitRadius: 5,
								pointRadius: 2.5,
								pointHoverRadius: 5,
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
						tooltips: {
							displayColors: false,
							backgroundColor: 'rgba(0, 6, 20, 0.7)',
							titleFontStyle: 'semi-bold',
							titleFontFamily: "'Open sans', sans-serif",
							bodyFontFamily: "'Open sans', sans-serif",
							bodyFontColor: 'rgba(255, 255, 255, 0.7)',
							xPadding: 10,
							yPadding: 10,
							cornerRadius: 0,
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
			} else {
				this.graph.data.labels = atomicNumbers;
				Object.assign(this.graph.data.datasets[0], {
					data: trendToGraph,
					label: label,
					backgroundColor: backgroundColor,
					borderColor: borderColor,
					pointBackgroundColor: pointBackgroundColor,
				});
				var index = this.active - 1;
				if (this.trend === 'Atomic Radius') {
					if (this.active > 70 && this.active < 84) {
						index = this.active - 14;
					}
				} else if (this.trend === 'Electronegativity') {
					if ([3, 4, 5, 6, 7, 8, 9].includes(this.active)) {
						index = this.active - 2;
					} else if ([11, 12, 13, 14, 15, 16, 17].includes(this.active)) {
						index = this.active - 3;
					} else if (this.active > 18 && this.active < 86) {
						index = this.active - 4;
					} else if (this.active > 86) {
						index = this.active - 6;
					}
				} else if (this.trend === 'Density') {
					if (this.active > 87 && this.active < 96) {
						index = this.active - 3;
					} else if ([96, 97, 98].includes(this.active)) {
						index = this.active - 4;
					}
				}
				this.graph.config.data.datasets[0]['pointBackgroundColor'][index] = 'white';
				this.graph.update();
			}
		},
	},
};
</script>

<style lang="scss">
.v-menu__content {
	background: none;
	max-height: none;
	.v-select-list {
		background: none;
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
	background: none !important;
}
.wrap {
	width: 98%;
	height: 100%;
	margin: auto;
	.v-input__slot {
		border-color: white;
	}
	.select {
		width: 30% !important;
		opacity: 0.9;
		margin: auto;
		margin-top: 0.5vw;
		height: 2.2vw;
		.v-messages {
			height: 14px;
		}
	}

	.canvasWrap {
		display: block;
		height: 11.8vw;
		#trendChart {
			width: 100%;
			margin: auto;
			height: 100%;
			z-index: 100;
		}
	}
}
@media only screen and (max-width: 600px) {
	.wrap {
		.select {
			width: 55% !important;
			opacity: 0.9;
			margin: auto;
			margin-top: 1vw;
			height: 1.2vw;
			.v-messages {
				height: 14px;
			}
		}
		.canvasWrap {
			display: block;
			height: 27.8vw !important;
			#trendChart {
				width: 100%;
				margin: auto;
				height: 100%;
				z-index: 100;
			}
		}
	}
}
</style>

