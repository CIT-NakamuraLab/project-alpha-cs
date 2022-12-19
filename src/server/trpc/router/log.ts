import { z } from 'zod'
import { adminProcedure, router } from '../trpc'

export const logRouter = router({
  showLogs: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.log.findMany()
  }),

  deleteLog: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.log.delete({
        where: {
          id: input.id
        }
      })
    })
})
