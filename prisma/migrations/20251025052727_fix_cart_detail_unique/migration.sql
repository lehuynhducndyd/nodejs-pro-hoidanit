/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productId]` on the table `cart_detail` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `cart_detail` DROP FOREIGN KEY `cart_detail_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `cart_detail` DROP FOREIGN KEY `cart_detail_productId_fkey`;

-- DropIndex
DROP INDEX `cart_detail_cartId_key` ON `cart_detail`;

-- DropIndex
DROP INDEX `cart_detail_productId_key` ON `cart_detail`;

-- CreateIndex
CREATE UNIQUE INDEX `cart_detail_cartId_productId_key` ON `cart_detail`(`cartId`, `productId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
