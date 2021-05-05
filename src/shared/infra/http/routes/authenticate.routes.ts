import { AuthenticationUserController } from '@modules/accounts/useCases/authenticationUser/AuthenticationUserController'
import { Router } from 'express'

const authenticateRoutes = Router()

const authenticationUserController = new AuthenticationUserController

authenticateRoutes.post('/session', authenticationUserController.handle)

export { authenticateRoutes }