import React, { useState } from "react";
import axios from "axios";
export default function TaskList({ taskList, setAddTask, setTaskList }) {

    const [editedStatus, setEditedStatus] = useState('');
    const [editTaskId, setEditTaskId] = useState(null)
    const [editedDescription,setEditedDescription] = useState("")
    const [editedTitle,setEditedTitle] = useState("")


  const handleAddTaskClick = () => {
    setAddTask(false);
  };
  const handleEditClick = (taskId, currentStatus) => {
    setEditTaskId(taskId);
    setEditedStatus(currentStatus);
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setEditedStatus('');
    setEditedDescription('');
    setEditedTitle('');
  };
  const handleDeleteTask = (taskId) => {
    axios
      .delete(`https://task-tracker-xi-mocha.vercel.app/task/${taskId}`)
      .then((response) => {
        console.log("Response:", response.data);
        setTaskList(prevTaskList => taskList.filter(task => task._id !== taskId));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const handleSaveEdit = (taskId, editedTask) => {
    console.log(editedTask);
    const { title, desc, status } = editedTask;
    axios.put(`https://task-tracker-xi-mocha.vercel.app/task/${taskId}`, { title, desc, status })
      .then((response) => {
        console.log('Task updated successfully:', response.data);
        const token = sessionStorage.getItem('usersession');
        axios.get('https://task-tracker-xi-mocha.vercel.app/task', { headers: { Authorization: token } })
          .then((response) => {
            console.log('Updated task list:', response.data);
            setTaskList(response.data);
            setEditTaskId(null);
            setEditedTitle('');
            setEditedDescription('');
            setEditedStatus('');
          })
          .catch((error) => {
            console.error('Error refreshing task list:', error);
          });
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };



  return (
    <div class="shadow-lg rounded-lg overflow-hidden my-20 mx-28 md:mx-10">
      <h1 className="bg-gray-100 border grid justify-items-end text-gray-600 p-3">
        <button onClick={handleAddTaskClick}> + Add tasks</button>
      </h1>
      <table class="w-full table-fixed">
        <thead>
          <tr class="bg-gray-100">
            <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Title
            </th>
            <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Description
            </th>
            <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Status
            </th>
            <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          {taskList.map((item) => (
            <tr>
              <td class="py-4 px-6 border-b border-gray-200">{item.title}</td>
              <td class="py-4 px-6 border-b border-gray-200 truncate">{item.desc}</td>
              <td>
          {editTaskId === item._id ? (
            <select value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}>
              <option value="Created">Created</option>
              <option value="OnWorking">On Working</option>
              <option value="Completed">Completed</option>
            </select>
          ) : (
            item.status
          )}
        </td>

        <td>
          {editTaskId === item._id ? (
            <>
              <button onClick={() => handleSaveEdit(item._id, { title: editedTitle, description: editedDescription, status: editedStatus })}>Save</button>

              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <span className=" py-1 px-2 rounded-full text-xs" onMouseEnter={() => handleEditClick(item._id, item.status)}>Edit</span>
              <span className=" py-1 px-2 rounded-full text-xs cursor-pointer" onClick={() => handleDeleteTask(item._id)}>Delete</span>
            </>
          )}
        </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
