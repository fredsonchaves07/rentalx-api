import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
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

        const cars = await listAvailableCarUseCase.execute({})

        expect(cars).toEqual([car])
    })

    it('Should be able to list all available cars by brand', async() => {
        const car = await carsRepositoryInMemory.create({
            brand: 'Car brand',
            daily_rate: 110,
            description: 'Car brand',
            fine_amount: 40,
            license_plate: 'DEF-2020',
            name: "Audi",
            category_id: 'b4d5fd6c-afc4-4b9e-954b-de196239c478'
        })

        const cars = await listAvailableCarUseCase.execute({
            brand: 'Car brand'
        })

        expect(cars).toEqual([car])
    })

    it('Should be able to list all available cars by name', async() => {
        const car = await carsRepositoryInMemory.create({
            brand: 'Car brand',
            daily_rate: 110,
            description: 'Car brand',
            fine_amount: 40,
            license_plate: 'DEF-20201',
            name: "Audi A1",
            category_id: 'b4d5fd6c-afc4-4b9e-954b-de196239c478'
        })

        const cars = await listAvailableCarUseCase.execute({
            name: 'Audi A1'
        })

        expect(cars).toEqual([car])
    })

    it('Should be able to list all available cars by category id', async() => {
        const car = await carsRepositoryInMemory.create({
            brand: 'Car brand',
            daily_rate: 110,
            description: 'Car brand',
            fine_amount: 40,
            license_plate: 'DEF-20189',
            name: "Audi A333",
            category_id: 'b4d5fd6c-afc4-4b9e-954b-de196239c478'
        })

        const cars = await listAvailableCarUseCase.execute({
            category_id: 'b4d5fd6c-afc4-4b9e-954b-de196239c478'
        })

        expect(cars).toEqual([car])
    })
})