import * as Backbone from 'backbone';
import './../../../../templates/static/project/project.html'

export class ProjectView extends Backbone.View<any> {
    el: any = '#app';
    $el: any = $(this.el);
    template = require('./../../../../templates/static/project/project.html');
    constructor(){
        super();
    }

    initialize(){

    }

    render(){
        var html = this.template({project: "project" });
        this.$el.html(html);
        return this;
    }
}
