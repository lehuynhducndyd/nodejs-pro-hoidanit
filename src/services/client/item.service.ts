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

const addProductToCart = async (quantity: number, productId: number, user: any) => {
    // Tìm giỏ hàng của người dùng, nếu chưa có thì tạo mới
    let cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    });

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    if (!product) {
        throw new Error("Product not found");
    }

    if (cart) {
        // Nếu có giỏ hàng, tìm xem sản phẩm đã có trong giỏ chưa
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                cartId: cart.id,
                productId: productId
            }
        });

        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0 // Dùng id của cartDetail nếu đã tồn tại
            },
            update: { // Nếu đã có, tăng số lượng
                quantity: {
                    increment: quantity
                }
            },
            create: { // Nếu chưa có, tạo mới
                cartId: cart.id,
                productId: productId,
                price: product.price,
                quantity: quantity
            }
        });

        // Cập nhật tổng số lượng trong giỏ hàng
        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                sum: {
                    increment: quantity
                }
            }
        });
    } else {
        // Nếu chưa có giỏ hàng, tạo giỏ hàng mới và chi tiết giỏ hàng
        await prisma.cart.create({
            data: {
                userId: user.id,
                sum: quantity,
                cartDetails: {
                    create: {
                        price: product.price,
                        quantity: quantity,
                        productId: productId
                    }
                }
            }
        });
    }
}
export { getProducts, getProductById, addProductToCart };