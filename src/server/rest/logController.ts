import { PrismaClient } from "@prisma/client";
import type {Request, Response } from "express";
import { Router } from "express";
import { generateHashedToken } from "../../utils/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/logs", async (req: Request, res: Response) => {
  const { clientToken, studentId, type, hasKey } = req.body;

  const client = await prisma.reader.findUnique({
    where: {
      client_token_hash: generateHashedToken(clientToken)
    }
  })
  if (client == null) {
    res.status(500).send("No client found.")
    return
  }
  const readerId = client.id
  const log = await prisma.log.create({
    data: {
      reader_id: readerId,
      student_id: studentId,
      type: type,
      has_key: hasKey
    }
  })
  res.json({ log })
})

export default router