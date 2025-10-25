import { Request, Response } from 'express';
import { addProductToCart, getProductById } from 'services/client/item.service';

const getProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(id);
    return res.render("client/product/detail.ejs", {
        product: product
    });
}
const postAddProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    const user = req.user;
    if (user) {
        await addProductToCart(1, +id, user)
    } else {
        return res.redirect("/login");
    }
    return res.redirect("/");


}

const getCartPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/login");
    }
    return res.render("client/product/cart.ejs");
}



export { getProductPage, postAddProductToCart, getCartPage };