-- CreateEnum
CREATE TYPE "LinkScrapeStatus" AS ENUM ('pending', 'scrapped', 'error');

-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('internal', 'scoial', 'news', 'forum', 'unknown');

-- AlterTable
ALTER TABLE "company" ADD COLUMN     "processAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "company_link" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "error" TEXT,
    "link_type" "LinkType" NOT NULL,
    "status" "LinkScrapeStatus" NOT NULL DEFAULT 'pending',
    "is_required_verification" BOOLEAN NOT NULL DEFAULT false,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "company_id" TEXT NOT NULL,
    "scrapped_start" TIMESTAMP(3),
    "scrapped_end" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_link_content" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "processedContent" TEXT,
    "company_link_id" TEXT NOT NULL,
    "checksum" TEXT,
    "is_digest" BOOLEAN NOT NULL DEFAULT false,
    "processed" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_link_content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_link" ADD CONSTRAINT "company_link_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_link_content" ADD CONSTRAINT "company_link_content_company_link_id_fkey" FOREIGN KEY ("company_link_id") REFERENCES "company_link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
