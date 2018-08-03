<template>
    <v-footer height="auto">
        <v-layout justify-center row wrap>
            <!-- <v-btn v-for="link in links" :key="link" color="white" flat round>
                {{ link }}
            </v-btn> -->
            <v-card-text class="white--text pt-0 about">
                Ptable.io is an open source application that displays and graphs data in order to make chemical statistics more accessible. It runs on Vue.js and uses data from Chris Andrejewski's npm package.
            </v-card-text>

            <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>
                &copy;2018 -
                <span>Kadin Zhang</span>
            </v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
export default {
	name: 'Footer',
	data: () => ({
		links: ['Help', '', 'Team', '', 'Github'],
	}),
};
</script>

<style lang="scss" scoped>
* {
	opacity: 0.85;
	font-weight: 200;
}
footer {
	color: #2c3e50;
	font-size: 1.2vw;
	padding-bottom: 10px;
	width: 70%;
	margin: 1vw auto auto auto;
}
.about {
	padding: 0;
	border-bottom: 0.5px solid rgba(240, 240, 240, 0.5);
	padding-bottom: 20px;
	font-size: 1.1vw;
}
span {
	font-weight: 600;
}
</style>
