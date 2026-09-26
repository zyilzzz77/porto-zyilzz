CREATE TABLE "donations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" text NOT NULL,
	"donor_name" text NOT NULL,
	"message" text,
	"amount" integer NOT NULL,
	"fee" integer,
	"provider_amount" integer,
	"status" text DEFAULT 'PENDING' NOT NULL,
	"source" text DEFAULT 'web' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"paid_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "webhook_deliveries" (
	"delivery_id" text PRIMARY KEY NOT NULL,
	"event" text NOT NULL,
	"order_id" text NOT NULL,
	"received_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "donations_order_id_unique" ON "donations" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "donations_status_paid_at_idx" ON "donations" USING btree ("status","paid_at");