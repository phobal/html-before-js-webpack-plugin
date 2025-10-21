'use strict';
/**
 * HtmlBeforeJSWebpackPlugin
 * A small plugin that prepends custom scripts before the js assets injected by html-webpack-plugin.
 * Compiled output from TypeScript source (src/index.ts).
 */
function HtmlBeforeJSWebpackPlugin(options) {
  this.options = options || { paths: [] };
}

HtmlBeforeJSWebpackPlugin.prototype.apply = function (compiler) {
  var userPaths = Array.isArray(this.options && this.options.paths)
    ? this.options.paths
    : [];

  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      for (var i = userPaths.length - 1; i >= 0; i--) {
        if (htmlPluginData && htmlPluginData.plugin && htmlPluginData.plugin.options && htmlPluginData.plugin.options.hash) {
          var hash = (compilation && compilation.hash) ? compilation.hash : String(Date.now());
          userPaths[i] = userPaths[i] + '?' + hash;
        }
        htmlPluginData.assets.js.unshift(userPaths[i]);
      }
      callback(null, htmlPluginData);
    });
  });
};

module.exports = HtmlBeforeJSWebpackPlugin;
