import { SigninInput } from "@devraj04/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { BackendUrl } from "../config";


export const AuthSignin = ()=>{
    const navigate = useNavigate();
    const [signinInputs , setsigninInputs] = useState<SigninInput>({
        email:"",
        password:""
    });
    async function sendRequest(){
        try{
            const response = await  axios.post(`${BackendUrl}/api/v1/user/signin`,{
                email: signinInputs.email,
                password: signinInputs.password
            }) 
            const token = response.data.token;
            localStorage.setItem("authorization",token);
            navigate("/blogs/")  //go to blog
        }
        catch(e){
            // alert user that request failed
            alert("error while signin")

        }
    }
    return(
        <div className="h-screen bg-white flex flex-col justify-center">
            {/* {JSON.stringify(signinInputs)} */}
            <div className="flex justify-center">
                <div>
                    <div className="text-3xl font-extrabold mb-2 text-center">Sign in</div>
                    <div className="text-slate-400  text-center mb-8">
                        Don't have an account ? 
                        <Link className="text-blue-500 underline hover:text-blue-700 cursor-pointer ml-2" to={'/signup'}>Register</Link>
                    </div>

                    <LableInput onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                        setsigninInputs({
                            ...signinInputs,
                            email: e.target.value
                        })
                    }} label={"email"} type={"text"} placeholder={"abc@gmail.com"}/>

                    <LableInput onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                        setsigninInputs({
                            ...signinInputs,
                            password: e.target.value
                        })
                    }} label={"Password"} type={"password"} placeholder={"********"}/>
                    
                    <button onClick={sendRequest} className="border w-full border-black rounded-md p-1 bg-slate-600 hover:bg-slate-800 active:bg-black text-white mt-4">Signin</button>
                </div>
            </div>
        </div>
    )
}

interface LableInputType {
    label:string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>)=> void,
    type? : string

}

function LableInput({label, type , placeholder , onChange}: LableInputType){
    return(
        <div className="flex flex-col mb-4">
            <label className="text-1xl text-black font-semibold">{label}</label>
            <input className="border border-black rounded-md bg-slate-100 p-1" type={type} onChange={onChange} placeholder={placeholder} />
        </div>
    )
}