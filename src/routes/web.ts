import express, { Express } from 'express';
const router = express.Router();

import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from '../controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoardPage } from 'controllers/admin/dashboard.controller';
import fileUploadMiddleware from 'src/middleware/multer';
import { getProductPage } from 'controllers/client/product.controller';
import { getAdminCreateProductPage, getViewProduct, postAdminCreateProductPage, postDeleteProduct, postUpdateProduct } from 'controllers/admin/product.controller';

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);
    router.get('/product/:id', getProductPage);

    //admin route
    router.get('/admin', getDashBoardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user', getCreateUserPage);
    router.post('/admin/handle-create-user', fileUploadMiddleware("avatar"), postCreateUser);
    router.post('/admin/delete-user/:id', postDeleteUser);
    router.get('/admin/view-user/:id', getViewUser);
    router.post('/admin/update-user', fileUploadMiddleware("avatar"), postUpdateUser);

    router.get('/admin/order', getAdminOrderPage);
    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/create-product', getAdminCreateProductPage);
    router.post('/admin/create-product', fileUploadMiddleware("image", "images/product"), postAdminCreateProductPage);
    router.post('/admin/delete-product/:id', postDeleteProduct);
    router.get('/admin/view-product/:id', getViewProduct);
    router.post('/admin/update-product', fileUploadMiddleware("image", "images/product"), postUpdateProduct);
    app.use('/', router);
}

export default webRoutes;

