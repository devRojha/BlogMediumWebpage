import { AuthSignup } from "../components/AuthSignup"
import { Quote } from "../components/Quote"


export const Signup = ()=>{
    return(
        <div className="h-full grid grid-cols-1 md:grid-cols-2">
            <div>
                <AuthSignup />
            </div>
            <div className="invisible md:visible">
                <Quote />
            </div>
        </div>
    )
}