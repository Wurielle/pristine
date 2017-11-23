import * as Backbone from 'backbone';
// import './../../../../templates/static/about/about.html'

export class AboutView extends Backbone.View<any> {
    el: any = '#app';
    $el: any = $(this.el);
    template = require('./../../../../templates/static/about/about.html');
    constructor(){
        super();
        this.render();
    }

    initialize(){

    }

    render(){
        var html = this.template({about: "about" });
        this.$el.html(html);
        return this;
    }
}
