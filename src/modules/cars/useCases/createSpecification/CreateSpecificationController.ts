import { container } from 'tsyringe';
import { Request, Response } from 'express'
import { CreationSpecificationUseCase } from './CreateSpecificationUseCase'

class CreateSpecificationController{

    async handle(request: Request, response: Response){
        const { name, description } = request.body

        const createSpecificationUseCase = container.resolve(CreationSpecificationUseCase)

        await createSpecificationUseCase.execute({ name, description })

        return response.status(201).json()
    }
}

export { CreateSpecificationController }