-- CreateTable
CREATE TABLE "quize_form" (
    "id" SERIAL NOT NULL,
    "form" JSONB,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "quize_form_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quize_form" ADD CONSTRAINT "quize_form_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
