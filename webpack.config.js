var path = require('path');
var webpack = require('webpack');
var Chunk = webpack.optimize.CommonsChunkPlugin;
var Uglify = webpack.optimize.UglifyJsPlugin;
module.exports = {
	entry: {
		controller: __dirname + '/src/controller.js',
		vendor: ['react', 'react-ace'],
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname +'/static',
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'jsx-loader?harmony'
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass?outputStyle=nested' +
					'&includePaths[]=' + path.resolve(__dirname + '/node_modules') +
					'&includePaths[]=' + path.resolve(__dirname + '/src')
			}
		]
	},
	// devtool: '#source-map',
	plugins: [
		new Chunk('vendor', 'vendors.min.js'),
		new Uglify({ compress: { warnings: false }})
	]
};
