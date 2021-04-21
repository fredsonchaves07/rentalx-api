import { AppError } from './../../../../errors/AppError';
import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

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