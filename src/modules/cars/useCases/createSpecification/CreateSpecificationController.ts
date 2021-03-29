import { Request, Response } from 'express'
import { CreationSpecificationUseCase } from './CreateSpecificationUseCase'

class CreateSpecificationController{
    constructor(private createSpecificationUseCase: CreationSpecificationUseCase){}

    handle(request: Request, response: Response){
        const { name, description } = request.body

        this.createSpecificationUseCase.execute({name, description})

        return response.status(201).json()
    }
}

export { CreateSpecificationController }