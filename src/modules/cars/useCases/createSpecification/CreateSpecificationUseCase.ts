import { AppError } from "@shared/errors/AppError";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

interface IRequest{
    name: string,
    description: string
}

@injectable()
class CreationSpecificationUseCase{
    
    constructor(
        @inject('SpecificationRepository')
        private specificationRepository: ISpecificationRepository
    ){}

    async execute({ name, description }: IRequest): Promise<void>{
        const specficationAlreadyExists = await this.specificationRepository.findByName(name)

        if(specficationAlreadyExists){
            throw new AppError("Specification already exists");
            
        }

        this.specificationRepository.create({ name, description })    
    }
}

export { CreationSpecificationUseCase }