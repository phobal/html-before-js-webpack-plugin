'use strict';

function HtmlBeforeJSWebpackPlugin(options) {
	this.options = options;
}

HtmlBeforeJSWebpackPlugin.prototype.apply = function (compiler) {
	var paths = this.options.paths;
	compiler.plugin('compilation', function (compilation, options) {
		compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
			for (var i = paths.length - 1; i >= 0; i--) {
				if (htmlPluginData.plugin.options.hash) {
					var hash = Date.parse(new Date());
					paths[i] = paths[i] + '?' + hash;
				}
				htmlPluginData.assets.js.unshift(paths[i]);
			}
			callback(null, htmlPluginData);
		});
	});
};

module.exports = HtmlBeforeJSWebpackPlugin;