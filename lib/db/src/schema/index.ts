import { createInsertSchema } from "drizzle-zod";
import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const propertiesTable = pgTable("properties", {
  id: serial("id").primaryKey(),
  propertyId: text("property_id").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  propertyType: text("property_type").notNull(),
  operation: text("operation").notNull(),
  neighborhood: text("neighborhood").notNull(),
  compound: text("compound"),
  price: numeric("price", { precision: 14, scale: 2 }).notNull(),
  status: text("status").notNull().default("Available"),
  featured: boolean("featured").notNull().default(false),
  area: numeric("area", { precision: 10, scale: 2 }).notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  finishing: text("finishing"),
  floor: text("floor"),
  elevator: boolean("elevator").notNull().default(true),
  imageUrl: text("image_url").notNull(),
  imageUrls: text("image_urls").array().notNull().default([]),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  propertyId: integer("property_id"),
  propertyTitle: text("property_title"),
  message: text("message"),
  source: text("source").notNull().default("Website"),
  status: text("status").notNull().default("New"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPropertySchema = createInsertSchema(propertiesTable);
export const insertLeadSchema = createInsertSchema(leadsTable);
export type Property = typeof propertiesTable.$inferSelect;
export type InsertProperty = typeof propertiesTable.$inferInsert;
export type Lead = typeof leadsTable.$inferSelect;
export type InsertLead = typeof leadsTable.$inferInsert;