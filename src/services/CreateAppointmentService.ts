import Appointment from '../models/Appointments'
import {startOfHour, parseISO} from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentsRepository'

interface Request {
    provider: string
    date: Date
}

class CreateAppointmentService {

    private appointmentsRepository: AppointmentRepository

    constructor(appointmentRepository: AppointmentRepository){
       this.appointmentsRepository = appointmentRepository
    }

    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date)

        const findAppointmentsInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

        if(findAppointmentsInSameDate){
            throw Error('This appointments is already booked')
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        })

        return appointment
    }
}

export default CreateAppointmentService
