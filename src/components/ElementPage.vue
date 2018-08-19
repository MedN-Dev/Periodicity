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
        </v-container>
    </v-app>
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
	methods: {
		nextElement() {
			this.$router.push({ path: `/element/${this.element.atomicNumber + 1}` });
		},
	},
	created: function() {
		var id = parseInt(this.$route.params.id);
		this.element = Elements.find(x => x.atomicNumber === id);
	},
};
</script>

<style lang="scss" scoped>
</style>
