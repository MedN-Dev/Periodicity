<template>
	<div width="100%" id="table">
		<div class="spacer1"></div>
		<div class="spacer2"></div>
		<div class="infoBoxWrapper">
			<InfoBox v-if="current" :element="this.current" />
			<div v-else class="introduction">
				<div class="features">
					<h2>Features</h2>
					<div v-for="point in points" :key="point.description" :class="point.class+' point'">
						<v-icon>{{point.icon}}</v-icon>
						<p>{{point.description}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="spacer3"></div>
		<div v-for="element in elements" :key="element.atomicNumber" v-if="isMain(element)" class="elementWrapper" @mouseenter="currentElement(element)">
			<ElementCard :element="element" :key="element.atomicNumber" :class="createElementClass(element)" />
		</div>
		<div class="spacer4"></div>
		<div class="spacer5"></div>
		<div class="spacer6"></div>
		<div class="spacer7"></div>
		<div v-for="element in elements" :key="element.atomicNumber" v-if="isBlockF(element)" class="elementWrapper" @mouseenter="currentElement(element)">
			<ElementCard :element="element" :key="element.atomicNumber" :class="createElementClass(element)" />
		</div>
	</div>
</template>

<script>
import ElementCard from './ElementCard';
import InfoBox from './InfoBox';
var pt = require('periodic-table');

export default {
	name: 'PeriodicTable',
	data() {
		return {
			elements: pt.all(),
			current: null,
			points: [
				{
					class: 'point1',
					icon: 'open_in_new',
					description: 'Hover an element to view basic information, or click to view its detailed page',
				},
				{
					class: 'point2',
					icon: 'poll',
					description: 'Use the menu to access the periodic trends mode, and graph trend values',
				},
				{
					class: 'point3',
					icon: 'account_balance_wallet',
					description: 'Lorem ipsum dolor sit amet, ut pri clita persecuti, cetero epicurei aliquando',
				},
				{
					class: 'point4',
					icon: 'library_add',
					description: 'Easily find the mass of a compound by right clicking elements to sum their masses',
				},
			],
			nonMetal: [1, 6, 7, 8, 15, 16, 34],
			alkali: [3, 11, 19, 37, 55, 87],
			akaliEarth: [4, 12, 20, 38, 56, 88],
			transitionMetal: [
				21,
				22,
				23,
				24,
				25,
				26,
				27,
				28,
				29,
				30,
				39,
				40,
				41,
				42,
				43,
				44,
				45,
				46,
				47,
				48,
				72,
				73,
				74,
				75,
				76,
				77,
				78,
				79,
				80,
				104,
				105,
				106,
				107,
				108,
				109,
				110,
				111,
				112,
			],
			postTransition: [13, 31, 49, 50, 81, 82, 83, 113, 114, 115, 116],
			metalloid: [5, 14, 32, 33, 51, 52, 84],
			halogen: [9, 17, 35, 53, 85, 117],
			noble: [2, 10, 18, 36, 54, 86, 118],
			lanthanoid: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
			actinoid: [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103],
		};
	},
	components: {
		ElementCard,
		InfoBox,
	},
	methods: {
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
			if (this.nonMetal.includes(n)) {
				return 'nonMetal';
			} else if (this.alkali.includes(n)) {
				return 'alkali';
			} else if (this.akaliEarth.includes(n)) {
				return 'alkaliEarth';
			} else if (this.transitionMetal.includes(n)) {
				return 'transitionMetal';
			} else if (this.postTransition.includes(n)) {
				return 'postTransition';
			} else if (this.halogen.includes(n)) {
				return 'halogen';
			} else if (this.noble.includes(n)) {
				return 'noble';
			} else if (this.lanthanoid.includes(n)) {
				return 'lanthanoid';
			} else if (this.actinoid.includes(n)) {
				return 'actinoid';
			} else if (this.metalloid.includes(n)) {
				return 'metalloid';
			}
		},
		currentElement(element) {
			this.current = element;
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
.infoBoxWrapper {
	grid-area: wb;
	.introduction {
		width: 100%;
		height: 100%;
		padding: 1.5vw;
		padding-top: 1vw;
		line-height: 1.5vw;
		.features {
			text-align: center;
			color: rgba(255, 255, 255, 0.8);
			width: 45.5vw;
			h2 {
				width: 20%;
				font-weight: 300;
				padding-bottom: 1vw;
				font-size: 1.7vw;
				border-bottom: 0.5px solid rgba(205, 205, 205, 0.5);
				margin: auto auto 0.8vw auto;
			}
			.point {
				width: 25%;
				float: left;
				padding: 0.3vw;
				font-weight: 200;
				font-size: 1vw;
				p {
					color: rgba(255, 255, 255, 0.6);
				}
				i {
					font-size: 2.2vw;
					opacity: 0.5;
				}
			}
			.point1 {
				color: crimson;
			}
			.point2 {
				color: lightsteelblue;
			}
			.point3 {
				color: green;
			}
			.point4 {
				color: purple;
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
	margin-bottom: 3vw;
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
	}
}
</style>
