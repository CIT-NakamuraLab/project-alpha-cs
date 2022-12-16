import { adminProcedure, router } from '../trpc'
import { z } from 'zod'
import { generateClientId, generateClientToken, generateHashedToken } from '../../../utils/client'

export const readerRouter = router({
  registerReader: adminProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const clientToken = generateClientToken()
      const object = {
        data: {
          name: input.name,
          client_id: generateClientId(),
          client_token_hash: generateHashedToken(clientToken)
        }
      }
      const result = await ctx.prisma.reader.create(object)
      return { client_token: clientToken, ...result }
    }),

  deleteReader: adminProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.reader.delete({
        where: {
          client_id: input.clientId
        }
      })
    }),

  showReaders: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.reader.findMany({ select: { client_id: true, name: true } })
  }),

  updateReaderName: adminProcedure
    .input(z.object({ clientId: z.string(), updatedName: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.reader.update({
        where: {
          client_id: input.clientId
        },
        data: {
          name: input.updatedName
        }
      })
    })
})
