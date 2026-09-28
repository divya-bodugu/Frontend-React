import { useState } from "react";
import "./TaskEstimator.css";

// ESTIMATION COMPONENT

function Estimation() {
  const roles = [
    {
      id: "frontend",
      name: "Frontend Developer",
      rate: 1200
    },
    {
      id: "backend",
      name: "Backend Developer",
      rate: 1400
    },
    {
      id: "fullstack",
      name: "Full Stack Developer",
      rate: 1600
    },
    {
      id: "qa",
      name: "QA Tester",
      rate: 1000
    },
    {
      id: "analyst",
      name: "Business Analyst",
      rate: 1300
    },
    {
      id: "pm",
      name: "Project Manager",
      rate: 1800
    }
  ];

  const [page, setPage] = useState("home");
  const [tasks, setTasks] = useState([]);

  // Get role rate
  function getRoleRate(roleId) {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].id === roleId) {
        return roles[i].rate;
      }
    }
    return 0;
  }

  // Add task
  function handleAddTask() {
    const newTask = {
      id: Date.now(),
      name: "",
      roleId: "",
      hours: 0
    };
    setTasks([...tasks, newTask]);
    setPage("table");
  }

  // Delete task
  function handleDeleteTask(id) {
    const updatedTasks = tasks.filter(function (task) {
      return task.id !== id;
    });
    setTasks(updatedTasks);
  }

  // Change name
  function handleChangeName(id, newName) {
    const updatedTasks = tasks.map(function (task) {
      if (task.id === id) {
        return {
          ...task,
          name: newName
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Change role
  function handleChangeRole(id, newRole) {
    const updatedTasks = tasks.map(function (task) {
      if (task.id === id) {
        return {
          ...task,
          roleId: newRole
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Change hours
  function handleChangeHours(id, newHours) {
    const numberHours = Number(newHours);
    const updatedTasks = tasks.map(function (task) {
      if (task.id === id) {
        return {
          ...task,
          hours: numberHours
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Go back
  function handleGoToHome() {
    setPage("home");
  }

  // Calculate totals
  let totalTasks = tasks.length;
  let totalHours = 0;
  let totalCost = 0;
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    totalHours = totalHours + task.hours;
    const rate = getRoleRate(task.roleId);
    const cost = task.hours * rate;
    totalCost = totalCost + cost;
  }


  // HOME PAGE

  if (page === "home") {
    return (
      <div className="container">
        <h1 className="title left">
          Task Estimator
        </h1>

        <div className="card">
          <p className="description">
            create and manage project tasks with live role-based
            rates and working hours. add tasks, assign roles,
            enter estimated hours, and instantly see the total
            effort and project cost.
          </p>

          <button
            className="button"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>
    );
  }


  // TABLE PAGE

  return (
    <div className="container">
      <div className="top">
        <h1 className="title left">
          Task Estimator
        </h1>

        <div className="actions">
          <button
            className="button"
            onClick={handleAddTask}>
            Add Task
          </button>

          <button
            className="button secondary"
            onClick={handleGoToHome}>
            Back
          </button>
        </div>
      </div>


      {/* TABLE */}

      <div className="wrapper">
        <table className="table">
          <thead>
            <tr className="row">
              <th>Task Name</th>
              <th>Role</th>
              <th>Hours</th>
              <th>Cost</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map(function (task) {
              const rate = getRoleRate(task.roleId);
              const cost = task.hours * rate;
              return (
                <tr
                  key={task.id}
                  className="row"
                >

                  {/* TASK NAME */}
                  <td>
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter Task Name"
                      value={task.name}
                      onChange={function (event) {
                        handleChangeName(
                          task.id,
                          event.target.value
                        );
                      }}
                    />
                  </td>


                  {/* ROLE */}
                  <td>
                    <select
                      className="select"
                      value={task.roleId}
                      onChange={function (event) {
                        handleChangeRole(
                          task.id,
                          event.target.value
                        );
                      }}
                    >
                      <option value="">
                        select role
                      </option>

                      {roles.map(function (role) {
                        return (
                          <option
                            key={role.id}
                            value={role.id}
                          >
                            {role.name}
                          </option>
                        );
                      })}
                    </select>
                  </td>


                  {/* HOURS */}
                  <td>
                    <input
                      className="hours"
                      type="number"
                      min="0"
                      value={task.hours}
                      onChange={function (event) {
                        handleChangeHours(
                          task.id,
                          event.target.value
                        );
                      }}
                    />
                  </td>


                  {/* COST */}
                  <td className="cost">
                    {task.hours === 0
                      ? "—"
                      : "rs " + cost}
                  </td>


                  {/* DELETE */}
                  <td>
                    <button
                      className="delete"
                      onClick={function () {
                        handleDeleteTask(task.id);
                      }}
                    >
                      delete
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      {/* SUMMARY */}
      <div className="summary">
        <div className="stat">
          <p className="label">
            Total Tasks
          </p>
          <p className="value">
            {totalTasks}
          </p>
        </div>


        <div className="stat">
          <p className="label">
            Total Hours
          </p>
          <p className="value">
            {totalHours}
          </p>
        </div>


        <div className="stat">
          <p className="label">
            Total Cost
          </p>
          <p className="value">
            rs {totalCost}
          </p>
        </div>

      </div>
    </div>
  );
}

// APP COMPONENT
function App() {
  return (
    <div>
      <Estimation />
    </div>
  );

}

export default App;