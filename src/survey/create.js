'use strict'

module.exports = ({ mongo, config, uuid }) => (request, response) => {
  const { title } = request.body

  mongo.connect(config.dburl)
    .then(db => db.collection(config.collection.survey).insertOne({
      _id: uuid.v4(),
      votes: {},
      title
    }))
    .then(result => response.status(201).send({
      survey: {
        id: result.ops[0]._id,
        title
      }
    }))
    .then(() => mongo.disconnect())
    .catch(error => {
      console.error(error)
      return response.status(500).json({ error: 'Interal server error' })
    })
}
