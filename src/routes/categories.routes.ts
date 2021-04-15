import multer  from 'multer'
import { Router } from 'express'
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/importCategoryController'
import { ListCategoryController } from '../modules/cars/useCases/listCategory/ListCategoryController'

const categoriesRoutes = Router()

const upload = multer({
    dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoryController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.post('/import', importCategoryController.handle)

categoriesRoutes.get('/', listCategoriesController.handle)

export { categoriesRoutes }