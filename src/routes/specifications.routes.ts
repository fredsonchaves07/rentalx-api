import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ListSpecificationController } from '../modules/cars/useCases/listSpecification/ListSpecificationController'


const specificationsRoutes = Router()


const createSpecificationController = new CreateSpecificationController()
const listSpecificationController = new ListSpecificationController()

specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post('/', createSpecificationController.handle)

specificationsRoutes.get('/', listSpecificationController.handle)

export { specificationsRoutes }