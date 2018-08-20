<template>
	<v-app dark>
		<v-container fluid grid-list-md style="padding: 0; height: 100%">
			<!-- <v-toolbar flat color="primary" style="text-align: center">
                <v-btn style="margin-left: 30%" icon @click="previousElement()">
                    <v-icon style="font-size: 40px">
                        navigate_before</v-icon>
                </v-btn>
                <v-toolbar-title style="margin:auto;width:50%" justify-center>{{element.atomicNumber + " - " + element.name}}</v-toolbar-title>
                <v-btn style="margin-right: 30%" icon @click="nextElement()">
                    <v-icon style="font-size: 40px">
                        navigate_next</v-icon>
                </v-btn>
            </v-toolbar> -->
			<v-layout row wrap class="layout">
				<v-flex xs12>
					<p class="name">{{element.name}}<br/>
						<span :style="'color:'+classify(element)[2]">{{classify(element)[0]}}</span>
					</p>
				</v-flex>
				<v-flex sm4 xs12>
					<div class="card">
						<p>Atom</p>
						<div id="bohr-model-container"></div>
					</div>
				</v-flex>
				<v-flex sm8 xs12>
					<div class="card">
						<p>Trends</p>
						<TrendBox height="270px" :active="element.atomicNumber" />
					</div>
				</v-flex>
			</v-layout>
		</v-container>
	</v-app>
</template>

<script>
import Elements from '@/elements';
import TrendBox from './home/TrendBox';
import 'atomic-bohr-model/dist/atomicBohrModel.min.js';

export default {
	name: 'ElementPage',
	components: {
		TrendBox,
	},
	mounted() {
		var atomicConfig = {
			containerId: '#bohr-model-container',
			numElectrons: this.element.atomicNumber,
			nucleusRadius: 30,
			nucleusColor: this.classify(this.element)[3],
			electronRadius: 3, // Default value is 3
			electronColor: this.classify(this.element)[2], // See nucleusColor
			orbitalSpacing: 10, // If not specified will be a 1/3rd of the nucleusRadius
			orbitalWidth: 1, // width of orbital paths, default is 0.1
			orbitalColor: this.classify(this.element)[3], // see electronColor
			idNumber: 10, // Required int to provide unique Atoms
			animationTime: 1000, // Time in milliseconds for initial electron animation
			// rotateConfig: { speed: 50, clockwise: true }, // Rotates entire Atom with given params
			orbitalRotationConfig: {
				// Invokes orbital rotations at initialization
				pattern: {
					alternating: false, // Alternate orbital direction
					clockwise: false, // Direction for all orbitals
					preset: 'cubedPositive', // String to set pattern (see Features section)
				},
			},
			symbolOffset: 8, // When modifying nucleus radius this may need adjusting
			drawSymbol: true,
		};

		var myAtom = new Atom(atomicConfig);
	},
	data() {
		return {
			element: null,
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
		};
	},
	methods: {
		nextElement() {
			this.$router.push({ path: `/element/${this.element.atomicNumber + 1}` });
		},
		classify(element) {
			var n = element.atomicNumber;
			if (this.nonMetal.includes(n)) {
				if ([7, 8].indexOf(n) > -1) {
					return ['Diatomic Nonmetal', 'nonMetal', 'rgba(86, 88, 148, 0.9)', 'rgba(56, 58, 118, 1)'];
				} else {
					return ['Polyatomic Nonmetal', 'nonMetal', 'rgba(86, 88, 148, 0.9)', 'rgba(56, 58, 118, 1)'];
				}
			} else if (this.alkali.includes(n)) {
				return ['Alkali Metal', 'alkali', 'rgba(120, 80, 90, 0.9)', 'rgba(90, 50, 60, 1)'];
			} else if (this.akaliEarth.includes(n)) {
				return ['Alkali Earth Metal', 'alkaliEarth', 'rgba(133, 113, 101, 0.9)', 'rgba(83, 63, 51, 1)'];
			} else if (this.transitionMetal.includes(n)) {
				return ['Transition Metal', 'transitionMetal', 'rgba(99, 113, 138, 0.9)', 'rgba(59, 73, 98, 1)'];
			} else if (this.postTransition.includes(n)) {
				return ['Post Transition Metal', 'postTransition', 'rgba(74, 134, 119, 0.9)', 'rgba(34, 84, 79, 1)'];
			} else if (this.halogen.includes(n)) {
				return ['Halogen', 'halogen', 'rgba(142, 140, 201, 0.9)', 'rgba(52, 50, 101, 1)'];
			} else if (this.noble.includes(n)) {
				return ['Noble Gas', 'noble', 'rgba(136, 100, 170, 0.9)', 'rgba(86, 50, 120, 1)'];
			} else if (this.lanthanoid.includes(n)) {
				return ['Lanthanoid', 'lanthanoid', 'rgba(120, 107, 151, 0.9)', 'rgba(70, 57, 101, 1)'];
			} else if (this.actinoid.includes(n)) {
				return ['Actinoid', 'actinoid', 'rgba(102, 81, 113, 0.9)', 'rgba(62, 41, 73, 1)'];
			} else if (this.metalloid.includes(n)) {
				return ['Metalloid', 'metalloid', 'rgba(74, 114, 146, 0.9)', 'rgba(34, 74, 106, 1)'];
			}
		},
	},
	created: function() {
		var id = parseInt(this.$route.params.id);
		this.element = Elements.find(x => x.atomicNumber === id);
	},
};
</script>

<style lang="scss" scoped>
.application.theme--dark {
	background: rgba(30, 36, 50, 1);
	.layout {
		width: 85%;
		margin: auto;
		.name {
			font-size: 40px;
			font-weight: 300;
			text-align: center;
			padding: 30px;
			line-height: 40px;
			width: 100%;
			max-height: 100px;
			span {
				font-size: 25px;
			}
		}
		.card {
			text-align: center;
			background: #282e3c;
			height: 400px;
			margin: 15px;
			p {
				font-size: 25px;
				font-weight: 300;
				padding: 20px;
			}
			#bohr-model-container {
				width: 90%;
				margin: -20px auto 0 auto;
				height: 250px;
			}
		}
	}
}

@media only screen and (min-width: 1900px) {
	.application.theme--dark {
		background: rgba(30, 36, 50, 1);
		.layout {
			width: 1400px;
			margin: auto;
			.name {
				font-size: 40px;
				font-weight: 300;
				text-align: center;
				padding: 30px;
				line-height: 40px;
				width: 100%;
				span {
					font-size: 25px;
				}
			}
			.card {
				text-align: center;
				background: #282e3c;
				height: 400px;
				margin: 15px;
				p {
					font-size: 25px;
					font-weight: 300;
					padding: 20px;
				}
			}
		}
	}
}
</style>
