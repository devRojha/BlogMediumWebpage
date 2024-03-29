import { Link } from "react-router-dom"
import { Avataar } from "./Avataar"
import axios from "axios";
import { BackendUrl } from "../config";

 
interface BlogCardProps {
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    forYou: boolean
}

 export const BlogCard = ({authorName, title, content, publishedDate , id, forYou}: BlogCardProps)=>{
    const DeleteData = ()=>{
        axios.delete(`${BackendUrl}/api/v1/blog/${id}`,{
            headers:{
                Authorization: localStorage.getItem("authorization") 
            }
        })
        .then(res => {
            console.log(res.data)
            alert("Post Deleted")
        });
    }
    return(
        <div className="flex justify-center w-full">
            <div className="flex flex-col pt-2 pb-2 w-[60%] cursor-pointer">
                <Link  to={`/blog/${id}`}>
                    <div className="">
                        <Avataar authorName={authorName}/>
                        {authorName+" | "} <span className="text-slate-500 ">{publishedDate}</span>
                    </div>
                    <div className="font-bold text-2xl text-black">
                        {title}
                    </div>
                    <div className="text-slate-700">
                        {content.substring(0 , 100)+"..."}
                    </div>
                    <div className="mb-2 text-slate-400 font-semibold text-sm">
                        {`${Math.ceil(content.length / 100)} minutes `}
                    </div>
                </Link>
                <div className={`${(forYou)? "flex": "hidden"}`}>
                    <button onClick={DeleteData} className={`border p-2 m-2 ml-0 rounded-lg bg-red-500 text-white hover:bg-red-800 active:text-black`}>Delete</button>
                </div>
                <div className="flex justify-center border border-slate-200"></div>
            </div>
        </div>
    )
 }
