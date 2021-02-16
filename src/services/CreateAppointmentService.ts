import Appointment from '../models/Appointments'
import {startOfHour} from 'date-fns' //  startOdHour pega uma data e zera os segundos e minutos.
import AppointmentRepository from '../repositories/AppointmentsRepository'
import {getCustomRepository} from 'typeorm'
import AppError from '../errors/AppError'

interface Request {
    provider_id: string
    date: Date
}

class CreateAppointmentService {

    public async execute({ provider_id, date }: Request): Promise<Appointment >{

        const appointmentsRepository = getCustomRepository(AppointmentRepository)

        const appointmentDate = startOfHour(date)

        const findAppointmentsInSameDate = await appointmentsRepository.findByDate(appointmentDate)

        if(findAppointmentsInSameDate){
            throw new AppError('This appointments is already booked')
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        })

        await appointmentsRepository.save(appointment)
        return appointment
    }
}

export default CreateAppointmentService
