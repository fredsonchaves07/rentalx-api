import { AppError } from '@shared/errors/AppError';
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it('should be able to create a new car', async () => {
        const car =  await createCarUseCase.execute({
            name: 'Name Car asas', 
            description: 'description car', 
            daily_rate: 100, 
            license_plate: 'ABC-1289', 
            fine_amount: 60, 
            brand: 'brand', 
            category_id: 'category' 
        })

        expect(car).toHaveProperty('id')
    })

    it('should not be able to create a car with exists license plate', () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: 'Car1', 
                description: 'description car1', 
                daily_rate: 100, 
                license_plate: 'ABC-1234', 
                fine_amount: 60, 
                brand: 'brand', 
                category_id: 'category' 
            })

            await createCarUseCase.execute({
                name: 'Car2', 
                description: 'description car2', 
                daily_rate: 100, 
                license_plate: 'ABC-1234', 
                fine_amount: 60, 
                brand: 'brand', 
                category_id: 'category' 
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a car with available true by default', async () => {
        const car = await createCarUseCase.execute({
            name: 'Car Available', 
            description: 'description car available', 
            daily_rate: 100, 
            license_plate: 'ABCD-1237', 
            fine_amount: 60, 
            brand: 'brand', 
            category_id: 'category' 
        })

        expect(car.available).toBe(true)
    })
})