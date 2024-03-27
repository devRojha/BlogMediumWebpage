

export const Avataar = ({authorName}:{authorName: string})=>{
    return(
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600 mr-2">
                <span className="font-medium text-gray-600 dark:text-gray-300 ">{authorName[0]}</span>
        </div>
    )
 }