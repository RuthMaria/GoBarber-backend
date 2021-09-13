import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

interface IRequest{
    email: string
}

@injectable()

class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ){}

    public async execute({ email }: IRequest): Promise<void>{
        this.mailProvider.sendEmail(email, "Pedido de recuperação de senha")
    }
}

export default SendForgotPasswordEmailService
