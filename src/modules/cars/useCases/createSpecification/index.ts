import { SpecificationRepository } from '../../repositories/implementation/SpecificationRepository'
import { CreateSpecificationController } from './CreateSpecificationController'
import { CreationSpecificationUseCase } from './CreateSpecificationUseCase'

const specificationRepository = new SpecificationRepository()
const createSpecificationUseCase = new CreationSpecificationUseCase(specificationRepository)
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export { createSpecificationController }