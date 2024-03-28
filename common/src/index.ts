import z from "zod"


export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string()
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const blogInput = z.object({
    title : z.string().min(2),
    content: z.string().min(2),
    published: z.string().optional(),
})
export const updateBlogInput = z.object({
    title : z.string().optional(),
    content: z.string().optional(),
    published: z.string().optional(),
})

//  type inference in zod
//  export the type for the frontend to use them

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type BlogInput = z.infer<typeof blogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>