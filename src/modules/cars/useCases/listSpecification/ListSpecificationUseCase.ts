import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

@injectable()
class ListSpecificationUseCase{

    constructor(
        @inject('SpecificationRepository')
        private specificationsRepository: ISpecificationRepository
    ){}

    async execute(): Promise<Specification[]>{
        const specifications = await this.specificationsRepository.list()

        return specifications
    }

}

export { ListSpecificationUseCase }