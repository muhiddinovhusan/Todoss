import { useEffect } from 'react';
import useTodoStore from '../app/todos/todoSlice'; 
import { Link } from 'react-router-dom';
import './Todos.css'
const Todos = () => {
  const { loading, todos, error, fetchTodos, deleteTodo, toggleTodo } = useTodoStore(); // Zustanddan ma'lumotlarni olish

  useEffect(() => {
    fetchTodos(); 
  }, []); 

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
    if (isConfirmed) {
      deleteTodo(id); 
    }
  };

  const handleToggle = (id, completed) => {
    toggleTodo({ id, completed }); // Todo holatini o'zgartirish
  };

  return (
    <div>
      {loading && <h1>Loading ...</h1>}
      {error && <h1>{error}</h1>}

      {todos.length > 0 && (
        <div className='todo'>
          <Link className='btn btn-dark w-50 mb-2 py-2 mt-4' to="/add">Add</Link>
          {todos.map((todo, index) => (
            <div key={todo.id} className="card">
              <div className="card-content">
              <h3>  {index+1}</h3>
                <h3>{todo.title}</h3>
                <h2 style={{ cursor: "pointer" }} onClick={() => handleToggle(todo.id, todo.completed)}>
                  {todo.completed ? '✅' : '❌'}
                </h2>
                <button className='btn btn-danger' onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Todos;
