import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TaskForm from './TaskForm';

export default function Home() {

    const [taskList,setTaskList] = useState([])
    

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
    },[])
   

  return (

    <>
   
    <div className="container mx-auto bg-gray-50 min-h-screen p-8 antialiased">
    <div>
    {taskList.map((a)=>(
        <div key={a._id} className="bg-gray-100 mx-auto border-gray-500 border rounded-sm text-gray-700 mb-0.5 h-30">
            <div className="flex p-3 border-l-8 border-green-600">
            <div className="space-y-1 border-r-2 pr-3">
                {a.title}
            </div>
            <div className="flex-1">
               <div className="ml-3 space-y-1 border-r-2 pr-3">
                  <div className="text-base leading-6 font-normal">{a.desc}</div>
                  
               </div>
            </div>
            <div className="border-r-2 pr-3">
               <div >
                  <div className="ml-3 my-3 border-gray-200 border-2 bg-gray-300 p-1">
                     <button>Delete</button>
                  </div>
               </div>
            </div>
            <div>
               <div className="ml-3 my-5 bg-green-600 p-1 w-20">
                  <div className="uppercase text-xs leading-4 font-semibold text-center text-yellow-100">{a.status}</div>
               </div>
            </div>
            <div>
               <button className="text-gray-100 rounded-sm my-5 ml-2 focus:outline-none bg-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
               </button>
            </div>
         </div>
      </div>

    ))}
        

   </div>

  </div>  

  <TaskForm />
    </>
    
  )
}
