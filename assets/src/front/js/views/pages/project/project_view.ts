import * as Backbone from 'backbone';

export class ProjectView extends Backbone.View<any> {
    el: any = '#title';
    $el: any = $(this.el);
    constructor(){
        super();
    }

    initialize(){

    }

    render(){
        this.$el.html('Project');
        return this;
    }
}
