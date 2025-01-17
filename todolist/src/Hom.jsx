import React, {useEffect, useState} from 'react'
import Cre from './Cre'
import axios from 'axios'
import { BsFillCheckCircleFill, BsCircleFill,BsFillTrashFill } from "react-icons/bs";

function Hom() {
    const [todos,setTodos]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/get')
        .then(result=>setTodos(result.data))
        .catch(err=>console.log(err))
    }, [])

    const handleEdit = (id) =>{
        axios.put('http://localhost:3001/update/'+id)
        .then(result=>{
            location.reload()
        })
        .catch(err=>console.log(err))
    }

    const handleDelete = (id) =>{
        axios.get('http://localhost:3001/delete/'+id)
        .then(result=>{
            location.reload()
        })
        .catch(err=>console.log(err))
    }

  return (
    <div>
        <h2>TODO LIST</h2>
        <Cre />
        {
            todos.length==0
            ?
            <div><h2>No Record</h2></div>
            :
            todos.map(todo => (
                <div className='task'>
                     <div className='chechbox' onClick={()=>handleEdit(todo._id)}>
                        {todo.done ?
                        <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                        :
                        <BsCircleFill className='icon'/>
                        }
                        <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                     </div>
                     <div>
                        <span><BsFillTrashFill className='icon' onClick={()=> handleDelete(todo._id)}/></span>
                     </div>
                </div>     
            ))
        }
    </div>
  )
}

export default Hom