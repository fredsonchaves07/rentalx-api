import { Router } from 'express'
import { authenticateRoutes } from './authenticate.routes'
import { carRoutes } from './car.routes'
import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'
import { rentalRoutes } from './rentals.routes'

const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRoutes)
router.use('/cars',carRoutes)
router.use('/users', usersRoutes)
router.use('/rentals', rentalRoutes)
router.use(authenticateRoutes)

export { router }