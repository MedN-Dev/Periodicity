<template>
	<div class="element">
		<div class="atomicnumber">{{element.atomicNumber}}
			<span>{{element.atomicMass}}</span>
		</div>
		<div class="symbol">{{element.symbol}}</div>
		<div class="name">{{element.name}}</div>
	</div>
</template>

<script>
export default {
	name: 'ElementCard',
	props: ['element'],
	data() {
		return {};
	},
	methods: {
		convertMass(element) {
			var n = element.atomicNumber;
			var m = element.atomicMass;
			var exceptions = [57, 58, 59, 60, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 90, 91, 92];
			if ((n <= 83 && n !== 61 && n !== 43) || exceptions.indexOf(n) > -1) {
				m = m.slice(0, -3);
				return parseFloat(parseFloat(m).toFixed(3));
			} else {
				return m.toString();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.element {
	color: rgba(245, 245, 245, 0.55);
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	text-align: center;
	padding: 0.2vw;
	transition: 0.2s;
	transition-timing-function: ease;
	.atomicnumber {
		text-align: left;
		color: rgba(245, 245, 245, 0.5);
		font-size: 0.65vw;
		span {
			float: right;
			color: rgba(245, 245, 245, 0.3);
		}
	}
	.name {
		font-size: 0.66vw;
		margin-top: -0.2vw;
		opacity: 0.9;
	}
	.symbol {
		font-weight: 600;
		font-size: 2vw;
		line-height: 2.5vw;
	}
	&:hover {
		color: rgba(255, 255, 255, 0.9);
	}
}
.alkali {
	background-color: rgba(110, 60, 70, 0.65);
	&:hover {
		background-color: rgba(100, 50, 60, 0.4);
	}
}
.alkaliEarth {
	background-color: rgba(103, 83, 71, 0.65);
	&:hover {
		background-color: rgba(93, 73, 61, 0.4);
	}
}
.transitionMetal {
	background-color: rgba(69, 83, 108, 0.65);
	&:hover {
		background-color: rgba(59, 73, 98, 0.4);
	}
}
.noble {
	background-color: rgba(106, 70, 140, 0.65);
	&:hover {
		background-color: rgba(96, 60, 130, 0.4);
	}
}
.halogen {
	background-color: rgba(112, 110, 171, 0.65);
	&:hover {
		background-color: rgba(102, 100, 161, 0.4);
	}
}
.nonMetal {
	background-color: rgba(56, 58, 118, 0.65);
	&:hover {
		background-color: rgba(46, 48, 108, 0.4);
	}
}
.metalloid {
	background-color: rgba(44, 84, 116, 0.65);
	&:hover {
		background-color: rgba(34, 74, 106, 0.4);
	}
}
.postTransition {
	background-color: rgba(44, 104, 89, 0.65);
	&:hover {
		background-color: rgba(34, 94, 79, 0.4);
	}
}
.lanthanoid {
	background-color: rgba(90, 77, 121, 0.65);
	&:hover {
		background-color: rgba(80, 67, 111, 0.4);
	}
}
.actinoid {
	background-color: rgba(72, 51, 83, 0.65);
	&:hover {
		background-color: rgba(62, 41, 73, 0.4);
	}
}
@media only screen and (max-width: 600px) {
	.element {
		color: rgba(245, 245, 245, 0.55);
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		text-align: center;
		padding: 0.4vw;
		transition: 0.2s;
		transition-timing-function: ease;
		.atomicnumber {
			text-align: left;
			color: rgba(245, 245, 245, 0.5);
			font-size: 1.2vw;
			span {
				float: right;
				color: rgba(245, 245, 245, 0.3);
			}
		}
		.name {
			font-size: 1.3vw;
			margin-top: 0;
			opacity: 0.9;
		}
		.symbol {
			font-weight: 600;
			font-size: 4vw;
			line-height: 4.5vw;
		}
		&:hover {
			color: rgba(255, 255, 255, 0.9);
		}
	}
}
</style>
