import 'reflect-metadata';
import ResetPasswordService from "./ResetPasswordService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService ;

describe("resetPassword", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeUserTokensRepository = new FakeUserTokensRepository()

        resetPassword = new ResetPasswordService (
            fakeUsersRepository,
            fakeUserTokensRepository,
        )
    })
    it("should be able to reset the password", async () => {
        const user = await fakeUsersRepository.create({
            name: "Ruth",
            email: "ruthmariia01@gmail.com",
            password: "123456"
        })

        const { token } = await fakeUserTokensRepository.generate(user.id)

        await resetPassword.execute({
            password: "123456",
            token,
        })

        const updatedUser = await fakeUsersRepository.findById(user.id)

        expect(updatedUser?.password).toBe("123456")
    })
})
