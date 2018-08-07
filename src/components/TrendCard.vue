<template>
    <div class="element">
        <div class="atomicnumber">{{element.atomicNumber}}
            <span>{{convertMass(element)}}</span>
        </div>
        <div class="symbol">{{element.symbol}}</div>
        <div class="name">{{element.name}}</div>
    </div>
</template>

<script>
export default {
	name: 'TrendCard',
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
	background: grey;
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
		font-size: 0.67vw;
		margin-top: -0.25vw;
	}
	.symbol {
		font-weight: 600;
		font-size: 2vw;
	}
	&:hover {
		color: rgba(255, 255, 255, 0.9);
		// transform: translate(-5px, -5px);
	}
}
</style>
