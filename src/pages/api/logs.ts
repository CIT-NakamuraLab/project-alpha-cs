import type { NextApiRequest, NextApiResponse } from 'next'
import { generateHashedToken } from '../../utils/client'
import { PrismaClient } from '@prisma/client'
import { LogType } from '../../utils/const'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const { clientToken, studentId, type, hasKey } = req.body
    const client = await prisma.reader.findUnique({
      where: {
        client_token_hash: generateHashedToken(clientToken)
      }
    })
    if (client == null) {
      res.status(500).send('No client found.')
      return
    }
    const readerId = client.id

    if (type === LogType.ENTER && hasKey) {
      const result = await prisma.log.findFirst({
        where: {
          type: LogType.KEY_PICKUP
        }
      })

      if (result !== null) {
        await prisma.log.deleteMany({
          where: {
            type: LogType.KEY_PICKUP
          }
        })
      }
    }

    const log = await prisma.log.create({
      data: {
        reader_id: readerId,
        student_id: studentId,
        type: type,
        has_key: hasKey
      }
    })
    res.json({ log })
  }
}
