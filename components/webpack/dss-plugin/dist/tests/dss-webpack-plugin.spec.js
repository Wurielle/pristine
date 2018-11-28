'use strict';

var DSSWebpackPlugin = require('../dss-webpack-plugin');

test('Tester method should be available', function () {
    var plugin = new DSSWebpackPlugin();
    expect(plugin.tester()).toBe(true);
});

//# sourceMappingURL=dss-webpack-plugin.spec.js.map