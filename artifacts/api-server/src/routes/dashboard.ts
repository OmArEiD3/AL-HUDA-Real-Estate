import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, leadsTable, propertiesTable } from "@workspace/db";
import { GetDashboardSummaryResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/dashboard/summary", async (_req, res): Promise<void> => {
  const [properties, leads] = await Promise.all([
    db.select().from(propertiesTable).orderBy(desc(propertiesTable.createdAt)),
    db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt)),
  ]);
  const present = (property: typeof propertiesTable.$inferSelect) => ({
    ...property,
    price: Number(property.price),
    area: Number(property.area),
    imageUrls: property.imageUrls ?? [],
  });
  const summary = {
    totalProperties: properties.length,
    availableProperties: properties.filter((p) => p.status === "Available").length,
    soldProperties: properties.filter((p) => p.status === "Sold").length,
    rentedProperties: properties.filter((p) => p.status === "Rented").length,
    featuredProperties: properties.filter((p) => p.featured).length,
    newLeads: leads.filter((l) => l.status === "New").length,
    recentProperties: properties.slice(0, 4).map(present),
    recentLeads: leads.slice(0, 4),
  };
  res.json(GetDashboardSummaryResponse.parse(summary));
});

export default router;