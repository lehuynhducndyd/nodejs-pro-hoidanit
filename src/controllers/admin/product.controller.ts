import { create } from 'domain';
import { Request, Response } from 'express';
import { get } from 'http';
import { createProduct, deleteProductById, getProductById, updateProductById } from 'services/admin/product.service';
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

const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteProductById(id);
    return res.redirect("/admin/product");
}

const getViewProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await getProductById(id);

    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];

    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];

    return res.render("admin/product/detail.ejs", {
        product: product,
        factoryOptions: factoryOptions,
        targetOptions: targetOptions
    });

}

const postUpdateProduct = async (req: Request, res: Response) => {
    const { id, name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const image = req.file?.filename ?? null;
    // validation
    await updateProductById(id, name, +price, image, detailDesc, shortDesc, +quantity, factory, target);
    return res.redirect("/admin/product");
}



export {
    getAdminCreateProductPage, postAdminCreateProductPage, postDeleteProduct, getViewProduct, postUpdateProduct
};