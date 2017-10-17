'use strict'

module.exports = ({ mongo, config }) => (request, response) => {
  const { id } = request.query

  mongo.connect(config.dburl)
    .then(db => db.collection(config.collection.survey).findOne({ _id: id }))
    .then(survey => {
      if (survey) {
        return response.status(200).json({
          survey: { id, title: survey.title }
        })
      }
      return response.status(404).json({ error: 'Survey not found' })
    })
    .then(() => mongo.disconnect())
    .catch(error => {
      console.error(error)
      return response.status(500).json({ error: 'Interal server error' })
    })
}
