import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import crypto from "crypto";

const N = 16
const clientId = crypto.randomBytes(N).toString('base64').substring(0, N)
const clientToken = crypto.randomBytes(N).toString('base64').substring(0, N)
const clientTokenHash = crypto.createHash('sha256').update(clientToken).digest('hex')
export const readerRouter = router ({
  register: protectedProcedure
    .input(z.object({name: z.string()}))
    .query(async ({ctx, input}) => {
      const object = {data: {
          name: input.name,
          client_id: clientId,
          client_token_hash: clientTokenHash
        }
      }
      const result = await ctx.prisma.reader.create(object)
      return {client_token: clientToken, ...result}
    }),

  deleteReader: protectedProcedure
    .input(z.object({clientId: z.string()}))
    .query(async ({ctx, input}) => {
      const result = await ctx.prisma.reader.delete({
        where: {
          client_id: input.clientId,
        },
      })
      return result
    })
})