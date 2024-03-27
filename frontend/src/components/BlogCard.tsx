import { Link } from "react-router-dom"
import { Avataar } from "./Avataar"

 
interface BlogCardProps {
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,

}

 export const BlogCard = ({authorName, title, content, publishedDate , id}: BlogCardProps)=>{
    return(
        <Link to={`/blog/${id}`}>
            <div className="flex justify-center w-full cursor-pointer">
                <div className="flex flex-col pt-2 pb-2 w-[60%]">
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
                    <div className="flex justify-center border border-slate-200"></div>
                </div>
            </div>
        </Link>
    )
 }
