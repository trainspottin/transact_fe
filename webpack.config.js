var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');


module.exports = {
    context: __dirname+"/main",
    devtool: debug ? "inlin-sourcemap" : null,
    entry: {
        app: './client/js/scripts.js',

    },
    output:{
        path: __dirname + "/target/workspace/assets/[hash]",
        filename: "[name].min.js",
        publicPath: "/assets/[hash]/"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
    ], 
};
