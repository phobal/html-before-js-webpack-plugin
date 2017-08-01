html-before-js-webpack-plugin
=============================

[![npm version](https://badge.fury.io/js/html-before-js-webpack-plugin.svg)](https://badge.fury.io/js/html-before-js-webpack-plugin)

Intro
-----
Enhances [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)

This is an extension plugin for the [webpack](http://webpack.github.io), It allows you to embed a script before scripts by the html-webpack-plugin plugin

You may encounter the following scenario, you want to load the project package file before loading some configuration files, example: the address of the Restful, test environment
api and devlopment api is diffrent, so ,We usually write a separate address of the api address, and then before the introduction of bundle.js

`api.js`

```js
window.apiIp = process.env ===  'dev' ? 'http://develop/api/': 'http://production/api/';
```
`index.html`
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>demo</title>
</head>
<body>
    <div class="app"></div>
    <script type="text/javascript" src="static/api.js"></script>
    <script type="text/javascript" src="static/app.dfbb10307343f695f953.js?dfbb10307343f695f953"></script>
</body>
</html>
```
Installation
------------

You must be running webpack on node V4 or higher

Install
``` shell
npm install html-before-js-webpack-plugin --save-dev
```

Usage
-----
Require the plugin to your webpack config

``` js
var HtmlBeforeJSWebpackPlugin = require('html-before-js-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
```
Add the plugin to your webpack config file as fellows

``` js
plugins: [
    new HtmlBeforeJSWebpackPlugin({
        paths: ['add_files_path_you_want_to']
    }),
    new HtmlWebpackPlugin()
]
```
this plugin have a parmater `paths` , type is `Array`, means `files path you want to`





