import { container } from 'tsyringe'
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarRepository } from '@modules/cars/infra/typeorm/repositories/CarRepository';

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
    'SpecificationRepository',
    SpecificationRepository
)

container.registerSingleton<IUsersRepository>(
    'UserRepository',
    UserRepository
)

container.registerSingleton<ICarsRepository>(
    'CarsRepository',
    CarRepository
)