'use strict'

module.exports = ({ mongo, config }) => (request, response) => {
  const { survey_id, vote } = request.body

  mongo.connect(config.dburl)
    .then(db => db.collection(config.collection.votes).insertOne({
      survey_id,
      vote
    }))
    .then(result => response.status(201).send({ message: 'success' }))
    .then(() => mongo.disconnect())
    .catch(error => {
      console.error(error)
      return response.status(500).json({ error: 'Interal server error' })
    })
}
