import React from 'react'

const Sidebar = () => {

  const handlelogout=()=>{
    localStorage.setItem("authorization", "");
  }
  return (
    <>
      <h5>To-do-List</h5>
      <h6>History</h6>
      <button onClick={handlelogout}>Log Out</button>
    </>
  )
}

export default Sidebar