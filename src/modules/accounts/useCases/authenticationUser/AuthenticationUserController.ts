import { container } from 'tsyringe';
import { Response, Request } from "express";
import { AuthenticationUserUseCase } from './AuthenticationUserUseCase';

class AuthenticationUserController{

    async handle(request: Request, response: Response): Promise<Response>{
        const { password, email } = request.body

        const authenticateUserUseCase = container.resolve(AuthenticationUserUseCase)

        const token = await authenticateUserUseCase.execute({ password, email })

        return response.json(token)
    }

}

export { AuthenticationUserController }