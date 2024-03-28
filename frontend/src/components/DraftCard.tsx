import { Link, useNavigate } from "react-router-dom"
import { Avataar } from "./Avataar"
import axios from "axios"
import { BackendUrl } from "../config"

 
interface BlogCardProps {
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
}

 export const DraftCard = ({authorName, title, content, publishedDate , id}: BlogCardProps)=>{
    const navigate = useNavigate();
    const DeleteData = ()=>{
        axios.delete(`${BackendUrl}/api/v1/blog/${id}`,{
            headers:{
                Authorization: localStorage.getItem("authorization") 
            }
        })
        .then(res => {
            console.log(res.data)
            navigate("/draft")
        });
    }
    const Published = ()=>{
        axios.put(`${BackendUrl}/api/v1/blog`, {
            id: id,
            published: "true"
        },{
            headers:{
                Authorization: localStorage.getItem("authorization"),
            }
        })
        .then(response => {
            console.log(response.data);
            alert("Post Published")
        })
        .catch(error => {
            // Handle error
            console.error("Error publishing:", error);
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
                <div className="flex">
                    <button onClick={Published} className="border p-2 m-2 ml-0 rounded-lg bg-green-500 text-white hover:bg-green-800 active:text-black">Publish</button>
                    <button onClick={DeleteData} className="border p-2 m-2 rounded-lg bg-red-500 text-white hover:bg-red-800 active:text-black">Delete</button>
                </div>
                <div className="flex justify-center border border-slate-200"></div>
            </div>
        </div>
    )
 }
