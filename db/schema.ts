import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const donationStatuses = [
  "CREATED",
  "PENDING",
  "PAID",
  "FAILED",
  "EXPIRED",
  "CANCELLED",
  "REFUNDED",
] as const;

export type DonationStatus = (typeof donationStatuses)[number];

export const donations = pgTable(
  "donations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: text("order_id").notNull(),
    donorName: text("donor_name").notNull(),
    message: text("message"),
    amount: integer("amount").notNull(),
    fee: integer("fee"),
    providerAmount: integer("provider_amount"),
    status: text("status").$type<DonationStatus>().notNull().default("PENDING"),
    source: text("source").notNull().default("web"),
    // Identitas pembuat order dipakai untuk membatasi jumlah pembayaran
    // pending (anti-abuse). Kombinasi session cookie + IP supaya limit tidak
    // bisa diakali hanya dengan menghapus cookie atau ganti koneksi.
    sessionId: text("session_id"),
    clientIp: text("client_ip"),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    paidAt: timestamp("paid_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("donations_order_id_unique").on(table.orderId),
    index("donations_status_paid_at_idx").on(table.status, table.paidAt),
    index("donations_session_id_idx").on(table.sessionId),
    index("donations_client_ip_idx").on(table.clientIp),
  ],
);

export const webhookDeliveries = pgTable("webhook_deliveries", {
  deliveryId: text("delivery_id").primaryKey(),
  event: text("event").notNull(),
  orderId: text("order_id").notNull(),
  receivedAt: timestamp("received_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
