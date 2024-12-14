-- DropForeignKey
ALTER TABLE "quize_form" DROP CONSTRAINT "quize_form_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "teacher" DROP CONSTRAINT "teacher_userId_fkey";

-- DropForeignKey
ALTER TABLE "universitys" DROP CONSTRAINT "universitys_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_subjects" DROP CONSTRAINT "user_subjects_studentId_fkey";

-- DropForeignKey
ALTER TABLE "user_subjects" DROP CONSTRAINT "user_subjects_subjectId_fkey";

-- AddForeignKey
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "universitys" ADD CONSTRAINT "universitys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subjects" ADD CONSTRAINT "user_subjects_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subjects" ADD CONSTRAINT "user_subjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quize_form" ADD CONSTRAINT "quize_form_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
