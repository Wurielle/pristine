const JsonSassWebpackPlugin = require('../json-sass-webpack-plugin');

test('Tester method should be available', () => {
    let plugin = new JsonSassWebpackPlugin();
    expect(plugin.tester()).toBe(true);
});