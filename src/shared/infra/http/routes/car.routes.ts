import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { Router } from 'express'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'


const carRoutes = Router()

const createCarController = new CreateCarController()

carRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

export { carRoutes }