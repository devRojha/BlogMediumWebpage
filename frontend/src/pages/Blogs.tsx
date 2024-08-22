
import { BlogsBar } from "../components/BlogsBar"
import { BlogCard } from "../components/BlogCard"
import { BlogsSkaleton } from "../components/Skeleton"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { BackendUrl } from "../config"

interface Blog{
    id:string,
    authorId:string,
    content: string,
    title: string,
    published: string,
    publishedDate: string,
    author: {
        name: string,
    }
}

export const Blogs= ()=>{
    const [forYou , setForYou] = useState(false);
    const [blogs , setBlogs] = useState<Blog[]| null>(null);
    useEffect(()=>{
        setBlogs(null);
        if(forYou == false){
            axios(`${BackendUrl}/api/v1/blog/bulk`,{
                headers:{
                    Authorization: localStorage.getItem("authorization")
                }
            }) 
                .then(res => {
                    setBlogs(res.data.response);
                })
        }
        else{
            axios(`${BackendUrl}/api/v1/blog/author`,{
                headers:{
                    Authorization: localStorage.getItem("authorization")
                }
            }) 
                .then(res => {
                    setBlogs(res.data.response);
                })
        }
    },[forYou])
    const navigate = useNavigate();
    useEffect(()=>{
        const token  = localStorage.getItem("authorization");
        if(!token){
            navigate("/")
        }
    },[localStorage.getItem("authorization")])
    if(!blogs){
        return(
            <div className="flex justify-center w-full">
                <div className="flex flex-col w-full">
                    <BlogsBar  setForYou={setForYou}/>
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                </div>
            </div>
        )
    }
    return(
        <div className="flex justify-center w-full">
            <div className="flex flex-col w-full">
                <BlogsBar  setForYou={setForYou}/>
                {blogs.map(blog=> { 
                    return(<BlogCard 
                            forYou={forYou}
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "Anonyous"}
                            title = {blog.title}
                            content={blog.content}
                            publishedDate={(blog.publishedDate == "false")?"04/10/2003" : blog.publishedDate}
                        />
                    )
                })}
            </div>
        </div>
    )
}



