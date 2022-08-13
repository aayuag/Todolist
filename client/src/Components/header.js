import React, { useEffect, useState } from 'react'

const Header = () => {
const [maindata,setMainData]=useState([])

  let token =localStorage.getItem("authorization")


if(token === null) {
  localStorage.setItem("authorization", "")
}


useEffect(() => {
  fetch("http://localhost:3001/user/details", {
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setMainData(data);
    });
    // window.location.reload(false); 
}, [token]);
  return (
    <>
  <div>{maindata.username}</div>
    </>
  )
}

export default Header