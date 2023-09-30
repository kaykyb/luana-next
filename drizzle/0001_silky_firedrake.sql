ALTER TABLE "private"."quizzes" ALTER COLUMN "leading_prompt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "private"."quizzes" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "private"."quizzes" ALTER COLUMN "max_prompts" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "private"."quiz_session" ADD COLUMN "conclusion" text;--> statement-breakpoint
ALTER TABLE "private"."quizzes" DROP COLUMN IF EXISTS "conclusion";