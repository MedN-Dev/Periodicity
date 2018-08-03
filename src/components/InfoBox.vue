<template>
	<div class="box">
		<div class="header">
			<span class="name" :class="classify(element)[1]">{{element.atomicNumber + ' - ' + element.name}}</span>
			<span class="classification" :class="classify(element)[1]">{{classify(element)[0]}}</span>
		</div>
		<div class="info">
			<div class="state">
				<p>{{createState(element.standardState)}}</p>
				<img v-bind:src="getImg(element.standardState)" v-bind:alt="pic" />
			</div>
			<!-- <div class="display">
				<p class="label">Atomic Number</p>
				<p class="value">{{element.atomicNumber}}</p>
			</div> -->
			<div class="display">
				<p class="label">Atomic Mass</p>
				<p class="value">{{convertMass(element)}}</p>
			</div>
			<div class="display" id="ec">
				<p class="label">Election Configuration</p>
				<p v-html="convertEC(element)" class="value"></p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'InfoBox',
	props: ['element', 'mass'],
	data() {
		return {
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
	methods: {
		classify(element) {
			var n = element.atomicNumber;
			if (this.nonMetal.includes(n)) {
				if ([7, 8].indexOf(n) > -1) {
					return ['Diatomic Nonmetal', 'nonMetal'];
				} else {
					return ['Polyatomic Nonmetal', 'nonMetal'];
				}
			} else if (this.alkali.includes(n)) {
				return ['Alkali Metal', 'alkali'];
			} else if (this.akaliEarth.includes(n)) {
				return ['Alkali Earth Metal', 'alkaliEarth'];
			} else if (this.transitionMetal.includes(n)) {
				return ['Transition Metal', 'transitionMetal'];
			} else if (this.postTransition.includes(n)) {
				return ['Post Transition Metal', 'postTransition'];
			} else if (this.halogen.includes(n)) {
				return ['Halogen', 'halogen'];
			} else if (this.noble.includes(n)) {
				return ['Noble Gas', 'noble'];
			} else if (this.lanthanoid.includes(n)) {
				return ['Lanthanoid', 'lanthanoid'];
			} else if (this.actinoid.includes(n)) {
				return ['Actinoid', 'actinoid'];
			} else if (this.metalloid.includes(n)) {
				return ['Metalloid', 'metalloid'];
			}
		},
		createState(state) {
			if (state === 'solid') {
				return 'Solid';
			} else if (state === 'liquid') {
				return 'Liquid';
			} else if (state === 'gas') {
				return 'Gas';
			} else {
				return 'Unknown';
			}
		},
		getImg(state) {
			if (state === 'solid') {
				return require('../assets/solid.png');
			} else if (state === 'liquid') {
				return require('../assets/liquid.png');
			} else if (state === 'gas') {
				return require('../assets/gas.png');
			} else {
				return require('../assets/unknown.png');
			}
		},
		convertMass(element) {
			var n = element.atomicNumber;
			var m = element.atomicMass;
			var exceptions = [57, 58, 59, 60, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 90, 91, 92];
			if ((n <= 83 && n !== 61 && n !== 43) || exceptions.indexOf(n) > -1) {
				m = m.slice(0, -3);
				return parseFloat(m).toFixed(3);
			} else {
				return m.toString();
			}
		},
		convertEC(element) {
			var ec = element.electronicConfiguration.split('');
			var en = element.atomicNumber;
			for (var i = 0; i < ec.length; i++) {
				if (ec[i].match(/[a-z]/i) && i > 3) {
					ec[i + 1] = '<sup>' + ec[i + 1] + '</sup>';
					if (ec[i + 2] && ec[i + 2] !== ' ') {
						ec[i + 2] = '<sup>' + ec[i + 2] + '</sup>';
						i++;
					}
					i++;
				}
			}

			if (parseInt(element.atomicNumber) > 2) {
				ec.splice(0, 0, '<span style="color: rgba(255, 255, 255, 0.3);">');
				ec.splice(5, 0, '</span>');
			}
			return ec.join('');
		},
	},
};
</script>

<style lang="scss" scoped>
.box {
	width: 100%;
	height: 100%;
	padding-top: 1vw;
	padding-left: 3vw;
	.header {
		margin-left: 0.5vw;

		.classification {
			color: rgba(255, 255, 255, 0.5);
			font-size: 1.7vw;
			margin-left: 2vw;
			&:after {
				// padding-right: 5px;
				content: ' ';
			}
		}
		.alkali {
			border-color: rgba(110, 60, 70, 0.65);
			color: rgba(120, 80, 90, 0.8);
		}
		.alkaliEarth {
			border-color: rgba(103, 83, 71, 0.65);
			color: rgba(133, 113, 101, 0.8);
		}
		.transitionMetal {
			border-color: rgba(69, 83, 108, 0.65);
			color: rgba(99, 113, 138, 0.8);
		}
		.noble {
			border-color: rgba(106, 70, 140, 0.65);
			color: rgba(136, 100, 170, 0.8);
		}
		.halogen {
			border-color: rgba(112, 110, 171, 0.65);
			color: rgba(142, 140, 201, 0.8);
		}
		.nonMetal {
			border-color: rgba(56, 58, 118, 0.65);
			color: rgba(86, 88, 148, 0.8);
		}
		.metalloid {
			border-color: rgba(44, 84, 116, 0.65);
			color: rgba(74, 114, 146, 0.8);
		}
		.postTransition {
			border-color: rgba(44, 104, 89, 0.65);
			color: rgba(74, 134, 119, 0.8);
		}
		.lanthanoid {
			border-color: rgba(90, 77, 121, 0.65);
			color: rgba(120, 107, 151, 0.8);
		}
		.actinoid {
			border-color: rgba(72, 51, 83, 0.65);
			color: rgba(102, 81, 113, 0.8);
		}
		.name {
			color: rgba(255, 255, 255, 0.85);
			font-size: 2vw;
			border-bottom-width: 0.3vw;
			border-bottom-style: solid;
		}
	}
	.info {
		width: 100%;
		.state {
			width: 20%;
			margin-left: -5%;
			display: block;
			float: left;
			p {
				font-size: 1.5vw;
				color: rgba(255, 255, 255, 0.5);
				text-align: center;
				margin-bottom: 0;
				margin-top: 2.3vw;
			}
			img {
				width: 42%;
				opacity: 0.8;
				margin: auto;
				margin-top: 0.3vw;
				display: block;
			}
		}
		.display {
			display: block;
			width: 25%;
			float: left;
			.label {
				font-size: 1.5vw;
				color: rgba(255, 255, 255, 0.6);
				text-align: center;
				margin-bottom: 0;
				margin-top: 2.3vw;
			}
			.value {
				font-size: 2.7vw;
				font-weight: 400;
				text-align: center;
				margin: 0.5vw auto 0 auto;
				color: rgba(255, 255, 255, 0.8);
			}
		}
		#ec {
			width: 56%;
			.value {
				margin-top: 0.5vw;
			}
		}
	}
}
</style>
