import * as Backbone from 'backbone';

export class HomepageView extends Backbone.View<any> {
    el: any = '#title';
    $el: any = $(this.el);
    constructor(){
        super();
    }

    initialize(){

    }

    render(){
        this.$el.html('Hello World');
        return this;
    }
}
