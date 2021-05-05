import { AppError } from '@errors/AppError';
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IRequest{
    email: string
    password: string
}

interface IResponse{
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticationUserUseCase{

    constructor(
        @inject('UserRepository')
        private userRepository: IUsersRepository
    ){}

    async execute({ email, password }: IRequest): Promise<IResponse>{
        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new AppError('Email or password incorrect!')
        }

        const passwordMatch = await compare(password, user.password)

        if(!password){
            throw new AppError('Email or password incorrect!')
        }

        const token = sign({}, '1f750384d1cd33f460db971579aeddea', {
            subject: user.id,
            expiresIn: '1d'
        })
        

        return {
            user: {
                name: user.name,
                email: user.email
            },
            token
        }


    }

}

export { AuthenticationUserUseCase }