import * as Backbone from 'backbone';
import * as $ from 'jquery';
import { HomepageView } from './../views/pages/homepage/homepage_view.ts';
import { ProjectView } from './../views/pages/project/project_view.ts';
import { AboutView } from './../views/pages/about/about_view.ts';
import { ContactView } from './../views/pages/contact/contact_view.ts';

export class AppRouter extends Backbone.Router {
    routes: any;
    constructor(){
        super();
        this.routes = {
            '*path': 'homepage',
            'homepage': 'homepage',
            'project': 'project',
            'about': 'about',
            'contact': 'contact'
        };
        // call _bindRoutes() here function to bind your routes
        (<any>this)._bindRoutes();
        this.listeners();
    }

    listeners() {
        var scope: any = this;
        $(document).on("click", "a", function(event){
            event.preventDefault();
            var href = $(this).attr("href");
            scope.navigate(href, {trigger: true});
            var page = scope.routes[href.replace('#','')];
            scope[page]();
        });
    }

    homepage() {
        var view: any = new HomepageView();
        view.render();
    }

    project() {
        var view: any = new ProjectView();
        view.render();
    }

    about() {
        var view: any = new AboutView();
        view.render();
    }

    contact() {
        var view: any = new ContactView();
        view.render();
    }
}
