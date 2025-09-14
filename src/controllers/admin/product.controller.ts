import { create } from 'domain';
import { Request, Response } from 'express';
import { createProduct } from 'services/admin/product.service';
import { ProductSchema, TProductSchema } from 'src/validation/product.schema';

const getAdminCreateProductPage = async (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        name: '',
        price: '',
        detailDesc: '',
        shortDesc: '',
        quantity: '',
        factory: '',
        target: '',
    };
    return res.render("admin/product/create.ejs", {
        errors: errors,
        oldData: oldData
    });
}
const postAdminCreateProductPage = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;

    const validation = ProductSchema.safeParse(req.body);
    if (!validation.success) {
        const errorsZod = validation.error.issues;
        const errors = errorsZod.map(item => `${item.message} (${item.path[0]})`);
        const oldData = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        };
        return res.render("admin/product/create.ejs", {
            errors: errors,
            oldData: oldData
        });
    }
    const image = req.file?.filename ?? null;
    await createProduct(name, +price, image, detailDesc, shortDesc, +quantity, factory, target);

    return res.redirect("/admin/product");
}





export { getAdminCreateProductPage, postAdminCreateProductPage };