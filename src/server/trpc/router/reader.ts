import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { generateClientId, generateClientToken, generateHashedToken } from "../../../utils/client";

export const readerRouter = router ({
  registerReader: protectedProcedure
    .input(z.object({name: z.string()}))
    .query(async ({ctx, input}) => {
      const clientToken = generateClientToken()
      const object = {data: {
          name: input.name,
          client_id: generateClientId(),
          client_token_hash: generateHashedToken(clientToken)
        }
      }
      const result = await ctx.prisma.reader.create(object)
      return {client_token: clientToken, ...result}
    }),

  deleteReader: protectedProcedure
    .input(z.object({clientId: z.string()}))
    .query(async ({ctx, input}) => {
      return await ctx.prisma.reader.delete({
        where: {
          client_id: input.clientId,
        },
      })
    }),

  showReaders: protectedProcedure
    .query(async ({ctx}) => {
      return await ctx.prisma.reader.findMany({select: {client_id: true, name: true}})
    }),

  updateReaderName: protectedProcedure
    .input(z.object({clientId: z.string(), updatedName: z.string()}))
    .query(async ({ctx, input}) => {
      return await ctx.prisma.reader.update({
        where: {
          client_id: input.clientId,
        },
        data: {
          name: input.updatedName
        }
      })
    })
})