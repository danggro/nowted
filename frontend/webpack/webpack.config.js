const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const { EnvironmentPlugin } = require('webpack')

module.exports = (envVars) => {
  const { env, REACT_APP_BACKEND_URL } = envVars
  const envConfig = require(`./webpack.${env}`)
  envConfig.plugins = envConfig.plugins.concat(
    new EnvironmentPlugin({
      NODE_ENV: env === 'dev' ? 'development' : 'production',
      REACT_APP_BACKEND_URL,
    })
  )
  const config = merge(commonConfig, envConfig)
  return config
}
