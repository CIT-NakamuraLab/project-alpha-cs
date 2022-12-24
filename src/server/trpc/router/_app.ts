import { router } from '../trpc'
import { authRouter } from './auth'
import { logRouter } from './log'
import { readerRouter } from './reader'
import { userRouter } from './user'

export const appRouter = router({
  auth: authRouter,
  log: logRouter,
  reader: readerRouter,
  user: userRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
