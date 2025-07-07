/*
  Warnings:

  - Added the required column `parent_link_id` to the `company_link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company_link" ADD COLUMN     "depth" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "parent_link_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "company_link" ADD CONSTRAINT "company_link_parent_link_id_fkey" FOREIGN KEY ("parent_link_id") REFERENCES "company_link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
