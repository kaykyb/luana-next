-- CREATE SCHEMA "auth";
--> statement-breakpoint
CREATE SCHEMA "private";
--> statement-breakpoint
-- CREATE TABLE IF NOT EXISTS "auth"."users" (
-- 	"id" uuid NOT NULL
-- );
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "private"."profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(64),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "private"."prompts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quiz_session_id" uuid NOT NULL,
	"question" text NOT NULL,
	"position" integer NOT NULL,
	"answer" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "private"."quiz_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quiz_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "private"."quizzes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"leading_prompt" text,
	"title" varchar(100),
	"max_prompts" integer,
	"conclusion" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "private"."profiles" ADD CONSTRAINT "profiles_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "private"."prompts" ADD CONSTRAINT "prompts_quiz_session_id_quiz_session_id_fk" FOREIGN KEY ("quiz_session_id") REFERENCES "private"."quiz_session"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "private"."quiz_session" ADD CONSTRAINT "quiz_session_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "private"."quizzes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "private"."quizzes" ADD CONSTRAINT "quizzes_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "private"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
