import * as Backbone from 'backbone';
import * as _ from 'underscore';
import { CategorieModel } from './../models/categorie_model.ts';

// var jsonld = require('jsonld');
// import './../../../../templates/static/about/about.html'

export class CategorieCollection extends Backbone.Collection<any> {
    // model: any = CategorieModel;
    url: any = "http://192.168.2.83/categories";

    constructor(){
        super();
    }

    initialize() {

    }

    // parse(response: any, options: any) {
    //     console.log(response);
    //     return response;
    // }

    // sync(method:any, model:any, options:any) {
    //     var that = this;
    //     var params = _.extend({
    //         type: 'GET',
    //         dataType: 'jsonp',
    //         url: that.url,
    //         processData: false
    //     }, options);
    //
    //     return $.ajax(params);
    // }
}
