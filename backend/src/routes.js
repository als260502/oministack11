const { Router } = require('express')

const OngController = require('./app/controller/OngController')
const IncidentController = require('./app/controller/IncidentController')
const ProfileController = require('./app/controller/ProfileController')
const SessionController = require('./app/controller/SessionController')



const routes = Router()

routes.post('/session', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)



module.exports = routes