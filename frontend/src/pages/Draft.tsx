import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../config";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { BlogsSkaleton } from "../components/Skeleton";
import { Avataar } from "../components/Avataar";
import { IoIosMore } from "react-icons/io";
import { HiOutlineBell } from "react-icons/hi";
import { DraftCard } from "../components/DraftCard";

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

export const Draft = ()=>{
    const [blogs , setBlogs] = useState<Blog[]| null>(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const token  = localStorage.getItem("authorization");
        if(!token){
            navigate("/")
        }
    },[localStorage.getItem("authorization")])

    useEffect(()=>{
        axios(`${BackendUrl}/api/v1/blog/draft`,{
            headers:{
                Authorization: localStorage.getItem("authorization")
            }
        }) 
            .then(res => {
                setBlogs(res.data.response);
            })
    },[])

    if(!blogs){
        return(
            <div className="flex justify-center w-full">
                <div className="flex flex-col w-full">
                    <PostBar1 />
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
            <PostBar1 />
            {blogs.map(blog=> { 
                return(<DraftCard
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



const PostBar1 = ()=>{
    const navigate = useNavigate();
    
    const name = localStorage.getItem("name") || "";
    if(!name){
        navigate("/")
    }
    return(
        <div className="flex justify-center w-full  mb-8">
            <div className="flex justify-between w-full shadow-lg rounded-md h-12 d space-x-4 pl-4">
                <div className="h-full flex justify-center space-x-4 pl-4">
                    <div className="h-full flex flex-col justify-center">
                        <button onClick={()=>{navigate("/blogs")}} className="flex justify-center p-2 text-white font-bold text-1xl h-8 w-8 bg-blue-500 hover:bg-blue-800 active:text-black rounded-full"><IoArrowBack /></button>
                    </div>
                    <div className="h-full flex flex-col justify-center">
                        <div  className="flex justify-center">
                            <div className="w-6 h-6 bg-black rounded-full mr-[1px] border"></div>
                            <div className="w-4 h-6 bg-black rounded-full  mr-[1px]"></div>
                            <div className="w-2 h-6 bg-black rounded-full"></div>
                        </div>
                    </div>
                    <div className="h-full flex flex-col justify-center">
                        <button onClick={()=>{
                            navigate("/draft");
                        }} className="h-full  border-slate-500 active:border-blue-600 active:border-b hover:border-b active:text-blue-600 text-slate-400 font-semibold">Draft</button>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 text-slate-600">
                    <div className="flex flex-col justify-center">
                        <button onClick={()=>{
                            // clearing everything
                            navigate("/blog/post")
                        }} className="hover:bg-green-800 active:text-slate-500 border rounded-2xl pl-3 pr-3 flex flex-col justify-center bg-green-600 h-8 text-white">New</button>
                    </div>
                    <div className="flex flex-col justify-center">
                        <button className="active:text-blue-600 flex flex-col justify-center border-slate-500 active:border-blue-600 active:border-b hover:border-b h-full"><IoIosMore /></button>
                    </div>
                    <div className="flex flex-col justify-center">
                        <button className="active:text-blue-600 text-2xl border-slate-500 active:border-blue-600 active:border-b hover:border-b h-full"><HiOutlineBell /></button>
                    </div>
                    <button onClick={()=>{
                        localStorage.clear();
                        navigate("/");
                        }} className="active:text-blue-600 border-slate-500 active:border-blue-600 active:border-b hover:border-b">Log Out</button>
                    <div className="flex flex-col justify-center">
                        <Avataar
                            authorName={name}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}