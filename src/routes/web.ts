import express, { Express } from 'express';
const router = express.Router();
import { getHomePage, getCreateUserPage, postCreateUserPage } from '../controllers/user.controller';

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);

    router.get('/create-user', getCreateUserPage);
    router.post('/handle-create-user', postCreateUserPage);
    app.use('/', router);
}

export default webRoutes;

