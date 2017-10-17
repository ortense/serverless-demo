'use strict'

const uuid = require('uuid')
const config = require('./config.json')
const mongo = require('./src/util/database')

const dependency = { uuid, config, mongo }

exports.hello = require('./src/hello-world/hello')
exports.create = require('./src/survey/create')(dependency)
exports.survey = require('./src/survey/get-by-id')(dependency)
exports.vote = require('./src/survey/vote')(dependency)
exports.counting = require('./src/survey/counting')(dependency)

