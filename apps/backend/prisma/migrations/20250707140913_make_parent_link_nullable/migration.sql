-- DropForeignKey
ALTER TABLE "company_link" DROP CONSTRAINT "company_link_parent_link_id_fkey";

-- AlterTable
ALTER TABLE "company_link" ALTER COLUMN "parent_link_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "company_link" ADD CONSTRAINT "company_link_parent_link_id_fkey" FOREIGN KEY ("parent_link_id") REFERENCES "company_link"("id") ON DELETE SET NULL ON UPDATE CASCADE;
