import { Router } from 'express'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import uploadConfig from '@config/upload'
import multer from 'multer';
import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

const usersRouter = Router()
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()
const upload = multer(uploadConfig)

usersRouter.post('/', usersController.create)

// patch é semelhante ao PUT, mas é usando quando se quer alterar poucos campos.
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)
export default usersRouter
