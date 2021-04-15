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

    execute({ name, description }: IRequest): void{
        const specficationAlreadyExists = this.specificationRepository.findByName(name)

        if(specficationAlreadyExists){
            throw new Error("Specification already exists");
            
        }

        this.specificationRepository.create({ name, description })    
    }
}

export { CreationSpecificationUseCase }