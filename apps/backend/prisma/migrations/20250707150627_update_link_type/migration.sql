-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LinkType" ADD VALUE 'image';
ALTER TYPE "LinkType" ADD VALUE 'document';
ALTER TYPE "LinkType" ADD VALUE 'video';
ALTER TYPE "LinkType" ADD VALUE 'audio';
