import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const Token = localStorage.getItem('token')
  

  useEffect(() => {
    // Fetch all todos from the API when the component mounts
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      console.log(Token)
      const response = await axios.get('http://127.0.0.1:8000/todo/',{headers: {Authorization: 'token ' + Token}});
      console.log(response.data.data)
      setTodos(response.data.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      console.log(Token)
      const response = await axios.post('http://127.0.0.1:8000/todo/', { data: newTodo },{headers: {Authorization: 'token ' + Token}});
      setTodos([...todos, response.data.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, newText) => {
    try {
      console.log(id,newText)
      await axios.put(`http://127.0.0.1:8000/todo/${id}/`, { data: newText },{headers: {Authorization: 'token ' + Token}});
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, title: newText } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      console.log(id)
      await axios.delete(`http://127.0.0.1:8000/todo/${id}/`,{headers: {Authorization: 'token ' + Token}});
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.title}
              onChange={e => updateTodo(todo.id, e.target.value)}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
