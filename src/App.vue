<template>
    <div id="app">
        <styleguide :styleguide="styleguide"></styleguide>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue';

    export default {
        name: 'app',
        components: {
            HelloWorld,
        },
        data() {
            return {
                styleguide: require('@/styleguide.json'),
            };
        },
    };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
