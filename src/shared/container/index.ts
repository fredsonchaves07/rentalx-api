import { UserRepository } from '@modules/accounts/repositories/implementations/UserRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/repositories/implementation/CategoriesRepository'
import { SpecificationRepository } from '@modules/cars/repositories/implementation/SpecificationRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { container } from 'tsyringe'

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