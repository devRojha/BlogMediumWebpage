import axios from "axios";
import { useEffect, useState } from "react"
import { BackendUrl } from "../config";

interface Blog{
    id:string,
    authorId:string,
    content: string,
    title: string,
    published: string,
    author: {
        name: string,
    }
}

export const useBlogs = ()=>{
    const [loading , setLoading] = useState(true);
    const [blogs , setBlogs] = useState<Blog[]>([]);
    useEffect(()=>{
        axios(`${BackendUrl}/api/v1/blog/bulk`,{
            headers:{
                Authorization: localStorage.getItem("authorization")
            }
        }) 
            .then(res => {
                setBlogs(res.data.response);
                setLoading(false);
            })
    },[])
    return {
        loading,
        blogs
    }
}

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

export const useBlog = ({id}:{id:string})=>{
    const [loading , setLoading] = useState(true);
    const [blog , setBlog] = useState<BlogType>();
    useEffect(()=>{
        axios(`${BackendUrl}/api/v1/blog/${id}`,{
            headers:{
                Authorization: localStorage.getItem("authorization")
            }
        }) 
            .then(res => {
                setBlog(res.data.response);
                setLoading(false);
            })
    },[])
    return {
        loading,
        blog
    }
}


