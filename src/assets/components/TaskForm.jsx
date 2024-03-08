

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('usersession');
      const response = await axios.post(
        'https://task-tracker-xi-mocha.vercel.app/task',
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log('Task added successfully:', response.data);

      setFormData({
        title: '',
        desc: ''
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="desc"
          name="desc"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
