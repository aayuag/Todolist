import React, { useEffect, useState } from 'react'

const List = (props) => {
    // console.log(props.task)
    const [noaction,setNoaction]=useState(true)

    const [button,setbutton]=useState(false)
    const [timetaken,Settimetaken]=useState(0)

        useEffect(()=>{
            if(props.task.Status=="Completed"){
                setNoaction(false)
            }
        },[])
        
    
        const handleaction=()=>{
            if(props.started===true){
                alert("Already task is running")
            }else{
                props.handlestarted()
                setbutton(true)
            }
        }

        
          
        const handlepause=()=>{
            props.handlestarted()
        }

        const handleEnd=()=>{
            props.handlestarted()
            setbutton(false)
            // handletask()
        }
        
        const handletask=()=>{
            fetch("http://localhost:3001/list/updatetask", {
            method: "post",
            body: JSON.stringify({
                _id:props.task._id,
                timetaken
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res)=>{
            alert("updatedsuccessfully")
        })
        }
        
  return (
    <>
        <tr>
            <td>{props.task.Activity}</td>
            <td>{props.task.Status}</td>
            <td>{props.task.timetaken}</td>
            
            <td>{button ? <><button onClick={handlepause}>Pause</button> <button onClick={handleEnd}>End</button></> : <>{noaction ? <button onClick={handleaction}>Start</button> : ""}</>}</td>
          </tr>
    </>
  )
}

export default List