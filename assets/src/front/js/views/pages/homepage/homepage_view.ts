import * as Backbone from 'backbone';
// import './../../../../templates/static/homepage/index.html'

export class HomepageView extends Backbone.View<any> {
    el: any = '#app';
    $el: any = $(this.el);
    template = require('./../../../../templates/static/homepage/index.html');
    constructor(){
        super();
        this.render();
    }

    initialize(){

    }

    render(){
        var html = this.template({homepage: "Hello World" });
        this.$el.html(html);
        return this;
    }
}
