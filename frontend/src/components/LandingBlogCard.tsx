
import { Avataar } from "./Avataar"

 
interface BlogCardProps {
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,

}

 export const LandingBlogCard = ({authorName, title, content, publishedDate}: BlogCardProps)=>{
    return(
            <div className="flex justify-center w-full">
                <button onClick={()=> alert("Login  or Register first")} className="flex flex-col pt-2 pb-2 w-[60%] cursor-pointer">
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
                    <div className="w-full flex justify-center border border-slate-200"></div>
                </button>
            </div>
    )
 }
