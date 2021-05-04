import { AppError } from './../../../../errors/AppError';
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticationUserUseCase } from "./AuthenticationUserUseCase"


let usersRepositoryInMemory: UsersRepositoryInMemory
let authenticationUserUseCase: AuthenticationUserUseCase
let createUserUseCase: CreateUserUseCase

describe('Authentication User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticationUserUseCase = new AuthenticationUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it('Should be able to atuhenticate an new user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '00123',
            email: 'user@test.com',
            password: '1234',
            name: 'User_test'
        }

        await createUserUseCase.execute(user)

        const result = await authenticationUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty('token')
    })

    it('Should not be able autenticate an nonexistent user', () => {
        expect(async () => {
            await authenticationUserUseCase.execute({
                email: 'false@email.com',
                password: '123'
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('Should not be able autenticate with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '9999',
                email: 'user@email.com',
                password: '1234',
                name: 'User Test'
            }

            await createUserUseCase.execute(user)

            await authenticationUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})