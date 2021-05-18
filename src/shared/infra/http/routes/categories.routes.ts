import multer  from 'multer'
import { Router } from 'express'
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/importCategoryController'
import { ListCategoryController } from '@modules/cars/useCases/listCategory/ListCategoryController'
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const categoriesRoutes = Router()

const upload = multer({
    dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoryController()

categoriesRoutes.post(
    '/', 
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
)

categoriesRoutes.post(
    '/import', 
    ensureAuthenticated,
    ensureAdmin,
    importCategoryController.handle
)

categoriesRoutes.get('/', listCategoriesController.handle)

export { categoriesRoutes }