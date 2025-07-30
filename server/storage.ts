import { type User, type InsertUser, type ContactMessage, type InsertContactMessage, type Visitor, type InsertVisitor, type PageView, type InsertPageView, users, contactMessages, visitors, pageViews } from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, and } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  markMessageAsRead(id: number): Promise<void>;
  
  // Visitor tracking methods
  trackVisitor(visitorData: InsertVisitor): Promise<Visitor>;
  getOrCreateVisitor(ipAddress: string, userAgent?: string): Promise<Visitor>;
  trackPageView(visitorId: number, page: string): Promise<PageView>;
  getVisitorStats(): Promise<{ totalVisitors: number; totalPageViews: number; }>;
  getRecentVisitors(limit?: number): Promise<Visitor[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [createdMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return createdMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
  }

  async markMessageAsRead(id: number): Promise<void> {
    await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id));
  }

  // Visitor tracking methods
  async trackVisitor(visitorData: InsertVisitor): Promise<Visitor> {
    const [visitor] = await db
      .insert(visitors)
      .values(visitorData)
      .returning();
    return visitor;
  }

  async getOrCreateVisitor(ipAddress: string, userAgent?: string): Promise<Visitor> {
    // Check if visitor exists
    const [existingVisitor] = await db
      .select()
      .from(visitors)
      .where(eq(visitors.ipAddress, ipAddress));

    if (existingVisitor) {
      // Update last visit and increment visit count
      const [updatedVisitor] = await db
        .update(visitors)
        .set({ 
          lastVisit: new Date(),
          visitCount: existingVisitor.visitCount + 1,
          userAgent: userAgent || existingVisitor.userAgent
        })
        .where(eq(visitors.id, existingVisitor.id))
        .returning();
      return updatedVisitor;
    } else {
      // Create new visitor
      const [newVisitor] = await db
        .insert(visitors)
        .values({
          ipAddress,
          userAgent,
          visitCount: 1
        })
        .returning();
      return newVisitor;
    }
  }

  async trackPageView(visitorId: number, page: string): Promise<PageView> {
    const [pageView] = await db
      .insert(pageViews)
      .values({ visitorId, page })
      .returning();
    return pageView;
  }

  async getVisitorStats(): Promise<{ totalVisitors: number; totalPageViews: number; }> {
    const [visitorCount] = await db
      .select({ count: count() })
      .from(visitors);
    
    const [pageViewCount] = await db
      .select({ count: count() })
      .from(pageViews);

    return {
      totalVisitors: visitorCount.count,
      totalPageViews: pageViewCount.count
    };
  }

  async getRecentVisitors(limit = 10): Promise<Visitor[]> {
    return await db
      .select()
      .from(visitors)
      .orderBy(desc(visitors.lastVisit))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
