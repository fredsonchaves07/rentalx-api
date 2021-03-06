import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import dayjs from 'dayjs';

let createRentalUseCase: CreateRentalUseCase
let rentalRepositoryInMemory: RentalsRepositoryInMemory
let dayJsDateProvider: DayJsDateProvider
let carRepositoryInMemory: CarsRepositoryInMemory

describe('Create Rental', () => {
    const dayAdd24Hours = dayjs().add(2, 'day').toDate()

    beforeEach(() => {
        rentalRepositoryInMemory = new RentalsRepositoryInMemory()
        carRepositoryInMemory = new CarsRepositoryInMemory()
        dayJsDateProvider = new DayJsDateProvider()
        createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, dayJsDateProvider, carRepositoryInMemory)
    })

    it('should be able to create a new rental', async() => {
        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: '121212',
            expected_return_date: dayAdd24Hours
        })

        expect((rental)).toHaveProperty('id')
        expect((rental)).toHaveProperty('start_date')
    })

    it('should not be able to create a new rental if there is another open to them same user', async() => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: dayAdd24Hours
            })
    
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: dayAdd24Hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental if there is another open to them same car', async() => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '123',
                car_id: 'test',
                expected_return_date: dayAdd24Hours
            })
    
            await createRentalUseCase.execute({
                user_id: '321',
                car_id: 'test',
                expected_return_date: dayAdd24Hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental with invalid return time', async() => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '123',
                car_id: 'test',
                expected_return_date: dayjs().toDate()
            })
    
        }).rejects.toBeInstanceOf(AppError)
    })
})