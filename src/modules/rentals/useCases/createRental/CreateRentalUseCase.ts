import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/infra/typeorm/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { inject, injectable } from 'tsyringe';
import { AppError } from './../../../../shared/errors/AppError';

interface IRequest{
    user_id: string
    car_id: string
    expected_return_date: Date
}

@injectable()
class CreateRentalUseCase{

    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('DateProvider')
        private dateProvider: IDateProvider
    ){}

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental>{
        const compareHours = 24
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

        if(carUnavailable){
            throw new AppError('Car is unabailable');   
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if(rentalOpenToUser){
            throw new AppError('Ther is a rental in progress for user!');   
        }

        const dateNow = this.dateProvider.dateNow()

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        )

        if(compare < compareHours){
            throw new AppError('Invalid return time');
        }

        const rental = await this.rentalsRepository.create({
            user_id, 
            car_id, 
            expected_return_date
        })

        return rental
    }
}

export { CreateRentalUseCase }