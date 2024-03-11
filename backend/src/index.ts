import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET : string
  },
}>()

app.route("/api/v1/user", userRouter); 
app.route("/api/v1/blog", blogRouter);

// app.use('*', async (c) => {
// 	const prisma = new PrismaClient({
//       datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   c.set('prisma', prisma);
// })


//   https://backend.devraj227804.workers.dev

export default app
