import {Request, Response} from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import {parseISO} from 'date-fns' //ParseISO transforma uma string em formato Date().

export default class AppointmentsController{
    public async create(request: Request, response: Response): Promise<Response>{
        const { provider_id, date } = request.body

        const parsedDate = parseISO(date)

        const createAppointment = container.resolve(CreateAppointmentService)

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id
        })

        return response.json(appointment)
        }
}
