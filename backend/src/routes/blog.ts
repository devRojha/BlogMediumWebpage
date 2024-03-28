import { authMiddleware } from "../middleware";
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { blogInput, updateBlogInput } from '@devraj04/medium-common';

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET : string
    },
    Variables: {     
      authorId : string
    },
  }>();

  // post blog
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
          publishedDate: dinank,
          published: body.published,
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
  
  // update blog
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
          content: body.content,
          published: body.published
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

  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      //Todo: need add pagination
      const blogs = await prisma.post.findMany({
        where:{
          published: "true"
        },
        select:{
          id: true,
          authorId: true,
          content: true,
          title: true,
          published:true,
          publishedDate:true,
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

  // get all blog of a author
  blogRouter.get('/author',authMiddleware, async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
      //Todo: need add pagination
      const authorId = c.get('authorId');
      const blogs = await prisma.post.findMany({
        where:{
          authorId: authorId,
          published: "true"
        },
        select:{
          id: true,
          authorId: true,
          content: true,
          title: true,
          published:true,
          publishedDate:true,
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
  
  // get draft blog of a author
  blogRouter.get('/draft',authMiddleware, async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
      //Todo: need add pagination
      const authorId = c.get('authorId');
      const blogs = await prisma.post.findMany({
        where:{
          authorId: authorId,
          published: "false"
        },
        select:{
          id: true,
          authorId: true,
          content: true,
          title: true,
          published:true,
          publishedDate:true,
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

  // get blog of with id
  blogRouter.get('/:id',authMiddleware, async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      const id = c.req.param("id");
      const blog = await prisma.post.findFirst({
        where:{
          id: id,
        },
        select:{
          id:true,
          authorId:true,
          title:true,
          content:true,
          published:true,
          publishedDate:true,
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

  //delete a blog of a id
  blogRouter.delete('/:id',authMiddleware, async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      const id = c.req.param("id");
      const blog = await prisma.post.delete({
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