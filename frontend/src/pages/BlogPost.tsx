import { useEffect, useState } from "react"
import { PostBar } from "../components/PostBar"
import axios from "axios";
import { BackendUrl } from "../config";
import { useNavigate } from "react-router-dom";


export const BlogPost = ()=>{
    const [title , setTitle] = useState("");
    const [content , setContent] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const token  = localStorage.getItem("authorization");
        if(!token){
            navigate("/")
        }
    },[localStorage.getItem("authorization")])
    const Published = ()=>{
        axios.post(`${BackendUrl}/api/v1/blog`, {
            title: title,
            content: content,
            published: "true"
        },{
            headers:{
                Authorization: localStorage.getItem("authorization")
            }
        })
        .then(response => {
            console.log(response.data);
            setTitle("");
            setContent("");
            alert("Post Published")
        })
        .catch(error => {
            // Handle error
            console.error("Error publishing:", error);
        });
    }
    return(
        <div>
            <PostBar title={title} content={content} setContent={setContent} setTitle={setTitle} />
            <div className="flex justify-center">
                <div className="flex flex-col justify-center w-[80%] h-screen">
                    {/* text editer logic */}
                    <textarea value={title} onChange={(e)=>{setTitle(e.target.value)}}  placeholder="Title" className="border-l m-4 text-6xl focus:outline-none"></textarea>
                    <textarea value={content} onChange={(e)=>{setContent(e.target.value)}} placeholder="Tell your story" className="border-l border-r border-b m-4 text-2xl h-[80%] focus:outline-none"></textarea>
                    <div>
                        <button onClick={Published} className="hover:bg-green-800 active:text-slate-500 border rounded-2xl p-6 flex flex-col justify-center bg-green-600 h-8 text-white w-28 mt-4 mb-8 ml-4">Publish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}



