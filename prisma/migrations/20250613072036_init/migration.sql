-- CreateTable
CREATE TABLE "manga" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT,
    "cover_image_url" TEXT,
    "categoryid" INTEGER,
    "createddate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "createdby" TEXT,
    "updated_date" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" TEXT,

    CONSTRAINT "manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapter" (
    "id" SERIAL NOT NULL,
    "mangaid" INTEGER,
    "url" TEXT,
    "createddate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "createdby" TEXT,
    "updateddate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedby" TEXT,

    CONSTRAINT "chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "url" TEXT,
    "chapterid" INTEGER,
    "createddate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "createdby" TEXT,
    "updateddate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedby" TEXT,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createddate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "createdby" TEXT,
    "updated_date" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedby" TEXT,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "manga" ADD CONSTRAINT "fk_manga_category" FOREIGN KEY ("categoryid") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter" ADD CONSTRAINT "mangaid" FOREIGN KEY ("mangaid") REFERENCES "manga"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "chapterid" FOREIGN KEY ("chapterid") REFERENCES "chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
