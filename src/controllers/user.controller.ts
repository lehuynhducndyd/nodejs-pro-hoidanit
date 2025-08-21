import { Request, Response } from 'express';
import { getAllUsers, handleCreateUser } from '../services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    console.log(">>>check", users);
    return res.render("home.ejs", {
        users: users
    });
}
const getCreateUserPage = (req: Request, res: Response) => {
    return res.render("create-user.ejs");
}
const postCreateUserPage = (req: Request, res: Response) => {
    const { name, email, address } = req.body;
    handleCreateUser(name, email, address);
    return res.redirect('/');
}


export { getHomePage, getCreateUserPage, postCreateUserPage };