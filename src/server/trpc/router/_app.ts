import { router } from '../trpc'
import { authRouter } from './auth'
import { exampleRouter } from './example'
import { logRouter } from './log'

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  log: logRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
