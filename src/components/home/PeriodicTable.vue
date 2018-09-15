<template>
	<div width="100%" id="table">
		<div class="spacer1"></div>
		<div class="spacer2"></div>
		<div class="infoWrapper">
			<div v-if="!current & mode === 'table'" class="introduction" :style="loadHandler">
				<div class="features">
					<div class="tips">
						<h1>Welcome To Periodicity</h1>
						<div v-for="point in points" :key="point.description" :class="point.class+' point'">
							<v-icon :style="{color: point.color}">{{point.icon}}</v-icon>
							<p>{{point.description}}</p>
						</div>
					</div>
					<div id="bohr-intro-container" :style="introBohr"></div>
				</div>
			</div>
			<InfoBox v-else-if="current && mode === 'table'" :element="current" :animations="animations" />
			<AddBox v-else-if="mode === 'addition'" :elements="toBeSummed" :symbols="toBeSummedElements" />
			<TrendBox v-else :current="currentForTrend" />

		</div>
		<div class="spacer3"></div>
		<div v-for="element in elements" :key="element.atomicNumber" v-if="isMain(element)" class="elementWrapper" @mouseenter="currentElement(element)" @mouseleave="clearCurrentForTrend()" @click.right="beginSumming(element)" oncontextmenu="return false;" style="z-index: 2">
			<router-link :to="{ path: '/element/' + element.atomicNumber}" class="routerWrap">
				<ElementCard v-if="mode === 'table' || mode === 'addition'" :element="element" :key="element.atomicNumber" :class="createElementClass(element)" />
				<TrendCard :trendToDisplay="trend" v-else-if="mode === 'trends'" :element="element" :key="element.atomicNumber" :class="createElementClass(element)" />
			</router-link>
		</div>
		<div class="spacer4"></div>
		<div class="spacer5"></div>
		<div class="spacer6"></div>
		<div class="spacer7"></div>
		<div v-for="element in elements" :key="element.atomicNumber" v-if="isBlockF(element)" class="elementWrapper" @mouseenter="currentElement(element)" @mouseleave="clearCurrentForTrend()" @click.right="beginSumming(element)" oncontextmenu="return false;" style="z-index: 2">
			<router-link :to="{ path: '/element/' + element.atomicNumber}" class="routerWrap">
				<ElementCard v-if="mode === 'table' || mode === 'addition'" :element="element" :key="element.atomicNumber" :class="createElementClass(element)" />
				<TrendCard :trendToDisplay="trend" v-else-if="mode === 'trends'" :element="element" :key="element.atomicNumber" :class="createElementClass(element)" />
			</router-link>
		</div>
		<div class="hoverBlock" :style="block"></div>
	</div>
</template>

<script>
import ElementCard from './ElementCard';
import TrendCard from './TrendCard';
import TrendBox from './TrendBox';
import InfoBox from './InfoBox';
import AddBox from './AddBox';
import Elements from '@/elements';
import 'atomic-bohr-model/dist/atomicBohrModel.min.js';

export default {
	name: 'PeriodicTable',
	data() {
		return {
			loadHandler: '',
			elements: Elements,
			mode: 'table',
			atomGraph: null,
			introBohr: '',
			animations: true,
			toBeSummed: [],
			toBeSummedElements: [],
			current: null,
			currentForTrend: null,
			block: 'display: none',
			trend: 'Ionization Energy',
			points: [
				{
					class: 'point1',
					icon: 'open_in_new',
					description: 'Hover an element to view general information, or click to see its detailed page',
					color: 'lightblue',
				},
				{
					class: 'point2',
					icon: 'poll',
					description:
						'Graph and visualize periodic trends through the periodic trend mode in the menu or header',
					color: 'lightsteelblue',
				},
				{
					class: 'point4',
					icon: 'library_add',
					description:
						'Easily find the masses of compounds by right clicking the elements of which they comprise',
					color: 'slategrey',
				},
			],
			nonMetal: [1, 6, 7, 8, 15, 16, 34],
			alkali: [3, 11, 19, 37, 55, 87],
			akaliEarth: [4, 12, 20, 38, 56, 88],
			// prettier-ignore
			transitionMetal: [21, 22,23, 24, 25, 26, 27, 28, 29, 30, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 72, 73, 74, 75, 76, 77, 78, 79, 80, 104, 105, 106, 107, 108, 109, 110, 111, 112],
			postTransition: [13, 31, 49, 50, 81, 82, 83, 113, 114, 115, 116],
			metalloid: [5, 14, 32, 33, 51, 52, 84],
			halogen: [9, 17, 35, 53, 85, 117],
			noble: [2, 10, 18, 36, 54, 86, 118],
			lanthanoid: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
			actinoid: [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103],
			loadOrder: {
				1: [1, 103],
				2: [3, 102, 71, 118],
				3: [11, 4, 101, 70, 117, 86],
				4: [19, 12, 100, 69, 116, 85, 54],
				5: [37, 20, 99, 68, 115, 84, 53, 36],
				6: [55, 38, 21, 98, 67, 114, 83, 52, 35, 18],
				7: [87, 56, 39, 22, 97, 66, 113, 82, 51, 34, 17, 10],
				8: [88, 40, 23, 96, 65, 112, 81, 50, 33, 16, 9, 2],
				9: [72, 41, 24, 95, 64, 111, 80, 49, 32, 15, 8],
				10: [57, 104, 73, 42, 25, 94, 63, 110, 79, 48, 31, 14, 7],
				11: [89, 58, 105, 74, 43, 26, 93, 62, 109, 78, 47, 30, 13, 6],
				12: [90, 59, 106, 75, 44, 27, 92, 61, 108, 77, 46, 29, 5],
				13: [91, 60, 107, 76, 45, 28],
			},
		};
	},
	components: {
		ElementCard,
		InfoBox,
		TrendCard,
		TrendBox,
		AddBox,
	},
	mounted: function() {
		setTimeout(() => {
			this.loadHandler = 'opacity: 1; margin-top: 0';
		}, 2000);
		setTimeout(() => {
			var atomicConfig = {
				containerId: '#bohr-intro-container',
				numElectrons: 78,
				nucleusColor: 'rgba(54, 68, 93, 1)',
				electronRadius: 2.5,
				electronColor: 'rgba(99, 113, 138, 0.9)',
				orbitalWidth: 1,
				orbitalColor: 'rgba(54, 68, 93, 1)',
				idNumber: 10,
				animationTime: 0,
				orbitalRotationConfig: {
					pattern: {
						alternating: false,
						clockwise: false,
						preset: 'cubedNegative',
					},
				},
				symbolOffset: 7,
				drawSymbol: true,
			};
			this.atomGraph = new Atom(atomicConfig);
		}, 2100);
		this.$root.$on('trends', text => {
			this.mode = 'trends';
		});
		this.$root.$on('table', text => {
			this.mode = 'table';
		});
		this.$root.$on('defaultCurrent', text => {
			this.current = this.elements[0];
		});
		this.$root.$on('toggleAnimations', text => {
			this.animations = !this.animations;
		});
		this.$root.$on('displayTrend', text => {
			this.trend = text;
		});
		this.$root.$on('exitAddition', text => {
			this.mode = 'table';
			this.toBeSummed = [];
			this.toBeSummedElements = [];
		});
	},
	watch: {
		mode: function() {
			this.trend = 'Ionization Energy';
			if (this.mode === 'trends') {
				this.block = 'display: block';
				setTimeout(() => {
					this.block = 'display: none';
				}, 600);
			}
		},
		trend: function() {
			this.block = 'display: block';
			setTimeout(() => {
				this.block = 'display: none';
			}, 600);
		},
		current: function() {
			this.introBohr = 'display: none';
		},
	},
	methods: {
		beginSumming(element) {
			this.mode = 'addition';
			this.toBeSummed.push(element.atomicMass);
			this.toBeSummedElements.push(element.symbol);
		},
		isMain(element) {
			var n = element.atomicNumber;
			return n < 57 || n >= 104 || (n >= 72 && n < 89);
		},
		isBlockF(element) {
			var n = element.atomicNumber;
			return !(n < 57 || n >= 104 || (n >= 72 && n < 89));
		},
		createElementClass(element) {
			var n = element.atomicNumber;
			var loadIndex = '';
			Object.entries(this.loadOrder).forEach(([key, value]) => {
				if (value.includes(n)) {
					loadIndex += key.toString();
				}
			});
			if (this.nonMetal.includes(n)) {
				return 'nonMetal l' + loadIndex;
			} else if (this.alkali.includes(n)) {
				return 'alkali l' + loadIndex;
			} else if (this.akaliEarth.includes(n)) {
				return 'alkaliEarth l' + loadIndex;
			} else if (this.transitionMetal.includes(n)) {
				return 'transitionMetal l' + loadIndex;
			} else if (this.postTransition.includes(n)) {
				return 'postTransition l' + loadIndex;
			} else if (this.halogen.includes(n)) {
				return 'halogen l' + loadIndex;
			} else if (this.noble.includes(n)) {
				return 'noble l' + loadIndex;
			} else if (this.lanthanoid.includes(n)) {
				return 'lanthanoid l' + loadIndex;
			} else if (this.actinoid.includes(n)) {
				return 'actinoid l' + loadIndex;
			} else if (this.metalloid.includes(n)) {
				return 'metalloid l' + loadIndex;
			}
		},
		currentElement(element) {
			this.current = element;
			this.currentForTrend = element;
		},
		clearCurrentForTrend() {
			this.currentForTrend = null;
		},
	},
};
</script>

<style lang="scss">
.spacer1 {
	grid-area: wz;
}
.spacer2 {
	grid-area: wa;
}
sup {
	font-size: 1.5vw;
}
.infoWrapper {
	grid-area: wb;
	.introduction {
		width: 100%;
		height: 100%;
		padding: 1vw 1.5vw 0 1.5vw;
		line-height: 1.3vw;
		opacity: 0;
		transition: 1s;
		margin-top: 0.5vw;
		.features {
			text-align: center;
			color: rgba(255, 255, 255, 0.8);
			width: 100%;
			height: 100%;
			margin-top: -0.5vw;
			.tips {
				width: 69%;
				h1 {
					width: 50%;
					margin: auto;
					margin-bottom: 0.7vw;
					font-weight: 300;
					padding-bottom: 0.8vw;
					font-size: 1.3vw;
					border-bottom: 0.5px solid rgba(205, 205, 205, 0.5);
					text-align: center;
				}
				.point {
					width: 100%;
					float: right;
					text-align: left;
					height: 3.1vw;
					padding: 0.4vw;
					font-weight: 300;
					font-size: 0.9vw;
					p {
						color: rgba(255, 255, 255, 0.6);
						line-height: 1.3vw;
					}
					i {
						float: left;
						font-size: 2.5vw;
						opacity: 0.7;
						margin-right: 0.7vw;
					}
				}
			}
			#bohr-intro-container {
				z-index: 0;
				position: absolute;
				margin-top: -7.3vw;
				margin-left: 28vw;
				width: 21vw;
				height: 21vw;
				float: right;
			}
		}
	}
}
.spacer3 {
	grid-area: wc;
}
.spacer4 {
	grid-area: wd;
	height: 2vw;
}
.spacer5 {
	grid-area: we;
}
.spacer6 {
	grid-area: wf;
}
.spacer7 {
	grid-area: wg;
}
#table {
	margin-top: 1vw;
	float: right;
	display: inline-grid;
	grid-template-columns: repeat(18, 1fr);
	grid-template-areas:
		'.  wa wb wb wb wb wb wb wb wb wb wb wz wz wz wz wz .'
		'.  .  wb wb wb wb wb wb wb wb wb wb .  .  .  .  .  .'
		'.  .  wb wb wb wb wb wb wb wb wb wb .  .  .  .  .  .'
		'.  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .'
		'.  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .'
		'.  .  wc .  .  .  .  .  .  .  .  .  .  .  .  .  .  .'
		'.  .  wc .  .  .  .  .  .  .  .  .  .  .  .  .  .  .'
		'wd wd wd wd wd wd wd wd wd wd wd wd wd wd wd wd wd wd'
		'we we .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  wg '
		'wf wf .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . ';
	.elementWrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 4.87vw;
		height: 4.87vw;
		.routerWrap {
			width: 100%;
			height: 100%;
			text-decoration: none;
		}
	}
	.hoverBlock {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1000;
	}
}
@media only screen and (max-width: 600px) {
	.spacer1 {
		grid-area: wz;
	}
	.spacer2 {
		grid-area: wa;
	}
	sup {
		font-size: 1.5vw;
	}
	.infoWrapper {
		grid-area: wb;
		.introduction {
			display: none;
		}
	}
	.spacer3 {
		grid-area: wc;
	}
	.spacer4 {
		grid-area: wd;
		height: 2vw;
	}
	.spacer5 {
		grid-area: we;
	}
	.spacer6 {
		grid-area: wf;
	}
	.spacer7 {
		grid-area: wg;
	}
	#table {
		margin-top: 1vw;
		float: right;
		border-right: 5vw;
		display: inline-grid;
		width: 100vw;
		grid-template-columns: repeat(18, 1fr);
		grid-template-areas:
			'.  wa wb wb wb wb wb wb wb wb wb wb wz wz wz wz wz .'
			'.  .  wb wb wb wb wb wb wb wb wb wb .  .  .  .  .  .'
			'.  .  wb wb wb wb wb wb wb wb wb wb .  .  .  .  .  .'
			'.  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .'
			'.  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .'
			'.  .  wc .  .  .  .  .  .  .  .  .  .  .  .  .  .  .'
			'.  .  wc .  .  .  .  .  .  .  .  .  .  .  .  .  .  .'
			'wd wd wd wd wd wd wd wd wd wd wd wd wd wd wd wd wd wd'
			'we we .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  wg '
			'wf wf .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . ';
		.elementWrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 10vw;
			height: 10vw;
			.routerWrap {
				width: 100%;
				height: 100%;
				text-decoration: none;
			}
		}
		.hoverBlock {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 1000;
		}
	}
}
</style>
