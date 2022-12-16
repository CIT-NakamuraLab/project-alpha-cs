import { adminProcedure, router } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
  setStudentId: adminProcedure
    .input(
      z.object({
        id: z.string(),
        studentId: z.string().length(7).regex(new RegExp('[0-9]{2}[A-Z0-9]{2}[0-9]{3}'))
      })
    )
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
  deleteUser: adminProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.user.delete({
      where: {
        id: input.id
      }
    })
  }),
  isAdmin: adminProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
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
