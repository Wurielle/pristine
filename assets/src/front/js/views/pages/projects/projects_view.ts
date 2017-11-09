import * as Backbone from 'backbone';
import './../../../../templates/static/projects/projects.html'

export class ProjectsView extends Backbone.View<any> {
    el: any = '#app';
    $el: any = $(this.el);
    template = require('./../../../../templates/static/projects/projects.html');
    projectNb: number;
    constructor(projectNb: number){
        super();
        this.projectNb = projectNb;
        this.render();
    }

    initialize(){

    }

    render(){
        if (this.projectNb != undefined){
            var html = this.template({ project: "Project n°" + this.projectNb });
        } else {
            var html = this.template({ project: "projects" });
        }
        this.$el.html(html);
        return this;
    }
}
