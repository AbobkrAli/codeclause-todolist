import React, { useState } from 'react';
import './Container.css';

function Container() {
  const [todos, setTodos] = useState([]);

  const [todoHeader, setTodoHeader] = useState('');
  const [todoContent, setTodoContent] = useState('');
  const [headerWarning, setHeaderWarning] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null); // To track which todo is being edited

  const handleTodoCreate = () => {
    if (todoHeader) {
      const newTodo = {
        id: todos.length + 1,
        header: todoHeader,
        content: todoContent,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTodoHeader('');
      setTodoContent('');
      setHeaderWarning(false);
    } else {
      setHeaderWarning(true);
    }
  };

  const handleTodoComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleTodoRemove = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (id) => {
    setEditTodoId(id);
    // Pre-fill the input fields with the current values
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTodoHeader(todoToEdit.header);
    setTodoContent(todoToEdit.content);
  };

  const handleSaveEdit = () => {
    if (todoHeader) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, header: todoHeader, content: todoContent };
        }
        return todo;
      });

      setTodos(updatedTodos);
      setEditTodoId(null);
      setTodoHeader('');
      setTodoContent('');
    } else {
      setHeaderWarning(true);
    }
  };

  const cancelEdit = () => {
    setEditTodoId(null);
    setTodoHeader('');
    setTodoContent('');
    setHeaderWarning(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className="todo-form-container">
        <h1>Make a Todo</h1>
        <input
          type="text"
          placeholder="Todo Header"
          value={todoHeader}
          onChange={(e) => setTodoHeader(e.target.value)}
        />
        <textarea
          placeholder="Todo Content"
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
        />
        {headerWarning && (
          <p className="header-warning">Please enter a header for the todo.</p>
        )}
        {editTodoId === null ? (
          <button onClick={handleTodoCreate}>Create Todo</button>
        ) : (
          <>
            <button onClick={handleSaveEdit}>Save Edit</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        )}
      </div>
      <div className="todos-container">
        <h1> {todos.length > 0 ? null : 'no todos'} </h1>
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className={`todo-card ${todo.completed ? 'completed' : ''}`}>
              {editTodoId !== todo.id ? (
                <>
                  <h3 style={{textDecoration: todo.completed ? 'line-through' : 'none'}} >{todo.header}</h3>
                  <p style={{textDecoration: todo.completed ? 'line-through' : 'none'}} > {todo.content}</p>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={todoHeader}
                    onChange={(e) => setTodoHeader(e.target.value)}
                  />
                  <textarea
                    value={todoContent}
                    onChange={(e) => setTodoContent(e.target.value)}
                  />
                </>
              )}
              <div className="todo-actions">
                {editTodoId !== todo.id ? (
                  <span onClick={() => handleEdit(todo.id)}>Edit</span>
                ) : null}
                <span onClick={() => handleTodoComplete(todo.id)}>
                  {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </span>
                <span onClick={() => handleTodoRemove(todo.id)}>Remove</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Container;
