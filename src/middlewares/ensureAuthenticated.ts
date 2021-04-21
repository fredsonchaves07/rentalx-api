import { AppError } from './../errors/AppError';
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload{
    sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError('Token missing', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const { sub: user_id }= verify(token, '1f750384d1cd33f460db971579aeddea') as IPayload

        const usersRepository = new UserRepository()

        const user = await usersRepository.findById(user_id)

        if(!user){
            throw new AppError('User does not exists!', 401);
        }

        next()

    } catch {
        throw new AppError("Invalid token", 401);
    }
    
}