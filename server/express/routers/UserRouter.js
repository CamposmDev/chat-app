import { Router } from 'express';
import { UserController} from "../controllers/index.js"
import JWTAuth from '../middleware/JWTAuth.js';

const UserRouter = new Router();

const auth = new JWTAuth();
const controller = new UserController()

UserRouter.post('/register', controller.createUser);
UserRouter.post('/login', controller.loginUser)
UserRouter.post('/logout', auth.verifyJWT, controller.logoutUser)
UserRouter.get('/username/:userId', auth.verifyJWT, controller.getUsername);
UserRouter.get("/", controller.getUsers)

export default UserRouter;