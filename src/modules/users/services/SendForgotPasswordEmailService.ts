import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

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

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ){}

    public async execute({ email }: IRequest): Promise<void>{
        const user =  await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError('User does not exist')
        }

        await this.userTokensRepository.generate(user.id)

        this.mailProvider.sendEmail(email, "Pedido de recuperação de senha")
    }
}

export default SendForgotPasswordEmailService