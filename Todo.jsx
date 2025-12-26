import axios from "axios";
import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTodo = async () => {
    let res = await axios.get('http://localhost:3333/todo');
    setTodo(res.data)
  }

  useEffect(() => {
    fetchTodo();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description };
    await axios.post("http://localhost:3333/todo", data);
    fetchTodo();
    setTitle('');
    setDescription('');
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3333/todo/${id}`);
    fetchTodo();
  }

  const handleUpdate = async (t) => {
    const data = { completed: !t.completed }
    await axios.put(`http://localhost:3333/todo/${t._id}`, data);
    fetchTodo();
  }

  return (
    <>
      <div className="todo">
        <div className="part1">
          <form onSubmit={handleSubmit}>
            <h1>CREATE TODO</h1>
            <input
              type="text"
              placeholder="Enter the title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <textarea
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
            <button><i className="fa-solid fa-file"> ADD</i></button>
          </form>
        </div>

        <div className="part2">
          <div className="todo-container">
            {todo.map((t, i) => (
              <div className={`item ${t.completed ? "finished" : ""}`} key={i}>
                {t.completed ? (
                  <>
                    <h2>{t.title}</h2>
                    <p><strike>{t.description}</strike></p>
                  </>
                ) : (
                  <>
                    <h2>{t.title}</h2>
                    <p>{t.description}</p>
                  </>
                )}

                <div className="action">
                  <button className="Complete" onClick={() => handleUpdate(t)}>
                    {t.completed
                      ? <i className="fa-solid fa-xmark"></i>
                      : <i className="fa-solid fa-check"></i>
                    }
                  </button>

                  <button className="Delete" onClick={() => handleDelete(t._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;






