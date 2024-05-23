import { useState } from "react";

function Form(props) {
    const [task, setTask] = useState({ name: '', priority: 0 });

    function handleNameChange(event) {
        setTask({ ...task, name: event.target.value });
    }

    function handlePriorityChange(event) {
        setTask({ ...task, priority: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.addTask(task);
        setTask({ name: '', priority: 0 });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What tasks do you want to do?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input-name"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={task.name}
                onChange={handleNameChange}
                placeholder="Task Name"
            />
            <input
                type="number"
                id="new-todo-input-priority"
                className="input input__lg"
                name="number"
                autoComplete="off"
                value={task.priority}
                onChange={handlePriorityChange}
                placeholder="Priority Value (lower is higher priority)"
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}

export default Form;
