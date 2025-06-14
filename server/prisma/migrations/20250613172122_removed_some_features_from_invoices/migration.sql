/*
  Warnings:

  - You are about to drop the column `status` on the `invoices` table. All the data in the column will be lost.
  - The `currency` column on the `invoices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `paid` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "status",
ADD COLUMN     "paid" BOOLEAN NOT NULL,
DROP COLUMN "currency",
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT '$';

-- DropEnum
DROP TYPE "Currency";

-- DropEnum
DROP TYPE "InvoiceStatus";
