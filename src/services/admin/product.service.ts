import { prisma } from "config/client";

const createProduct = async (
    name: string,
    price: number,
    imageUpload: string,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string
) => {
    await prisma.product.create({
        data: {
            name,
            price,
            ...(imageUpload && { image: imageUpload }),
            detailDesc,
            shortDesc,
            quantity,
            sold: 0,
            factory,
            target
        }
    });
}

const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

export { createProduct, getAllProducts };