import 'reflect-metadata';
import CreateAppointmentService from "./CreateAppointmentService";
import FakesAppointmentsRepository from '../repositories/fakes/FakesAppointmentsRepository'
import AppError from '@shared/errors/AppError';

describe("CreateAppointment", () => {
    it("should be able to create a new Appointment", async () => {
        const fakesAppointmentsRepository = new FakesAppointmentsRepository()
        const createAppointment = new CreateAppointmentService(fakesAppointmentsRepository)

        const appointment = await createAppointment.execute({ date: new Date(), provider_id: '123123' })

        expect(appointment).toHaveProperty('id')
        expect(appointment.provider_id).toBe('123123')
    })

    it("should not be able to create two new Appointment on the same time", async () => {
        const fakesAppointmentsRepository = new FakesAppointmentsRepository()
        const createAppointment = new CreateAppointmentService(fakesAppointmentsRepository)

        const appointmentDate = new Date(2021, 7, 29, 11)
        const appointment = await createAppointment.execute({ date: appointmentDate, provider_id: '123123' })

        expect(
            createAppointment.execute({ date: appointmentDate, provider_id: '123123' })
        ).rejects.toBeInstanceOf(AppError)
    })
})
