'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: ' "http://192.168.31.218:8800" ',
  API_LOGIN_ROOT: ' "http://192.168.31.218:8000" '
})
