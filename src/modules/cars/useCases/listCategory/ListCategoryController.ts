import { container } from 'tsyringe';
import { Request, Response } from 'express'
import { ListCategoryUseCase } from './ListCategoryUseCase'

class ListCategoryController {
    

    async handle(request: Request, response: Response){
        const listCategoriesUseCase = container.resolve(ListCategoryUseCase)
        
        const categories = await listCategoriesUseCase.execute()

        return response.json(categories)
    }
}

export { ListCategoryController }