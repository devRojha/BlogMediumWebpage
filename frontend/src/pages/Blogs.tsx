
import { BlogsBar } from "../components/BlogsBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { BlogsSkaleton} from "../components/BlogsSkeleton"


export const Blogs= ()=>{
    const {loading , blogs}  = useBlogs()
    if(loading){
        return(
            <div className="flex justify-center w-full">
                <div className="flex flex-col w-full">
                    <BlogsBar />
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
                <BlogsBar />
                {blogs.map(blog=> { 
                    return(<BlogCard 
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "Anonyous"}
                            title = {blog.title}
                            content={blog.content}
                            publishedDate={(blog.published == "false")?"04/10/2003" : blog.published}
                        />
                    )
                })}
            </div>
        </div>
    )
}



