import { prisma } from "config/client";

const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    return product;
}
export { getProducts, getProductById };