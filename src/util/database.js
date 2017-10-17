'use strict'

const { MongoClient } = require('mongodb')

const state = { db: null }

module.exports = {
  connect (url) {
    return MongoClient.connect(url)
      .then((db) => {
        state.db = db
        return db
      })
  },

  disconnect () {
    return state.db.close().then(() => { state.db = null })
  },

  get db () { return state.db }
}
