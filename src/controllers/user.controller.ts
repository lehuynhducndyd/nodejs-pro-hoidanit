import { Request, Response } from 'express';
import { handleCreateUser, handleDeleteUser, getUserById, updateUserById, getAllRoles } from '../services/user.service';
import { getProducts } from 'services/client/item.service';

const getHomePage = async (req: Request, res: Response) => {
    const products = await getProducts();
    const user = req.user;
    console.log("current user: ", user);
    return res.render("client/home/show.ejs", {
        products: products
    });
}
const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    console.log(roles);
    return res.render("admin/user/create.ejs", {
        roles: roles
    });
}
const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, username, phone, role, address, } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? '';
    await handleCreateUser(fullName, username, address, phone, avatar, role);
    return res.redirect('/admin/user');
}
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect('/admin/user');
}
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    const roles = await getAllRoles();
    return res.render("admin/user/detail.ejs", {
        user: user,
        roles: roles
    });
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, phone, role, address, } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? undefined;
    await updateUserById(id, fullName, phone, role, address, avatar);
    return res.redirect('/admin/user');

}


export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };