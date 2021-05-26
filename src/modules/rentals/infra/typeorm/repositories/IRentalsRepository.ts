import { Rental } from "../entities/Rental";


interface IRentalsRepository{
    findOpenRentalByCar(car_id: string): Promise<Rental>
    findOpenRentalByUser(user_id: string): Promise<Rental>
}

export { IRentalsRepository }