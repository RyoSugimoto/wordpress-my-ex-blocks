const path = require('path')
const WpDefaultConfig = require('@wordpress/scripts/config/webpack.config')

const srcDir = path.resolve(__dirname, 'src')
const buildDir = path.resolve(__dirname, 'dist')
const scriptName = 'my-extra-blocks'
const frontScriptName = 'my-extra-blocks-front'

/**
 * Setting for `wp-scripts build`
 */

const block = {
  ...WpDefaultConfig, // Spread default setting
  entry: {
    [scriptName]: `${srcDir}/index.js`,
    [frontScriptName]: `${srcDir}/assets/js/front.js`
  },
  output: {
    path: `${buildDir}`,
    filename: '[name].js'
  }
}

module.exports = [block]
