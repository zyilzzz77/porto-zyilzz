ALTER TABLE "donations" ADD COLUMN "session_id" text;--> statement-breakpoint
ALTER TABLE "donations" ADD COLUMN "client_ip" text;--> statement-breakpoint
ALTER TABLE "donations" ADD COLUMN "expires_at" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "donations_session_id_idx" ON "donations" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "donations_client_ip_idx" ON "donations" USING btree ("client_ip");