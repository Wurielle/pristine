import * as Backbone from 'backbone';
import * as _ from 'underscore';
import { CategorieCollection } from './../../../collections/categorie_collection.ts';
import { CategorieModel } from './../../../models/categorie_model.ts';

// import './../../../../templates/static/projects/projects.html'

export class ProjectsView extends Backbone.View<any> {
    el: any = '#app';
    $el: any = $(this.el);
    template = require('./../../../../templates/static/projects/projects.html');
    projectNb: number;
    collection: any;
    data: any;
    constructor(projectNb: number) {
        super();
        var scope = this
        this.projectNb = projectNb;
        this.render();
        this.collection = new CategorieCollection();
        this.collection.fetch({
            type: 'GET',
            dataType: "ld+json",
            complete: function(data: any){
                var data = JSON.parse(data['responseText']);
                _.each(data['hydra:member'], function(data){
                    var model = new CategorieModel(data);
                    scope.collection.models.push(model);
                    console.log(
                        model.get("id"),
                        model.get("title"),
                        model.get("realisations"),
                        model.get("posts"),
                        model.get("description"),
                        model.get("slug"),
                    );
                });
            }
        });
    }

    initialize() {

    }

    render() {
        if (this.projectNb != undefined) {
            var html = this.template({ project: "Project n°" + this.projectNb });
        } else {
            var html = this.template({ project: "projects" });
        }
        this.$el.html(html);
        return this;
    }
}
