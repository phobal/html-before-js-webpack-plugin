export interface HtmlBeforeJSWebpackPluginOptions {
  paths: string[];
}

declare class HtmlBeforeJSWebpackPlugin {
  constructor(options: HtmlBeforeJSWebpackPluginOptions);
  apply(compiler: any): void;
}

export = HtmlBeforeJSWebpackPlugin;
