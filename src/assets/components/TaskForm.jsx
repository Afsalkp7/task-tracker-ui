import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ setAddTask,setReload,reload }) => {

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("usersession");
      const response = await axios.post(
        "https://task-tracker-xi-mocha.vercel.app/task",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Task added successfully:", response.data);

      setFormData({
        title: "",
        desc: "",
      });

      setReload(!reload)
      

    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add tasks
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Text title of task"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    for="desc"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="desc"
                    id="desc"
                    placeholder="Text description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.desc}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Add to task
                </button>
                <a
                    onClick={()=>setAddTask(true)}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Show tasks
                  </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TaskForm;
