import { Hono } from 'hono'
import  { sign  }  from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinInput, signupInput } from '@devraj04/medium-common';

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET : string
    }
  }>()


//   https://backend.devraj227804.workers.dev   url

//signup route
userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  console.log(body);
    //zod validation
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({error: "input is not correct"})
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      const isexist = await prisma.user.findUnique({
        where:{
          email: body.email
        }
      })
      if(isexist){
        c.status(403);
        return c.json({error:'User allready exist', id: isexist.id})
      }
      else{
        if(body.name){
          const person = await prisma.user.create({
            data:{
              email: body.email,
              name: body.name,
              password: body.password,
            },
          })
          console.log(person);

          const payload = {
            id : person.id
          }
          const token = await sign(payload , c.env.JWT_SECRET);
          c.status(200);
          return c.json({token:token, name:person.name})
        }
        else{
          const person = await prisma.user.create({
            data:{
              email: body.email,
              password: body.password,
            },
          })
          console.log(person);
          const payload = {
            id : person.id
          }
          const token = await sign(payload , c.env.JWT_SECRET);
          c.status(200);
          return c.json({token:token})
        }
      }
    }
    catch(e){
      c.status(500);
      c.json({error: "enternal server down"})
    }
  })
  
  //signin route
  userRouter.post('/signin',async (c) => {
    const body = await c.req.json();
    //zod validation
    const { success } = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({error: "input is not correct"})
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
      const isexist = await prisma.user.findUnique({
        where:{
          email: body.email
        },
      })
      if(isexist){
        if(isexist.email === body.email && isexist.password === body.password){
            const payload = {
              id : isexist.id
            }
            const token = await sign(payload , c.env.JWT_SECRET);
            c.status(200);  
            return c.json({msg:"logged in",token:token, name:isexist.name})
        }
        else{
            c.status(404);
            return c.json({error:'something is missing'})
        }
      }
      else{
        c.status(404);
        return c.json({error:'User not exist'})
      }
    }
    catch(e){
      c.status(500);
      c.json({error: "Internal server down"})
    }
  
  })
  