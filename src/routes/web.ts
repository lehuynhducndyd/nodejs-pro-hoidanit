import express, { Express } from 'express';
const router = express.Router();

import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from '../controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashBoardPage } from 'controllers/admin/dashboard.controller';
import fileUploadMiddleware from 'src/middleware/multer';
import { getCartPage, getProductPage, postAddProductToCart } from 'controllers/client/product.controller';
import { getAdminCreateProductPage, getViewProduct, postAdminCreateProductPage, postDeleteProduct, postUpdateProduct } from 'controllers/admin/product.controller';
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogout, postRegisterPage } from 'controllers/client/auth.controller';
import passport from 'passport';
import { isAdmin, isLogin } from 'src/middleware/auth';

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);
    router.get('/product/:id', getProductPage);

    router.get("/success-redirect", getSuccessRedirectPage);
    router.get('/login', getLoginPage);
    router.get('/register', getRegisterPage);
    router.post('/register', postRegisterPage);
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/success-redirect',
        failureRedirect: '/login',
        failureMessage: true
    }));
    router.post('/logout', postLogout);

    router.post("/add-product-to-cart/:id", postAddProductToCart)
    router.get('/cart', getCartPage);


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
    app.use('/', isAdmin, router);
}

export default webRoutes;

