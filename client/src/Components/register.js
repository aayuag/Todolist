import React, { useState } from 'react'



const Register = () => {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [confirmpass,setConfirmpass]=useState("")
  const [error,setError]=useState("")
  
  const handleusername=(e)=>{
    setUsername(e.target.value)
  }

  const handlepassword=(e)=>{
    setPassword(e.target.value)
  }

  const handleconfirmpass=(e)=>{
    setConfirmpass(e.target.value)
  }

  

  const handleregistersubmit=()=>{
     if(password!==confirmpass){
      setError("Passwords dont match")
     }else{
      fetch("http://localhost:3001/user/register", {
            method: "post",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res)
            
        }).catch((err) => {
            console.log(err)
        })
     }
  }

  return (
    <>
  <input type="text" onChange={(e)=>{handleusername(e)}} placeholder="Username"></input>
  <br></br>
  <input type="text" onChange={(e)=>{handlepassword(e)}} placeholder="Password"></input>
  <br></br>
  <input type="text" onChange={(e)=>{handleconfirmpass(e)}} placeholder="Confirm Password"></input>
  <p>{error}</p>
  <button onClick={()=>handleregistersubmit()}>Submit</button>
    </>
  )
}

export default Register