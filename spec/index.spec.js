var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var rmrf = require('rimraf');
var cheerio = require('cheerio');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlBeforeJSWebpackPlugin = require('../');

var OUTPUT_PATH = path.join(__dirname, '../dist');
var beforeFiles = ['fixture/before.js'];
describe("test", function () {

    beforeEach(function (done) {
        rmrf(OUTPUT_PATH, done);
    });

    it('add custom js file before html-webpack-plugin', function (done) {
        webpack({
            entry: path.join(__dirname, 'fixtures', 'entry.js'),
            output: {
                path: OUTPUT_PATH
            },
            plugins: [
                new ExtractTextPlugin('style.css'),
                new HtmlWebpackPlugin(),
                new HtmlBeforeJSWebpackPlugin({
                    paths: beforeFiles
                }),
            ]
        }, function (err) {
            expect(err).toBeFalsy();
            var htmlFile = path.resolve(OUTPUT_PATH, 'index.html');
            fs.readFile(htmlFile, 'utf8', function (er, data) {
                expect(er).toBeFalsy();
                var $ = cheerio.load(data);
                expect($('script[type="text/javascript"]').attr('src')).toBe(beforeFiles[0]);
                done();
            });
        })
    })
})