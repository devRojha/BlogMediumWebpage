import { Avataar } from "./Avataar"
import { BlogBar } from "./BlogBar"


export const BlogSkaleton = ()=>{
    return(
        <div >
            <BlogBar />
            <div role="status" className="grid grid-cols-4 min-h-screen">
                <div className="col-span-3">
                    <div className="flex flex-col p-4">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                </div>
                <div className="col-span-1 p-4 border-l flex flex-col justify-center h-[90%]">
                    <div className="h-2 bg-gray-200 rounded-full max-w-[60px] mb-2.5"></div>
                    <div className="flex items-center mt-4">
                        <svg className="w-10 h-10 me-3 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        <div>
                            <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
                            <div className="w-48 h-2 bg-gray-200 rounded-full "></div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}




<div className="flex items-center mt-4">
<svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
     <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
 </svg>
 <div>
     <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
     <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
 </div>
</div> 
