import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import useTodoStore from '../app/todos/todoSlice'; // Zustanddan ma'lumotlarni olish
import { useNavigate } from 'react-router-dom';

const AddTodos = () => {
  const navigate = useNavigate();
  const { addTodo } = useTodoStore(); // Zustanddan addTodo ni olish
  const [formData, setFormData] = useState({
    title: '',
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTodo(formData); // Zustanddagi addTodo ni chaqirish
      setFormData({ title: '', completed: false }); // Formani tozalash
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
    navigate('/');
  };

  return (
    <div className='container p-5'>
      <form className='d-flex justify-content-center' onSubmit={handleSubmit}>
        <div className='w-50'>
          <h1 className='mb-4 text-center'>Add Todos</h1>

          <div className='mb-3'>
            <label htmlFor="title" className='form-label'>Title</label>
            <input
              type="text"
              required
              className='form-control'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className='mb-3 form-check'>
            <input
              type="checkbox"
              className='form-check-input'
              id='completed'
              name='completed'
              checked={formData.completed}
              onChange={handleChange}
            />
            <label htmlFor="completed" className='form-check-label'>Completed</label>
          </div>

          <div className='d-grid gap-2'>
            <Button type="submit" variant="primary">Add</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTodos;
