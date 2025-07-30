import { pgTable, serial, varchar, text, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Portfolio projects table (for future admin panel)
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  technologies: jsonb("technologies").$type<string[]>().notNull(),
  githubUrl: varchar("github_url", { length: 500 }),
  demoUrl: varchar("demo_url", { length: 500 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Website visitors table
export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(), // IPv6 support
  userAgent: text("user_agent"),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  visitCount: integer("visit_count").default(1).notNull(),
  firstVisit: timestamp("first_visit").defaultNow().notNull(),
  lastVisit: timestamp("last_visit").defaultNow().notNull(),
});

// Page views table  
export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  visitorId: serial("visitor_id").references(() => visitors.id),
  page: varchar("page", { length: 255 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Relations
export const contactMessagesRelations = relations(contactMessages, ({ one }) => ({}));
export const projectsRelations = relations(projects, ({ one }) => ({}));
export const usersRelations = relations(users, ({ many }) => ({}));
export const visitorsRelations = relations(visitors, ({ many }) => ({
  pageViews: many(pageViews),
}));
export const pageViewsRelations = relations(pageViews, ({ one }) => ({
  visitor: one(visitors, { fields: [pageViews.visitorId], references: [visitors.id] }),
}));

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  isRead: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertVisitorSchema = createInsertSchema(visitors).omit({
  id: true,
  visitCount: true,
  firstVisit: true,
  lastVisit: true,
});

export const insertPageViewSchema = createInsertSchema(pageViews).omit({
  id: true,
  timestamp: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Visitor = typeof visitors.$inferSelect;
export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = z.infer<typeof insertPageViewSchema>;
