import { authMiddleware } from "../middleware";
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { blogInput, updateBlogInput } from '@devraj04/medium-common';
import { date } from "zod";

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET : string
    },
    Variables: {     
      authorId : string
    },
  }>();


  blogRouter.post('/',authMiddleware, async (c) => {
    const body = await c.req.json();
    //zod validation
    const { success } = blogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({error: "input is not correct"})
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      const authorId = c.get('authorId');
      const d = new Date();
      let dinank = d.toString().split(" ")[1] + " " +d.toString().split(" ")[2] + " " + d.toString().split(" ")[3];
      const cont = await prisma.post.create({
        data:{
          title: body.title,
          content: body.content,
          published: dinank,
          authorId: authorId  //need to take from middleware
        }
      })
      console.log(cont);
      c.status(200);
      return c.json({response:"post uploaded"})
    }
    catch(e){
      return c.json({error: "error while fetching"})
    }
  })
  
  blogRouter.put('/',authMiddleware, async (c) => {
    const body = await c.req.json();
    //zod validation
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({error: "input is not correct"})
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      const cont = await prisma.post.update({
        where:{
          id: body.id
        },
        data:{
          title: body.title,
          content: body.content
        }
      })
      console.log(cont);
      c.status(200);
      return c.json({response:"post updated"})
    }
    catch(e){
      c.status(411);
      return c.json({error: "error while fetching"})
    }
  })

  blogRouter.get('/bulk',authMiddleware, async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      //Todo: need add pagination
      const blogs = await prisma.post.findMany({
        select:{
          id: true,
          authorId: true,
          content: true,
          title: true,
          published:true,
          author:{
            select:{
              name:true
            }
          }
        }
      })
      c.status(200);
      return c.json({response: blogs})
    }
    catch(e){
      return c.json({error: "error while fetching"})
    }
  })
  
  blogRouter.get('/:id',authMiddleware, async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      const id = c.req.param("id");
      const blog = await prisma.post.findFirst({
        where:{
          id: id
        },
        select:{
          id:true,
          authorId:true,
          title:true,
          content:true,
          published:true,
          author:{
            select:{
              name:true
            }
          }
        }
      })
      console.log(blog); 
      c.status(200);
      return c.json({response: blog})
    }
    catch(e){
      c.status(411);
      return c.json({error: "error while fetching blog post"})
    }
  }) 
  