'use strict'

module.exports = ({ mongo, config }) => (request, response) => {
  const { id } = request.query

  mongo.connect(config.dburl)
    .then((db) => db.collection(config.collection.survey).findOne({ _id: id })
      .then((survey) => {
        if (!survey) {
          return response.status(404).json({ error: 'Survey not found' })
        }

        return db.collection(config.collection.votes).aggregate([
          { $match: { survey_id: id } },
          { $group: { _id: '$vote', total: { $sum: 1 } } }
        ]).toArray()
          .then((votes) => {
            const formatted = votes.reduce((obj, record) => {
              obj.survey.votes[record._id] = record.total
              return obj
            }, { survey: { id, title: survey.title, votes: {} } })

            response.status(200).json(formatted)
          })
      }))
    .then(() => mongo.disconnect())
    .catch(error => {
      console.error(error)
      return response.status(500).json({ error: 'Interal server error' })
    })
}
