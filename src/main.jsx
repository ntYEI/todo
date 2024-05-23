import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


const DATA = [
  { id: "todo-0", name: "Buying food", completed: true, priority: 0 },
  { id: "todo-1", name: "Doing assignmnet", completed: false, priority: 0 },
  // { id: "todo-2", name: "something else", completed: false, priority: 0 },
];


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App tasks={DATA} />

  </React.StrictMode>,
)
