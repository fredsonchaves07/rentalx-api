import { Router } from 'express'
import { AuthenticationUserController } from '../modules/accounts/useCases/authenticationUser/AuthenticationUserController'

const authenticateRoutes = Router()

const authenticationUserController = new AuthenticationUserController

authenticateRoutes.post('/session', authenticationUserController.handle)

export { authenticateRoutes }