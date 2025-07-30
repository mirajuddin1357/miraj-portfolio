import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body using Zod schema
      const validatedData = insertContactMessageSchema.parse(req.body);

      // Save message to database
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
      
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid form data. Please check all fields and try again." 
        });
      }
      
      res.status(500).json({ 
        message: "Internal server error. Please try again later." 
      });
    }
  });

  // Get all contact messages (for future admin panel)
  app.get("/api/contact-messages", async (req, res) => {
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

  // Visitor tracking endpoint
  app.post("/api/track-visit", async (req, res) => {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
      const userAgent = req.get('User-Agent');
      const page = req.body.page || '/';

      // Get or create visitor
      const visitor = await storage.getOrCreateVisitor(ipAddress, userAgent);
      
      // Track page view
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

  // Get visitor statistics endpoint
  app.get("/api/visitor-stats", async (req, res) => {
    try {
      const stats = await storage.getVisitorStats();
      const recentVisitors = await storage.getRecentVisitors(5);
      
      res.json({
        ...stats,
        recentVisitors: recentVisitors.map(v => ({
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

  const httpServer = createServer(app);
  return httpServer;
}
