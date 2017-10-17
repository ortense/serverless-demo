'use strict'

module.exports = (request, response) => {
  const name = request.query.name || 'World'
  response.status(200).json({ hello: `Hello ${name}!` })
}
