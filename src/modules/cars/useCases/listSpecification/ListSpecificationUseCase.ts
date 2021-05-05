import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

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