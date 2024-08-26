/*
  Warnings:

  - The values [PROCESSING,SHIPPED] on the enum `PurchaseInvoiceStatus_statusCode` will be removed. If these variants are still used in the database, this will fail.
  - The values [PROCESSING,SHIPPED] on the enum `PurchaseInvoiceStatus_statusCode` will be removed. If these variants are still used in the database, this will fail.
  - The values [PROCESSING,SHIPPED] on the enum `PurchaseInvoiceStatus_statusCode` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[salesOrderId]` on the table `DeliveryNote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoiceId]` on the table `DeliveryNote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[billingAddressId]` on the table `DeliveryNote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shippingAddressId]` on the table `DeliveryNote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[billingAddressId]` on the table `PurchaseInvoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shippingAddressId]` on the table `PurchaseInvoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[billingAddressId]` on the table `PurchaseOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shippingAddressId]` on the table `PurchaseOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[purchaseOrderId]` on the table `ReceiptNote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoiceId]` on the table `ReceiptNote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[billingAddressId]` on the table `ReceiptNote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shippingAddressId]` on the table `ReceiptNote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[billingAddressId]` on the table `SalesInvoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shippingAddressId]` on the table `SalesInvoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[billingAddressId]` on the table `SalesOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shippingAddressId]` on the table `SalesOrder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `salesOrderId` to the `Receipt` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `DeliveryNote_billingAddressId_fkey` ON `deliverynote`;

-- DropIndex
DROP INDEX `DeliveryNote_invoiceId_fkey` ON `deliverynote`;

-- DropIndex
DROP INDEX `DeliveryNote_salesOrderId_fkey` ON `deliverynote`;

-- DropIndex
DROP INDEX `DeliveryNote_shippingAddressId_fkey` ON `deliverynote`;

-- DropIndex
DROP INDEX `DeliveryNoteItem_challanId_fkey` ON `deliverynoteitem`;

-- DropIndex
DROP INDEX `DeliveryNoteItem_productId_fkey` ON `deliverynoteitem`;

-- DropIndex
DROP INDEX `DeliveryStatus_challanId_fkey` ON `deliverystatus`;

-- DropIndex
DROP INDEX `Payable_invoiceId_fkey` ON `payable`;

-- DropIndex
DROP INDEX `Payable_vendorId_fkey` ON `payable`;

-- DropIndex
DROP INDEX `Payment_invoiceId_fkey` ON `payment`;

-- DropIndex
DROP INDEX `Payment_paymentModeId_fkey` ON `payment`;

-- DropIndex
DROP INDEX `Payment_vendorId_fkey` ON `payment`;

-- DropIndex
DROP INDEX `Product_deliveryMMId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_discountId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_phaseId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_powerHPId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_powerKWId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_productTaxId_fkey` ON `product`;

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
DROP INDEX `PurchaseInvoice_billingAddressId_fkey` ON `purchaseinvoice`;

-- DropIndex
DROP INDEX `PurchaseInvoice_shippingAddressId_fkey` ON `purchaseinvoice`;

-- DropIndex
DROP INDEX `PurchaseInvoice_vendorId_fkey` ON `purchaseinvoice`;

-- DropIndex
DROP INDEX `PurchaseInvoiceItem_invoiceId_fkey` ON `purchaseinvoiceitem`;

-- DropIndex
DROP INDEX `PurchaseInvoiceItem_productId_fkey` ON `purchaseinvoiceitem`;

-- DropIndex
DROP INDEX `PurchaseInvoiceStatus_invoiceId_fkey` ON `purchaseinvoicestatus`;

-- DropIndex
DROP INDEX `PurchaseOrder_billingAddressId_fkey` ON `purchaseorder`;

-- DropIndex
DROP INDEX `PurchaseOrder_shippingAddressId_fkey` ON `purchaseorder`;

-- DropIndex
DROP INDEX `PurchaseOrder_vendorId_fkey` ON `purchaseorder`;

-- DropIndex
DROP INDEX `PurchaseOrderItem_orderId_fkey` ON `purchaseorderitem`;

-- DropIndex
DROP INDEX `PurchaseOrderItem_productId_fkey` ON `purchaseorderitem`;

-- DropIndex
DROP INDEX `PurchaseOrderStatus_orderId_fkey` ON `purchaseorderstatus`;

-- DropIndex
DROP INDEX `Receipt_customerId_fkey` ON `receipt`;

-- DropIndex
DROP INDEX `Receipt_invoiceId_fkey` ON `receipt`;

-- DropIndex
DROP INDEX `Receipt_paymentModeId_fkey` ON `receipt`;

-- DropIndex
DROP INDEX `ReceiptNote_billingAddressId_fkey` ON `receiptnote`;

-- DropIndex
DROP INDEX `ReceiptNote_invoiceId_fkey` ON `receiptnote`;

-- DropIndex
DROP INDEX `ReceiptNote_purchaseOrderId_fkey` ON `receiptnote`;

-- DropIndex
DROP INDEX `ReceiptNote_shippingAddressId_fkey` ON `receiptnote`;

-- DropIndex
DROP INDEX `ReceiptNoteItem_productId_fkey` ON `receiptnoteitem`;

-- DropIndex
DROP INDEX `ReceiptNoteItem_receiptId_fkey` ON `receiptnoteitem`;

-- DropIndex
DROP INDEX `ReceiptNoteStatus_receiptId_fkey` ON `receiptnotestatus`;

-- DropIndex
DROP INDEX `Receivable_customerId_fkey` ON `receivable`;

-- DropIndex
DROP INDEX `Receivable_invoiceId_fkey` ON `receivable`;

-- DropIndex
DROP INDEX `SalesInvoice_billingAddressId_fkey` ON `salesinvoice`;

-- DropIndex
DROP INDEX `SalesInvoice_customerId_fkey` ON `salesinvoice`;

-- DropIndex
DROP INDEX `SalesInvoice_paymentModeId_fkey` ON `salesinvoice`;

-- DropIndex
DROP INDEX `SalesInvoice_shippingAddressId_fkey` ON `salesinvoice`;

-- DropIndex
DROP INDEX `SalesInvoiceItem_invoiceId_fkey` ON `salesinvoiceitem`;

-- DropIndex
DROP INDEX `SalesInvoiceItem_productId_fkey` ON `salesinvoiceitem`;

-- DropIndex
DROP INDEX `SalesOrder_billingAddressId_fkey` ON `salesorder`;

-- DropIndex
DROP INDEX `SalesOrder_customerId_fkey` ON `salesorder`;

-- DropIndex
DROP INDEX `SalesOrder_paymentModeId_fkey` ON `salesorder`;

-- DropIndex
DROP INDEX `SalesOrder_shippingAddressId_fkey` ON `salesorder`;

-- DropIndex
DROP INDEX `SalesOrderItem_orderId_fkey` ON `salesorderitem`;

-- DropIndex
DROP INDEX `SalesOrderItem_productId_fkey` ON `salesorderitem`;

-- DropIndex
DROP INDEX `SalesOrderStatus_orderId_fkey` ON `salesorderstatus`;

-- DropIndex
DROP INDEX `UserRole_roleId_fkey` ON `userrole`;

-- DropIndex
DROP INDEX `UserRole_userId_fkey` ON `userrole`;

-- DropIndex
DROP INDEX `VendorBankDetail_vendorId_fkey` ON `vendorbankdetail`;

-- AlterTable
ALTER TABLE `purchaseinvoicestatus` MODIFY `statusCode` ENUM('PENDING', 'CONFIRMED', 'DISPATCHED', 'DELIVERED', 'RETURNED', 'PARTIALLY_RETURNED', 'CANCELLED') NOT NULL;

-- AlterTable
ALTER TABLE `purchaseorderstatus` MODIFY `statusCode` ENUM('PENDING', 'CONFIRMED', 'DISPATCHED', 'DELIVERED', 'RETURNED', 'PARTIALLY_RETURNED', 'CANCELLED') NOT NULL;

-- AlterTable
ALTER TABLE `receipt` ADD COLUMN `salesOrderId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `salesinvoice` MODIFY `salesOrderId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `salesorderstatus` MODIFY `statusCode` ENUM('PENDING', 'CONFIRMED', 'DISPATCHED', 'DELIVERED', 'RETURNED', 'PARTIALLY_RETURNED', 'CANCELLED') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `DeliveryNote_salesOrderId_key` ON `DeliveryNote`(`salesOrderId`);

-- CreateIndex
CREATE UNIQUE INDEX `DeliveryNote_invoiceId_key` ON `DeliveryNote`(`invoiceId`);

-- CreateIndex
CREATE UNIQUE INDEX `DeliveryNote_billingAddressId_key` ON `DeliveryNote`(`billingAddressId`);

-- CreateIndex
CREATE UNIQUE INDEX `DeliveryNote_shippingAddressId_key` ON `DeliveryNote`(`shippingAddressId`);

-- CreateIndex
CREATE UNIQUE INDEX `PurchaseInvoice_billingAddressId_key` ON `PurchaseInvoice`(`billingAddressId`);

-- CreateIndex
CREATE UNIQUE INDEX `PurchaseInvoice_shippingAddressId_key` ON `PurchaseInvoice`(`shippingAddressId`);

-- CreateIndex
CREATE UNIQUE INDEX `PurchaseOrder_billingAddressId_key` ON `PurchaseOrder`(`billingAddressId`);

-- CreateIndex
CREATE UNIQUE INDEX `PurchaseOrder_shippingAddressId_key` ON `PurchaseOrder`(`shippingAddressId`);

-- CreateIndex
CREATE UNIQUE INDEX `ReceiptNote_purchaseOrderId_key` ON `ReceiptNote`(`purchaseOrderId`);

-- CreateIndex
CREATE UNIQUE INDEX `ReceiptNote_invoiceId_key` ON `ReceiptNote`(`invoiceId`);

-- CreateIndex
CREATE UNIQUE INDEX `ReceiptNote_billingAddressId_key` ON `ReceiptNote`(`billingAddressId`);

-- CreateIndex
CREATE UNIQUE INDEX `ReceiptNote_shippingAddressId_key` ON `ReceiptNote`(`shippingAddressId`);

-- CreateIndex
CREATE UNIQUE INDEX `SalesInvoice_billingAddressId_key` ON `SalesInvoice`(`billingAddressId`);

-- CreateIndex
CREATE UNIQUE INDEX `SalesInvoice_shippingAddressId_key` ON `SalesInvoice`(`shippingAddressId`);

-- CreateIndex
CREATE UNIQUE INDEX `SalesOrder_billingAddressId_key` ON `SalesOrder`(`billingAddressId`);

-- CreateIndex
CREATE UNIQUE INDEX `SalesOrder_shippingAddressId_key` ON `SalesOrder`(`shippingAddressId`);

-- AddForeignKey
ALTER TABLE `UserDetail` ADD CONSTRAINT `UserDetail_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendorBankDetail` ADD CONSTRAINT `VendorBankDetail_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrder` ADD CONSTRAINT `SalesOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrder` ADD CONSTRAINT `SalesOrder_billingAddressId_fkey` FOREIGN KEY (`billingAddressId`) REFERENCES `BillingAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrder` ADD CONSTRAINT `SalesOrder_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `ShippingAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrder` ADD CONSTRAINT `SalesOrder_paymentModeId_fkey` FOREIGN KEY (`paymentModeId`) REFERENCES `PaymentMode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesInvoice` ADD CONSTRAINT `SalesInvoice_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesInvoice` ADD CONSTRAINT `SalesInvoice_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesInvoice` ADD CONSTRAINT `SalesInvoice_billingAddressId_fkey` FOREIGN KEY (`billingAddressId`) REFERENCES `BillingAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesInvoice` ADD CONSTRAINT `SalesInvoice_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `ShippingAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesInvoice` ADD CONSTRAINT `SalesInvoice_paymentModeId_fkey` FOREIGN KEY (`paymentModeId`) REFERENCES `PaymentMode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderItem` ADD CONSTRAINT `SalesOrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `SalesOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderItem` ADD CONSTRAINT `SalesOrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesInvoiceItem` ADD CONSTRAINT `SalesInvoiceItem_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `SalesInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesInvoiceItem` ADD CONSTRAINT `SalesInvoiceItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderStatus` ADD CONSTRAINT `SalesOrderStatus_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `SalesOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeliveryNote` ADD CONSTRAINT `DeliveryNote_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeliveryNote` ADD CONSTRAINT `DeliveryNote_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `SalesInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeliveryNote` ADD CONSTRAINT `DeliveryNote_billingAddressId_fkey` FOREIGN KEY (`billingAddressId`) REFERENCES `BillingAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeliveryNote` ADD CONSTRAINT `DeliveryNote_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `ShippingAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeliveryNoteItem` ADD CONSTRAINT `DeliveryNoteItem_challanId_fkey` FOREIGN KEY (`challanId`) REFERENCES `DeliveryNote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeliveryNoteItem` ADD CONSTRAINT `DeliveryNoteItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeliveryStatus` ADD CONSTRAINT `DeliveryStatus_challanId_fkey` FOREIGN KEY (`challanId`) REFERENCES `DeliveryNote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrder` ADD CONSTRAINT `PurchaseOrder_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrder` ADD CONSTRAINT `PurchaseOrder_billingAddressId_fkey` FOREIGN KEY (`billingAddressId`) REFERENCES `BillingAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrder` ADD CONSTRAINT `PurchaseOrder_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `ShippingAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrderItem` ADD CONSTRAINT `PurchaseOrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `PurchaseOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrderItem` ADD CONSTRAINT `PurchaseOrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseInvoice` ADD CONSTRAINT `PurchaseInvoice_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `PurchaseOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseInvoice` ADD CONSTRAINT `PurchaseInvoice_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseInvoice` ADD CONSTRAINT `PurchaseInvoice_billingAddressId_fkey` FOREIGN KEY (`billingAddressId`) REFERENCES `BillingAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseInvoice` ADD CONSTRAINT `PurchaseInvoice_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `ShippingAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseInvoiceItem` ADD CONSTRAINT `PurchaseInvoiceItem_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `PurchaseInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseInvoiceItem` ADD CONSTRAINT `PurchaseInvoiceItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrderStatus` ADD CONSTRAINT `PurchaseOrderStatus_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `PurchaseOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseInvoiceStatus` ADD CONSTRAINT `PurchaseInvoiceStatus_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `PurchaseInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReceiptNote` ADD CONSTRAINT `ReceiptNote_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `PurchaseOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReceiptNote` ADD CONSTRAINT `ReceiptNote_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `PurchaseInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReceiptNote` ADD CONSTRAINT `ReceiptNote_billingAddressId_fkey` FOREIGN KEY (`billingAddressId`) REFERENCES `BillingAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReceiptNote` ADD CONSTRAINT `ReceiptNote_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `ShippingAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReceiptNoteItem` ADD CONSTRAINT `ReceiptNoteItem_receiptId_fkey` FOREIGN KEY (`receiptId`) REFERENCES `ReceiptNote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReceiptNoteItem` ADD CONSTRAINT `ReceiptNoteItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReceiptNoteStatus` ADD CONSTRAINT `ReceiptNoteStatus_receiptId_fkey` FOREIGN KEY (`receiptId`) REFERENCES `ReceiptNote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receipt` ADD CONSTRAINT `Receipt_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receipt` ADD CONSTRAINT `Receipt_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `SalesInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receipt` ADD CONSTRAINT `Receipt_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receipt` ADD CONSTRAINT `Receipt_paymentModeId_fkey` FOREIGN KEY (`paymentModeId`) REFERENCES `PaymentMode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `PurchaseInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_paymentModeId_fkey` FOREIGN KEY (`paymentModeId`) REFERENCES `PaymentMode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receivable` ADD CONSTRAINT `Receivable_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receivable` ADD CONSTRAINT `Receivable_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `SalesInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payable` ADD CONSTRAINT `Payable_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payable` ADD CONSTRAINT `Payable_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `PurchaseInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `Product` ADD CONSTRAINT `Product_productTaxId_fkey` FOREIGN KEY (`productTaxId`) REFERENCES `ProductTax`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `Discount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOverview` ADD CONSTRAINT `ProductOverview_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOverviewTitle` ADD CONSTRAINT `ProductOverviewTitle_pOverViewId_fkey` FOREIGN KEY (`pOverViewId`) REFERENCES `ProductOverview`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOverviewTitle` ADD CONSTRAINT `ProductOverviewTitle_OverViewTitleId_fkey` FOREIGN KEY (`OverViewTitleId`) REFERENCES `OverViewTitle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
