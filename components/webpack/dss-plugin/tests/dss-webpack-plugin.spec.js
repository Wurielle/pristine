const DSSWebpackPlugin = require('../dss-webpack-plugin');

test('Tester method should be available', () => {
    let plugin = new DSSWebpackPlugin();
    expect(plugin.tester()).toBe(true);
});