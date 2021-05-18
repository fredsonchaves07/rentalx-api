import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsuseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listCarsuseCase = new ListCarsUseCase(carsRepositoryInMemory)
    })

    it('Should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'Car1',
            daily_rate: 110,
            description: 'Carro com descricao',
            fine_amount: 40,
            license_plate: 'DEF-1515',
            name: "Audi",
            category_id: 'b4d5fd6c-afc4-4b9e-954b-de196239c478'
        })

        const cars = await listCarsuseCase.execute()

        expect(cars).toEqual(car)
    })

    it('Should be able to list all available cars by name', async() => {
        
    })
})