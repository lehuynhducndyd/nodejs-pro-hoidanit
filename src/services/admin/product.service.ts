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

const deleteProductById = async (id: string) => {
    const deletedProduct = await prisma.product.delete({
        where: {
            id: parseInt(id)
        }
    });
    return deletedProduct;
}

const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    return product;
}

const updateProductById = async (
    id: string,
    name: string,
    price: number,
    imageUpload: string,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string
) => {
    const updatedProduct = await prisma.product.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            price,
            ...(imageUpload && { image: imageUpload }),
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target
        }
    });
    return updatedProduct;
}

export { createProduct, getAllProducts, deleteProductById, getProductById, updateProductById };