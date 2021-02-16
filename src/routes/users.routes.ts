import { response, Router } from 'express'
import CreateUserService from '../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import uploadConfig from '../config/upload'
import multer from 'multer';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {

    try{
        const { name, email, password } = request.body

        const createUser = new CreateUserService()

        const user = await createUser.execute({
            name,
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

        return response.json(userWithoutPassword)
    } catch (err){
        return response.status(400).json({ error: err.message})
    }
})

// patch é semelhante ao PUT, mas é usando quando se que alterar poucos campos.
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

try {
   const updateUserAvatar = new UpdateUserAvatarService()

   const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename
    })

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
        avatar: user.avatar
    }

    return response.json(userWithoutPassword)
} catch (err) {
        return response.status(400).json({ error: err.message})
}
})
export default usersRouter
