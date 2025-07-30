var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  contactMessages: () => contactMessages,
  contactMessagesRelations: () => contactMessagesRelations,
  insertContactMessageSchema: () => insertContactMessageSchema,
  insertPageViewSchema: () => insertPageViewSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertUserSchema: () => insertUserSchema,
  insertVisitorSchema: () => insertVisitorSchema,
  pageViews: () => pageViews,
  pageViewsRelations: () => pageViewsRelations,
  projects: () => projects,
  projectsRelations: () => projectsRelations,
  users: () => users,
  usersRelations: () => usersRelations,
  visitors: () => visitors,
  visitorsRelations: () => visitorsRelations
});
import { pgTable, serial, varchar, text, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  technologies: jsonb("technologies").$type().notNull(),
  githubUrl: varchar("github_url", { length: 500 }),
  demoUrl: varchar("demo_url", { length: 500 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  // IPv6 support
  userAgent: text("user_agent"),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  visitCount: integer("visit_count").default(1).notNull(),
  firstVisit: timestamp("first_visit").defaultNow().notNull(),
  lastVisit: timestamp("last_visit").defaultNow().notNull()
});
var pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  visitorId: serial("visitor_id").references(() => visitors.id),
  page: varchar("page", { length: 255 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull()
});
var contactMessagesRelations = relations(contactMessages, ({ one }) => ({}));
var projectsRelations = relations(projects, ({ one }) => ({}));
var usersRelations = relations(users, ({ many }) => ({}));
var visitorsRelations = relations(visitors, ({ many }) => ({
  pageViews: many(pageViews)
}));
var pageViewsRelations = relations(pageViews, ({ one }) => ({
  visitor: one(visitors, { fields: [pageViews.visitorId], references: [visitors.id] })
}));
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  isRead: true,
  createdAt: true
});
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true
});
var insertVisitorSchema = createInsertSchema(visitors).omit({
  id: true,
  visitCount: true,
  firstVisit: true,
  lastVisit: true
});
var insertPageViewSchema = createInsertSchema(pageViews).omit({
  id: true,
  timestamp: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle(pool, { schema: schema_exports });

// server/storage.ts
import { eq, desc, count } from "drizzle-orm";
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Contact message methods
  async createContactMessage(message) {
    const [createdMessage] = await db.insert(contactMessages).values(message).returning();
    return createdMessage;
  }
  async getContactMessages() {
    return await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
  }
  async markMessageAsRead(id) {
    await db.update(contactMessages).set({ isRead: true }).where(eq(contactMessages.id, id));
  }
  // Visitor tracking methods
  async trackVisitor(visitorData) {
    const [visitor] = await db.insert(visitors).values(visitorData).returning();
    return visitor;
  }
  async getOrCreateVisitor(ipAddress, userAgent) {
    const [existingVisitor] = await db.select().from(visitors).where(eq(visitors.ipAddress, ipAddress));
    if (existingVisitor) {
      const [updatedVisitor] = await db.update(visitors).set({
        lastVisit: /* @__PURE__ */ new Date(),
        visitCount: existingVisitor.visitCount + 1,
        userAgent: userAgent || existingVisitor.userAgent
      }).where(eq(visitors.id, existingVisitor.id)).returning();
      return updatedVisitor;
    } else {
      const [newVisitor] = await db.insert(visitors).values({
        ipAddress,
        userAgent,
        visitCount: 1
      }).returning();
      return newVisitor;
    }
  }
  async trackPageView(visitorId, page) {
    const [pageView] = await db.insert(pageViews).values({ visitorId, page }).returning();
    return pageView;
  }
  async getVisitorStats() {
    const [visitorCount] = await db.select({ count: count() }).from(visitors);
    const [pageViewCount] = await db.select({ count: count() }).from(pageViews);
    return {
      totalVisitors: visitorCount.count,
      totalPageViews: pageViewCount.count
    };
  }
  async getRecentVisitors(limit = 10) {
    return await db.select().from(visitors).orderBy(desc(visitors.lastVisit)).limit(limit);
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const savedMessage = await storage.createContactMessage(validatedData);
      console.log("Contact form submission saved to database:", {
        id: savedMessage.id,
        firstName: savedMessage.firstName,
        lastName: savedMessage.lastName,
        email: savedMessage.email,
        subject: savedMessage.subject,
        timestamp: savedMessage.createdAt
      });
      res.json({
        message: "Message sent successfully! I will get back to you soon.",
        id: savedMessage.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({
          message: "Invalid form data. Please check all fields and try again."
        });
      }
      res.status(500).json({
        message: "Internal server error. Please try again later."
      });
    }
  });
  app2.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({
        message: "Internal server error."
      });
    }
  });
  app2.post("/api/track-visit", async (req, res) => {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress || "unknown";
      const userAgent = req.get("User-Agent");
      const page = req.body.page || "/";
      const visitor = await storage.getOrCreateVisitor(ipAddress, userAgent);
      await storage.trackPageView(visitor.id, page);
      console.log(`Visitor tracked: IP ${ipAddress}, Page: ${page}, Visit count: ${visitor.visitCount}`);
      res.json({
        success: true,
        visitorId: visitor.id,
        visitCount: visitor.visitCount
      });
    } catch (error) {
      console.error("Visitor tracking error:", error);
      res.status(500).json({ message: "Failed to track visitor" });
    }
  });
  app2.get("/api/visitor-stats", async (req, res) => {
    try {
      const stats = await storage.getVisitorStats();
      const recentVisitors = await storage.getRecentVisitors(5);
      res.json({
        ...stats,
        recentVisitors: recentVisitors.map((v) => ({
          id: v.id,
          country: v.country,
          city: v.city,
          visitCount: v.visitCount,
          lastVisit: v.lastVisit
        }))
      });
    } catch (error) {
      console.error("Visitor stats error:", error);
      res.status(500).json({ message: "Failed to get visitor stats" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
