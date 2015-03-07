var path = require('path');
var webpack = require('webpack');
var Chunk = webpack.optimize.CommonsChunkPlugin;
module.exports = {
	entry: {
		controller: __dirname + '/src/controller.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname +'/static',
		// pathinfo: process.env.NODE_ENV !== 'production',
	},
	externals: {
		'react/addons': 'React',
		'react': 'React',
		'brace': 'ace',
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
	devtool: '#source-map',
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				dead_code: true,
				conditionals: true,
				comparisons: true,
				unused: true,
			}
		})
	]
};
