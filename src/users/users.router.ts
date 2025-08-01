import {
    createUser,
    connectionUser,
    getUsers,
    deleteUser,
    patchUser,
} from './users.controller';
import { Router } from 'express';

export const usersRouter = Router();

usersRouter.get('/users', getUsers);
usersRouter.post('/user', createUser);
usersRouter.post('/user/login', connectionUser);
usersRouter.patch('/user/:userId', patchUser);
usersRouter.delete('/user/:userId', deleteUser);
