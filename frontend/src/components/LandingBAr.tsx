import { useNavigate } from "react-router-dom"

export const LandingBar = ()=>{ 
    const navigate = useNavigate();

    return(
        <div className="flex justify-center w-full mt-8 mb-8">
            <div className="flex justify-between w-[60%] shadow-lg rounded-md h-10 space-x-4 pl-4 pt-2">
                <div className="space-x-4 pl-4">
                    <div className="h-full  border-slate-500 active:border-blue-600 active:border-b hover:border-b active:text-blue-600">All</div>
                </div>
                <div className="flex justify-center space-x-3 pr-6">
                    <button onClick={()=> navigate("/signup")} className="h-full  border-slate-500 active:border-blue-600 active:border-b hover:border-b active:text-blue-600">Register</button>
                    <button onClick={()=> navigate("/signin")} className="h-full  border-slate-500 active:border-blue-600 active:border-b hover:border-b active:text-blue-600">Log in</button>
                </div>
            </div>
        </div>
    )
}