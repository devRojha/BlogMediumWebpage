import { AuthSignin } from "../components/AuthSignin"
import { Quote } from "../components/Quote"


export const Signin = ()=>{
    return(
        <div className="h-full grid grid-cols-1 md:grid-cols-2">
            <div>
                <AuthSignin />
            </div>
            <div className="invisible md:visible">
                <Quote />
            </div>
        </div>
    )
} 