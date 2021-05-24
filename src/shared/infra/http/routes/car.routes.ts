import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { Router } from 'express'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'


const carRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarController = new ListAvailableCarsController()
const createCarSpeficationController = new CreateCarSpecificationController()

carRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carRoutes.get('/available', listAvailableCarController.handle)
carRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpeficationController.handle)

export { carRoutes }