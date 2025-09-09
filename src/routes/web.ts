import express, { Express } from 'express';
const router = express.Router();

import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from '../controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoardPage } from 'controllers/admin/dashboard.controller';
import fileUploadMiddleware from 'src/middleware/multer';

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);

    router.post('/handle-update-user', postUpdateUser);
    //admin route
    router.get('/admin', getDashBoardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user', getCreateUserPage);
    router.get('/admin/order', getAdminOrderPage);
    router.get('/admin/product', getAdminProductPage);
    router.post('/admin/handle-create-user', fileUploadMiddleware("avatar"), postCreateUser);
    router.post('/admin/delete-user/:id', postDeleteUser);
    router.get('/admin/view-user/:id', getViewUser);
    router.post('/admin/update-user', fileUploadMiddleware("avatar"), postUpdateUser);
    app.use('/', router);
}

export default webRoutes;

