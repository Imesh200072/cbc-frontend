import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function login(){
        console.log(email,password)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
            email:email,
            password:password
        }).then(
            (response)=>{
                console.log(response.data)
                localStorage.setItem("token", response.data.token)

                //const token = localStorage.getItem("token")
                toast.success("Login successful")
                if(response.data.role == "admin"){

                    //window.location.href = "/admin"
                    navigate("/admin")

                }else if(response.data.role == "user"){
                    //window.location.href = "/"
                    navigate("/")
                }
            }
        ).catch(
            (error)=>{
                console.log(error)
                //alert("Login failed")
                toast.error("Login failed")
            }
        )
    }

    return(
        <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex justify-center items-center">
            <div className="w-[500px] h-[500px] backdrop-blur-xl shadow-2xl rounded-[30px] relative gap-[20px] text-white flex flex-col items-center justify-center">
                <h1 className="absolute top-[20px] text-3xl font-bold text-center my-5 text-yellow-400">Login</h1>
                <div className="w-[350px] flex flex-col">
                    <span className="text-lg">Email</span>
                    <input onChange={
                        (e)=>{
                            setEmail(e.target.value)
                        }
                    }className="w-[350px] h-[40px] border border-white rounded-xl" type="text"/>
                </div>
                <div className="w-[350px] flex flex-col">
                    <span className="text-lg">Password</span>
                    <input onChange={
                        (e)=>{
                            setPassword(e.target.value)
                            console.log("Password is changed")
                        }
                    }className="w-[350px] h-[40px] border border-white rounded-xl" type="password"/>
                </div>
                <button onClick={login} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300">
                    Login
                </button>
                <p>Don't have an account? <Link to="/register" className="text-blue-500">sign up</Link> from here</p>
            </div>
            
        </div>
    )
}