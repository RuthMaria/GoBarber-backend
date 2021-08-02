import 'reflect-metadata';
import AuthenticateUserService from "./AuthenticateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService'

describe("AuthenticateUser", () => {
    it("should be able to authenticate", async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()

        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

        await createUser.execute({
            name: 'Ruth Maria',
            email: 'ruthmariia01@gmail.com',
            password: '123456'
        })

        const response = await authenticateUser.execute({
            email: 'ruthmariia01@gmail.com',
            password: '123456'
        })

        expect(response).toHaveProperty('token')
    })
})