<template>
    <h1>{{element.name}}</h1>
</template>

<script>
import Elements from '@/elements';

export default {
	name: 'ElementPage',
	data() {
		return {
			element: null,
		};
	},
	created: function() {
		var id = parseInt(this.$route.params.id);
		this.element = Elements.find(x => x.atomicNumber === id);
	},
};
</script>