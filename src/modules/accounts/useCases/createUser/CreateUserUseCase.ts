import { AppError } from './../../../../errors/AppError';
import { hash } from 'bcrypt'
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase{

    constructor(
        @inject('UserRepository')
        private userRespository: IUsersRepository
    ){}

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void>{
        const userAlreadyExists = await this.userRespository.findByEmail(email)

        if(userAlreadyExists){
            throw new AppError("User already exists")
        }

        const passwordHash = await hash(password, 8)

        await this.userRespository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        })
    }
}

export { CreateUserUseCase }