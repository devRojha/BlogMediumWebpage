import { Avataar } from "./Avataar"
import { HiOutlineBell } from "react-icons/hi";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
export const PostBar = ()=>{
    const navigate = useNavigate();

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
                        <div className="">Draft in Dev</div>
                    </div>
                    <button className="h-full  border-slate-500 active:border-blue-600 active:border-b hover:border-b active:text-blue-600 text-slate-400 font-semibold">Saved</button>
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
                    <button className="active:text-blue-600 border-slate-500 active:border-blue-600 active:border-b hover:border-b">Log Out</button>
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