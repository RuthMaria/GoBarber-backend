import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors' // necessário para os erros da aplicação cair no middleware de erros
import routes from './routes'
import '@shared/infra/typeorm'
import cors from 'cors'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import '@shared/container'

const app = express()
app.use(cors())

app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(3333, () => {
    console.log('server started on port 3333')
})
