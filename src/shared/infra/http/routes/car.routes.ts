import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { Router } from 'express'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'


const carRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarController = new ListAvailableCarsController()

carRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carRoutes.get('/available', listAvailableCarController.handle)

export { carRoutes }