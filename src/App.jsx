import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  function addTask(task) {
    const [name, priority] = [task.name, task.priority];
    const newTask = { id: `todo-${nanoid()}`, name, priority, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName, newPriority) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName, priority: newPriority };
      }
      return task;
    });
    setTasks(editedTaskList);
  }


  const [filter, setFilter] = useState("All");
  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));



  const [sortOrder, setSortOrder] = useState('asc');
  const PRIORITY_MAP = {
    asc: () => true ? false : true,
    desc: () => false ? true : false,
  };
  const PRIORITY_NAMES = Object.keys(PRIORITY_MAP);
  const PriorityList = PRIORITY_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === sortOrder}
      setFilter={setSortOrder}
    />
  ));



  const [tasks, setTasks] = useState(props.tasks);
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .sort((a, b) => (sortOrder === 'asc' ? a.priority - b.priority : b.priority - a.priority))
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        priority={task.priority}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  return (
    <div className="todoapp stack-large">
      <h1>Todoooooo</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>

      {/* <div className="filters btn-group stack-exception">
        <button
          type="button"
          className="btn"
          onClick={() => setSortOrder('asc')}
        >
          Ascending
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => setSortOrder('des')}
        >
          Descending
        </button>
      </div> */}

      <div className="filters btn-group stack-exception">
        {PriorityList}
      </div>

      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
