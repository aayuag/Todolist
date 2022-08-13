import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  
  const [error,setError]=useState("")
  const [login, setLogin] = useState({username: "", password: ""})


  
const handleloginsubmit=(e)=>{
    e.preventDefault();
        axios({
            url: "http://localhost:3001/user/login",
            method: "POST",
            headers: {
            },
            data: login
        }).then((loginData)=> {
           localStorage.setItem("authorization", loginData.data.authToken);
          
        }).catch((err)=> {
            console.log(err.response.data)
            setError(err.response.data)
        })
    }
 



  return (
    <>
      <input type="text" placeholder='Username' onChange={(e)=>{setLogin({...login, username: e.target.value})}}/>
      <br></br>
      <input type="password" placeholder='Password' onChange={(e)=>{setLogin({...login, password: e.target.value})}}/>
      <p>{error}</p>
      <button onClick={(e)=>handleloginsubmit(e)}>Submit</button>

    </>
  )
}

export default Login