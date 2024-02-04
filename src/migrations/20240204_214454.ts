import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "hof_images" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "hof_people" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "hof" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"transcript" jsonb,
	"date" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "hof_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer,
	"hof_person_id" integer
);

CREATE TABLE IF NOT EXISTS "hof_person" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"username" varchar,
	"website" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_card_url" varchar,
	"sizes_card_width" numeric,
	"sizes_card_height" numeric,
	"sizes_card_mime_type" varchar,
	"sizes_card_filesize" numeric,
	"sizes_card_filename" varchar,
	"sizes_tablet_url" varchar,
	"sizes_tablet_width" numeric,
	"sizes_tablet_height" numeric,
	"sizes_tablet_mime_type" varchar,
	"sizes_tablet_filesize" numeric,
	"sizes_tablet_filename" varchar
);

CREATE TABLE IF NOT EXISTS "blog" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"title" varchar NOT NULL,
	"content" jsonb NOT NULL,
	"summary" varchar,
	"date" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "hof_images" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "hof_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "hof_people" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "hof_people" ("_parent_id");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "hof" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "hof_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "hof_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "hof_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "hof_person" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "media" ("created_at");
CREATE INDEX IF NOT EXISTS "sizes_tablet_filename_idx" ON "media" ("sizes_tablet_filename");
CREATE UNIQUE INDEX IF NOT EXISTS "slug_idx" ON "blog" ("slug");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "blog" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "hof_images" ADD CONSTRAINT "hof_images__parent_id_hof_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "hof"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "hof_people" ADD CONSTRAINT "hof_people__parent_id_hof_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "hof"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "hof_rels" ADD CONSTRAINT "hof_rels_parent_id_hof_id_fk" FOREIGN KEY ("parent_id") REFERENCES "hof"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "hof_rels" ADD CONSTRAINT "hof_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "hof_rels" ADD CONSTRAINT "hof_rels_hof_person_id_hof_person_id_fk" FOREIGN KEY ("hof_person_id") REFERENCES "hof_person"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users";
DROP TABLE "hof_images";
DROP TABLE "hof_people";
DROP TABLE "hof";
DROP TABLE "hof_rels";
DROP TABLE "hof_person";
DROP TABLE "media";
DROP TABLE "blog";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`);

};
