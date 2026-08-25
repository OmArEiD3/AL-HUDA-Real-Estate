import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import { CreateLeadBody, CreateLeadResponse, ListLeadsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/leads", async (_req, res): Promise<void> => {
  const leads = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt));
  res.json(ListLeadsResponse.parse(leads));
});

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [lead] = await db.insert(leadsTable).values(parsed.data).returning();
  res.status(201).json(CreateLeadResponse.parse(lead));
});

export default router;