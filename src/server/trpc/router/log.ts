import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { LogType } from '../../../utils/const'
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

  addKeyPickupLog: publicProcedure
    .input(
      z.object({ studentId: z.string().length(7).regex(new RegExp('[0-9]{2}[A-Z0-9]{2}[0-9]{3}')) })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.log.findFirst({
        where: {
          type: LogType.KEY_PICKUP
        }
      })

      if (result !== null) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'PickupLogが既に存在します'
        })
      }

      return await ctx.prisma.log.create({
        data: {
          reader_id: 0,
          student_id: input.studentId,
          type: LogType.KEY_PICKUP,
          has_key: true
        }
      })
    }),

  deleteKeyPickupLog: publicProcedure.mutation(async ({ ctx }) => {
    return await ctx.prisma.log.deleteMany({
      where: {
        type: LogType.KEY_PICKUP
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

          if (result?.type === LogType.ENTER) {
            return user.name
          }
        }
      })
    )
    if (activeUsers[0] !== undefined && activeUsers[0] !== null) {
      return activeUsers as string[]
    } else {
      return []
    }
  })
})
