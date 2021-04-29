import { Router } from 'express'
import AuthenticateUsersService from '@modules/users/services/AuthenticateUserService'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {

    const { email, password } = request.body
    const userRepository = new UsersRepository()

    const authenticateUser = new AuthenticateUsersService(userRepository)

    const { user, token } = await authenticateUser.execute({
        email,
        password
    })

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }

    return response.json({ userWithoutPassword, token })

})

export default sessionsRouter
