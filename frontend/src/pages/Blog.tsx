import { useEffect, useState } from "react"
import axios from "axios";
import { BackendUrl } from "../config";
import { useParams } from "react-router-dom";   
import { BlogBar } from "../components/BlogBar";
import { Avataar } from "../components/Avataar";
import { BlogSkaleton } from "../components/BlogSkeleton";

interface BlogType {
    id:string,
    authorId:string,
    title:string,
    content:string,
    published:string,
    author:{
        name:string
    }
}

export const Blog = ()=>{
    const[blog , setBlog] = useState <BlogType | null>(null);
    const { id } = useParams<{ id: string }>(); // Get id from URL
    useEffect(()=>{
        axios(`${BackendUrl}/api/v1/blog/${id}`,{
            headers:{
                Authorization: localStorage.getItem("authorization") || ""
            }
        })
        .then(res => setBlog(res.data.response))
    },[])
    if(!blog){
        return(
            <BlogSkaleton />
        )
    }
    return(
        <div >
            <BlogBar />
            <div className="grid grid-cols-4 min-h-screen">
                <div className="col-span-3">
                    <div className="flex flex-col p-4">
                        <div className="text-3xl font-bold mb-2">{blog.title}</div>
                        <div className="text-md font-semibold mb-3 text-slate-400">{`Published on ${(blog.published == "false")?"oct 4 2003": blog.published}`}</div>
                        <div className="text-md mb-3 text-black">{blog.content}</div>
                    </div>
                </div>
                <div className="col-span-1 p-4 border-l flex flex-col justify-center h-[90%] ">
                    <div className="font-semibold text-slate-500">Author</div>
                    <div className="flex">
                        <div className="mr-3 mt-2"><Avataar authorName={blog.author.name || "Anynomous"}/></div>
                        <div className="flex flex-col">
                            <div className="font-bold text-2xl">{blog.author.name || "Anynomous"}</div>
                            <div className="text-slate-400 text-1xl">Affilation is not provided</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}