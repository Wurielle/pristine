import * as Backbone from 'backbone';

export class AboutView extends Backbone.View<any> {
    el: any = '#title';
    $el: any = $(this.el);
    constructor(){
        super();
    }

    initialize(){

    }

    render(){
        this.$el.html('About');
        return this;
    }
}
