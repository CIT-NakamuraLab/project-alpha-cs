import { z } from 'zod'
import { adminProcedure, publicProcedure, router } from '../trpc'

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
    }),

  getActiveUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany()
    const activeUsers = await Promise.all(
      users.map(async user => {
        if (user.student_id != null) {
          const result = await ctx.prisma.log.findFirst({
            where: {
              student_id: user.student_id
            }
          })

          if (result?.type == 0) {
            return user.name
          }
        }
      })
    )

    return activeUsers
  })
})
