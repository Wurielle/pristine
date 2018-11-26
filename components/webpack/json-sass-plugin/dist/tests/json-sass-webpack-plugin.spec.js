'use strict';

var JsonSassWebpackPlugin = require('../json-sass-webpack-plugin');

test('Tester method should be available', function () {
    var plugin = new JsonSassWebpackPlugin();
    expect(plugin.tester()).toBe(true);
});

//# sourceMappingURL=json-sass-webpack-plugin.spec.js.map