import * as Backbone from 'backbone';
import './../../../../templates/static/contact/contact.html'

export class ContactView extends Backbone.View<any> {
    el: any = '#app';
    $el: any = $(this.el);
    template = require('./../../../../templates/static/contact/contact.html');
    constructor(){
        super();
        this.render();
    }

    initialize(){

    }

    render(){
        var html = this.template({contact: "contact" });
        this.$el.html(html);
        return this;
    }
}
