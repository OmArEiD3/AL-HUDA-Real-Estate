import { Router, type IRouter } from "express";
import { and, desc, eq, gte, ilike, or } from "drizzle-orm";
import { db, propertiesTable } from "@workspace/db";
import {
  CreatePropertyBody,
  CreatePropertyResponse,
  DeletePropertyParams,
  GetPropertyParams,
  GetPropertyResponse,
  ListPropertiesQueryParams,
  ListPropertiesResponse,
  UpdatePropertyBody,
  UpdatePropertyParams,
  UpdatePropertyResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function present(property: typeof propertiesTable.$inferSelect) {
  return {
    ...property,
    price: Number(property.price),
    area: Number(property.area),
    imageUrls: property.imageUrls ?? [],
  };
}

router.get("/properties", async (req, res): Promise<void> => {
  const parsed = ListPropertiesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const q = parsed.data;
  const filters = [
    eq(propertiesTable.status, "Available"),
    q.operation ? eq(propertiesTable.operation, q.operation) : undefined,
    q.neighborhood ? eq(propertiesTable.neighborhood, q.neighborhood) : undefined,
    q.propertyType ? eq(propertiesTable.propertyType, q.propertyType) : undefined,
    q.minPrice !== undefined ? gte(propertiesTable.price, String(q.minPrice)) : undefined,
    q.bedrooms !== undefined ? gte(propertiesTable.bedrooms, q.bedrooms) : undefined,
    q.featured !== undefined ? eq(propertiesTable.featured, q.featured) : undefined,
    q.search
      ? or(
          ilike(propertiesTable.titleEn, `%${q.search}%`),
          ilike(propertiesTable.titleAr, `%${q.search}%`),
          ilike(propertiesTable.propertyId, `%${q.search}%`),
        )
      : undefined,
  ].filter(Boolean);
  const rows = await db
    .select()
    .from(propertiesTable)
    .where(and(...filters))
    .orderBy(desc(propertiesTable.createdAt));
  const filtered = rows.filter((row) => {
    const price = Number(row.price);
    return (q.maxPrice === undefined || price <= q.maxPrice) && (q.minPrice === undefined || price >= q.minPrice);
  }).map(present);
  res.json(ListPropertiesResponse.parse(filtered));
});

router.post("/properties", async (req, res): Promise<void> => {
  const parsed = CreatePropertyBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const propertyId = `ALH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const [created] = await db.insert(propertiesTable).values({
    ...data,
    propertyId,
    price: String(data.price),
    area: String(data.area),
    imageUrl: data.imageUrl ?? (data.imageUrls?.[0] ?? ""),
    imageUrls: data.imageUrls ?? (data.imageUrl ? [data.imageUrl] : []),
  }).returning();
  res.status(201).json(CreatePropertyResponse.parse(present(created)));
});

router.get("/properties/:id", async (req, res): Promise<void> => {
  const params = GetPropertyParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [property] = await db.select().from(propertiesTable).where(eq(propertiesTable.id, params.data.id));
  if (!property) {
    res.status(404).json({ error: "Property not found" });
    return;
  }
  res.json(GetPropertyResponse.parse(present(property)));
});

router.patch("/properties/:id", async (req, res): Promise<void> => {
  const params = UpdatePropertyParams.safeParse(req.params);
  const body = UpdatePropertyBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: "Invalid property data" });
    return;
  }
  const [updated] = await db.update(propertiesTable).set({
    ...body.data,
    price: body.data.price === undefined ? undefined : String(body.data.price),
    area: body.data.area === undefined ? undefined : String(body.data.area),
    updatedAt: new Date(),
  }).where(eq(propertiesTable.id, params.data.id)).returning();
  if (!updated) {
    res.status(404).json({ error: "Property not found" });
    return;
  }
  res.json(UpdatePropertyResponse.parse(present(updated)));
});

router.delete("/properties/:id", async (req, res): Promise<void> => {
  const params = DeletePropertyParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [updated] = await db.update(propertiesTable).set({ status: "Archived", updatedAt: new Date() }).where(eq(propertiesTable.id, params.data.id)).returning();
  if (!updated) {
    res.status(404).json({ error: "Property not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;