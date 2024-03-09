import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export default function Home() {

    const [taskList,setTaskList] = useState([])
    const [addTask,setAddTask] =useState(false)
    const [reload,setReload] = useState(false)
    
    useEffect(()=>{
        const token = sessionStorage.getItem('usersession');
        console.log(token);
        axios.get('https://task-tracker-xi-mocha.vercel.app/task', { headers: { Authorization: token } })
      .then(response => {
        console.log('Response:', response.data);
        setTaskList(response.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },[reload])
    
    if (addTask) {
        return ( 
            <>
                 <TaskList taskList={taskList}  setTaskList={setTaskList} setAddTask={setAddTask}/>
            </>
        )
    }
   
  return (
    <>
        <TaskForm setReload={setReload} reload={reload} setAddTask={setAddTask}/>
    </>
  )
}
