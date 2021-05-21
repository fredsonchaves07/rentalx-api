import { AppError } from '@shared/errors/AppError';
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';


let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory

describe('Create Car Specification', () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarsRepositoryInMemory()
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carRepositoryInMemory, specificationsRepositoryInMemory)
    })

    it('should not be able to add a new specification to a now-existent car', async () => {
        expect(async () => {
            const car_id = '1234'
            const specifications_id = ['54321']
    
            await createCarSpecificationUseCase.execute({ car_id, specifications_id })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to add a new specification to the car', async () => {
        const car =  await carRepositoryInMemory.create({
            brand: 'brand', 
            category_id: 'category',
            daily_rate: 100,
            description: 'description car', 
            fine_amount: 60, 
            license_plate: 'ABC-1289', 
            name: 'Name Car asas', 
        })

        const specifications_id = ['54321']

        await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: specifications_id
        })
    })
})