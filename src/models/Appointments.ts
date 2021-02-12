import { v4 as uuid } from 'uuid';

class Appointment {
    id: string
    provider: string
    date: Date

    constructor({ provider, date }: Omit<Appointment, 'id'>){ // Omit tá tipando o construtor e ignorando o campo id
        this.id = uuid()
        this.provider = provider
        this.date = date
    }
}

export default Appointment
