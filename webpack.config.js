const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
	plugins: [
		new HTMLPlugin()
	],
	node: {
  		fs: 'empty'
	}
}