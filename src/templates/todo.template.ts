export const todoTemplate = [
  {
    name: "App.tsx",
    path: "/src/App.tsx",
    content: `
        import {useState} from "react";

        export default function App(){
        const [todos, setTodos] = useState<string[]>([]);
        const [input, setInput] = useState("");
        
        const addTodo = () => {
        setTodos([...todos, input]);
        setInput("");
        };

        return(
        <div style={{padding:20}}>
         <h1>Todo App</h1>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>

        </div>
        )
    }
        
        
        `,
  },
  {
    name: "main.tsx",
    path: "/src/main.tsx",
    content: `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
  },
];
