import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Test extends Vue {
        @Prop() name!: string;
        @Prop() initialEnthusiasm!: number;
        enthusiasm = this.initialEnthusiasm;
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
// export default {
//     data(){
//         return {
//             message: 'a warming welcome'
//         }
//     },
//     created() {
//         console.log('a')
//     }
// }
