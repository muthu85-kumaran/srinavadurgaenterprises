/*
  Warnings:

  - You are about to drop the column `value` on the `deliverysizeinmm` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `powerinhp` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `powerinkw` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ratedvoltageinvolt` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `suctionsizeinmm` table. All the data in the column will be lost.
  - Added the required column `valueDeliverySize` to the `DeliverySizeINMM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueInHP` to the `PowerInHP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueInKW` to the `PowerInKW` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueInVolt` to the `RatedVoltageINVolt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueSuctionSize` to the `SuctionSizeINMM` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Product_deliveryMMId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_phaseId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_powerHPId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_powerKWId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_puTypeAppId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_puTypeInstId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_ratedVoltId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_seriesId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_suctionMMId_fkey` ON `product`;

-- DropIndex
DROP INDEX `ProductOverviewTitle_OverViewTitleId_fkey` ON `productoverviewtitle`;

-- DropIndex
DROP INDEX `ProductOverviewTitle_pOverViewId_fkey` ON `productoverviewtitle`;

-- DropIndex
DROP INDEX `UserRole_roleId_fkey` ON `userrole`;

-- DropIndex
DROP INDEX `UserRole_userId_fkey` ON `userrole`;

-- AlterTable
ALTER TABLE `deliverysizeinmm` DROP COLUMN `value`,
    ADD COLUMN `valueDeliverySize` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `powerinhp` DROP COLUMN `value`,
    ADD COLUMN `valueInHP` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `powerinkw` DROP COLUMN `value`,
    ADD COLUMN `valueInKW` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ratedvoltageinvolt` DROP COLUMN `value`,
    ADD COLUMN `valueInVolt` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `suctionsizeinmm` DROP COLUMN `value`,
    ADD COLUMN `valueSuctionSize` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `UserDetail` ADD CONSTRAINT `UserDetail_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `ProductSeries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_puTypeAppId_fkey` FOREIGN KEY (`puTypeAppId`) REFERENCES `PumpTypeApp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_puTypeInstId_fkey` FOREIGN KEY (`puTypeInstId`) REFERENCES `PumpTypeInstallation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_phaseId_fkey` FOREIGN KEY (`phaseId`) REFERENCES `Phase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_powerHPId_fkey` FOREIGN KEY (`powerHPId`) REFERENCES `PowerInHP`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_powerKWId_fkey` FOREIGN KEY (`powerKWId`) REFERENCES `PowerInKW`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_suctionMMId_fkey` FOREIGN KEY (`suctionMMId`) REFERENCES `SuctionSizeINMM`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_deliveryMMId_fkey` FOREIGN KEY (`deliveryMMId`) REFERENCES `DeliverySizeINMM`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_ratedVoltId_fkey` FOREIGN KEY (`ratedVoltId`) REFERENCES `RatedVoltageINVolt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOverview` ADD CONSTRAINT `ProductOverview_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOverviewTitle` ADD CONSTRAINT `ProductOverviewTitle_pOverViewId_fkey` FOREIGN KEY (`pOverViewId`) REFERENCES `ProductOverview`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOverviewTitle` ADD CONSTRAINT `ProductOverviewTitle_OverViewTitleId_fkey` FOREIGN KEY (`OverViewTitleId`) REFERENCES `OverViewTitle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
