import { useState } from "react";


function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");

    const [newPriority, setNewPriority] = useState(0);


    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName, newPriority);
        setNewName("");
        setNewPriority("");
        setEditing(false);
    }


    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label className="todo-label" htmlFor={`${props.id}-priority`}>
                    Priority (Original): {props.priority}
                </label>
                <input
                    id={`${props.id}-priority`}
                    className="todo-text"
                    type="number"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                />
            </div>



            <div className="btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}>
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}

                </label>
                <span className="todo-priority" htmlFor={props.id}>
                    Priority: {props.priority}
                </span>

            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => {
                        setEditing(true);
                    }}>
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}>
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
