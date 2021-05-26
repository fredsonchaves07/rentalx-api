import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import uploadConfig from '../../../../config/upload'
import { Router } from 'express'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { UploadCarImageController } from '@modules/cars/useCases/uploadImage/UploadCarImageController'
import multer from 'multer'


const carRoutes = Router()

const upload = multer(uploadConfig.upload('./tmp/cars'))

const createCarController = new CreateCarController()
const listAvailableCarController = new ListAvailableCarsController()
const createCarSpeficationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

carRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carRoutes.get('/available', listAvailableCarController.handle)
carRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpeficationController.handle)
carRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, upload.array('images'), uploadCarImageController.handle)

export { carRoutes }