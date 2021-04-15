import { container } from 'tsyringe';
import { Request, Response } from 'express'
import { ListSpecificationUseCase } from './ListSpecificationUseCase';

class ListSpecificationController{

    async handle(request: Request, response: Response){
        const listSpecificationUseCase = container.resolve(ListSpecificationUseCase)

        const specifications = await listSpecificationUseCase.execute()

        return response.json(specifications)
    }
}

export { ListSpecificationController }