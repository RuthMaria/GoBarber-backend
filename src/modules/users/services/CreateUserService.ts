import User from '../infra/typeorm/entities/User'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'

interface IRequest{
    name: string
    email: string
    password: string
}

@injectable()class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('hashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execute({ name, email, password }: IRequest): Promise<User>{

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if(checkUserExists)
            throw new AppError('Email address already uses.')

        const hashedPassword = await this.hashProvider.generateHash(password)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        })

        return user
    }
}

export default CreateUserService
