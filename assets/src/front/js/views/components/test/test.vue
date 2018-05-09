<template>
    <div>This is a {{ message }}</div>
</template>
<style lang="sass" scope>
    @import 'styles/_variables.sass' // see webpack aliases
    *
        background-color: $grey
</style>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class Test extends Vue {
            @Prop() name!: string;
            @Prop() initialEnthusiasm!: number;
            enthusiasm = this.initialEnthusiasm;
            message: any = 'uwu';

            increment() {
                this.enthusiasm++;
            }

            decrement() {
                if (this.enthusiasm > 1) {
                    this.enthusiasm--;
                }
            }

            get exclamationMarks(): string {
                return Array(this.enthusiasm + 1).join('!');
            }
    }
</script>
