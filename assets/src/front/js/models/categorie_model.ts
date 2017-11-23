import * as Backbone from 'backbone';
import * as _ from 'underscore';
// import './../../../../templates/static/about/about.html'

export class CategorieModel extends Backbone.Model {
    constructor(obj: any) {
        super();
        this.attributes = obj;
        // if(obj.attributes){
        //     this.attributes = obj.attributes;
        //     // console.log(obj.attributes);
        // }
        // this.url = this.baseUrl + url;
        // console.log(this);
    }

    // get(attr: any) {
    //     return Backbone.Model.prototype.get.call(this, attr);
    // }

    // parse(response: any, options: any) {
    //     console.log(response, options);
    //     return response;
    // }

}
