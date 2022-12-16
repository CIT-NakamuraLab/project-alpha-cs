import { protectedProcedure, router } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
  setStudentId: protectedProcedure
    .input(z.object({ id: z.string(), studentId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          id: input.id
        },
        data: {
          student_id: input.studentId
        }
      })
    }),
  deleteStudent: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.delete({
        where: {
          id: input.id
        }
      })
    }),
  isAdmin: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.user.findMany({
      where: {
        id: input.id
      },
      select: {
        is_admin: true
      }
    })
  })
})
