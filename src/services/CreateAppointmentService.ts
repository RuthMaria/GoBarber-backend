import Appointment from '../models/Appointments'
import {startOfHour, parseISO} from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentsRepository'
import {getCustomRepository} from 'typeorm'

interface Request {
    provider: string
    date: Date
}

class CreateAppointmentService {

    public async execute({ provider, date }: Request): Promise<Appointment >{

        const appointmentsRepository = getCustomRepository(AppointmentRepository)

        const appointmentDate = startOfHour(date)

        const findAppointmentsInSameDate = await appointmentsRepository.findByDate(appointmentDate)

        if(findAppointmentsInSameDate){
            throw Error('This appointments is already booked')
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate
        })

        await appointmentsRepository.save(appointment)
        return appointment
    }
}

export default CreateAppointmentService
