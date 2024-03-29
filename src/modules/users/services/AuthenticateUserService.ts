import User from '../infra/typeorm/entities/User'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'

interface IRequest{
    email: string
    password: string
}

interface IResponse{
    user: User
    token: string
}

@injectable()
class AuthenticateUserService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('hashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email)

        if( !user )
             throw new AppError('Incorrect email/password combination.', 401)

        const passwordMatched = await this.hashProvider.compareHash(password, user.password)

        if( !passwordMatched )
            throw new AppError('Incorrect email/password combination.', 401)

        const { expiresIn, secret } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn
        })

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserService
