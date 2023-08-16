"use client"
import Link from "next/link";
import React, { useState ,useEffect} from 'react'
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
export default function SignUp(){
 const[email,setEmail]=useState("")
 const [password,setPassword]=useState("");
    const router=useRouter();
    const [user,setuser]=useState({
        email:"",
        password:"",
        username:""

    })
    const [buttonDisabled,setButtonDisabled]=useState(false)
    const [loading,setLoading]=useState(false)
    const onSignup=async()=>{
        try {
            setLoading(true)
            const response=await axios.post('/api/users/signup',user)
            console.log('Signup sucess',response.data);
            router.push('/login')
            //for the sake of example ,showing a success alert
            Swal.fire({
                title: 'Signup sucessfully',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
            //clear input fields
            setEmail("");
            setPassword("");
       

            
        } 
        catch (error:any) {
            console.log('Signup failed',error.mesaage);
            
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h2>{loading?"Processing":"Signup"}</h2>
            <hr />
            <label htmlFor="username">username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" id="username" value={user.username} onChange={(e)=>setuser({...user,username:e.target.value})}placeholder="username"/>
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" id="email" value={user.email} onChange={(e)=>setuser({...user,email:e.target.value})}placeholder="email"/>
            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="password" id="password" value={user.password} onChange={(e)=>setuser({...user,password:e.target.value})}placeholder="password"/>
<button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled?"No signup":"Signup"}</button>

        <Link href={'/login'} >Visit login page </Link>
        </div>
    )
}