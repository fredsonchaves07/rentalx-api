import { container } from 'tsyringe';
import { Request, Response } from "express";
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController{

    async handle(request: Request, response: Response): Promise<Response>{
        const { id } =  request.user
        const avatarFile = request.file.filename
        
        const updateuserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

        await updateuserAvatarUseCase.execute({ user_id: id, avatarFile })

        return response.status(204).send()
    }
}

export { UpdateUserAvatarController }