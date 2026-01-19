export interface HtmlBeforeJSWebpackPluginOptions {
  paths: string[];
}

/**
 * HtmlBeforeJSWebpackPlugin
 * A small plugin that prepends custom scripts before the js assets injected by html-webpack-plugin.
 * Rewritten in TypeScript for better type-safety and maintainability.
 */
class HtmlBeforeJSWebpackPlugin {
  private options: HtmlBeforeJSWebpackPluginOptions;

  constructor(options: HtmlBeforeJSWebpackPluginOptions) {
    this.options = options || ({ paths: [] } as HtmlBeforeJSWebpackPluginOptions);
  }

  public apply(compiler: any) {
    const userPaths: string[] = Array.isArray(this.options && this.options.paths)
      ? this.options.paths
      : [];

    compiler.plugin('compilation', (compilation: any) => {
      compilation.plugin(
        'html-webpack-plugin-before-html-processing',
        (htmlPluginData: any, callback: (err: Error | null, data?: any) => void) => {
          for (let i = userPaths.length - 1; i >= 0; i--) {
            if (htmlPluginData && htmlPluginData.plugin && htmlPluginData.plugin.options && htmlPluginData.plugin.options.hash) {
              const hash = (compilation && compilation.hash) ? compilation.hash : String(Date.now());
              userPaths[i] = userPaths[i] + '?' + hash;
            }

            htmlPluginData.assets.js.unshift(userPaths[i]);
          }

          callback(null, htmlPluginData);
        }
      );
    });
  }
}

export = HtmlBeforeJSWebpackPlugin;
