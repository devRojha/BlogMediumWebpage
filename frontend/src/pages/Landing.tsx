
import { useBlogs } from "../hooks"
import { BlogsSkaleton } from "../components/Skeleton"
import { LandingBar } from "../components/LandingBAr"
import { LandingBlogCard } from "../components/LandingBlogCard"



export const Landing= ()=>{
    const {loading , blogs}  = useBlogs()
    if(loading){
        return(
            <div className="flex justify-center w-full">
                <div className="flex flex-col w-full">
                    <LandingBar />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                    <BlogsSkaleton />
                </div>
            </div>
        )
    }
    return(
        <div className="flex justify-center w-full">
            <div className="flex flex-col w-full">
                <LandingBar />
                {blogs.map(blog=> { 
                    return(<LandingBlogCard 
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "Anonyous"}
                            title = {blog.title}
                            content={blog.content}
                            publishedDate={(blog.publishedDate == "false")?"04/10/2003" : blog.publishedDate}
                        />
                    )
                })}
            </div>
        </div>
    )
}



