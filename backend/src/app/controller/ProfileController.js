const connection = require('../../database/connection')

module.exports = {

  async index(request, response) {
    const ong_id = request.headers.authorization
    const incidents = await connection('incidents')
    .where('ong_id', ong_id)
    .select('*')

    return response.json(incidents)
  },

  // async create(request, response) {
  //   const { title, description, value } = request.body
  //   const ong_id = request.headers.authorization

  //   const [id] = await connection('incidents').insert({
  //     title,
  //     description,
  //     value,
  //     ong_id,
  //   })

  //   return response.json({ id })

  // },
  // async delete(request, response) {
  //   const { id } = request.params
  //   const ong_id = request.headers.authorization

  //   const incident = await connection('incidents').
  //     where('id', id)
  //     .select('ong_id')
  //     .first()

  //     console.log(incident)

  //     if(!incident){
  //       return response.status(404).json({ error: "Incident not found!" })
  //     }

  //   if (incident.ong_id != ong_id) {
  //     return response.status(401).json({ error: "Operation not permited." })
  //   }

  //   await connection('incidents').where('id', id).delete()

  //   return response.status(204).send()

  // }
}