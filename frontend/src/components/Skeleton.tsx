

export const BlogsSkaleton = ()=>{
    return(
            <div role="status" className="flex justify-center w-full cursor-pointer">
                <div className="flex flex-col pt-2 pb-2 w-[60%]">
                    <div className="">
                        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                    </div>
                    <div className="font-bold text-2xl text-black">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className="text-slate-700">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className="mb-2 text-slate-400 font-semibold text-sm">
                    <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
                    </div>
                    <div className="flex justify-center border border-slate-200"></div>
                </div>
            </div>
    )
}