import { Request, Response } from 'express';
import { getAllUsers, handleCreateUser, handleDeleteUser, getUserById, updateUserById, getAllRoles } from '../services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    return res.render("home.ejs", {
        users: users
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
    const { fullName, username, phone, role, address } = req.body;
    //await handleCreateUser(name, email, address);
    return res.redirect('/');
}
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect('/');
}
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.render("view-user.ejs", {
        user: user
    });
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, name, email, address } = req.body;
    await updateUserById(id, name, email, address);
    return res.redirect('/');

}


export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };