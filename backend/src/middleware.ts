import { verify } from "hono/jwt";


export const authMiddleware = async (c:any, next:any)=>{
    try{
      const token = await c.req.header("authorization") || "";
      if(token){
        const response = await verify(token , c.env.JWT_SECRET); //JWT_SECRET not giver
        if(response.id){
          c.set('authorId', response.id);
          await next();
        }
      }
      else{
        c.status(404);
        return c.json({errror:"token lost"});
      }
    }
    catch(e){
      c.status(500);
      return c.json({error:"somthing wrong with the token"})
    }
  }
  