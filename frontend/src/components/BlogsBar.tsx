import { useNavigate } from "react-router-dom"
import { Avataar } from "./Avataar"

export const BlogsBar = ()=>{ 
    const navigate = useNavigate();

    return(
        <div className="flex justify-center w-full mt-8 mb-8">
            <div className="flex justify-between w-[60%] shadow-lg rounded-md h-10 space-x-4 pl-4">
                <div className="space-x-4 pl-4">
                    <button onClick={()=>{navigate("/blog/post")}}  className="h-full  border-slate-500 active:border-blue-600 active:border-b hover:border-b active:text-blue-600">+</button>
                    <button className="h-full  border-slate-500 active:border-blue-600 active:border-b hover:border-b active:text-blue-600">For You</button>
                    <button className="h-full  border-slate-500 active:border-blue-600 active:border-b hover:border-b active:text-blue-600">Following</button>
                </div>
                <div className="flex justify-center space-x-3">
                    <button className="hover:text-blue-600">Log Out</button>
                    <div className="flex flex-col justify-center">
                        <Avataar 
                            authorName={"Devraj"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}