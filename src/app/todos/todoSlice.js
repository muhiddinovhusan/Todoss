import { create } from 'zustand'; // create funktsiyasini chaqirish
import axios from 'axios';

const useTodoStore = create((set) => ({
  loading: false,
  todos: [],
  error: '',
  addTodo: async (newTodo) => {
    try {
      set({ loading: true });
      const response = await axios.post('http://localhost:3000/todos', newTodo);
      set((state) => ({
        todos: [...state.todos, response.data],
        loading: false,
        error: '',
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  },
  fetchTodos: async () => {
    try {
      set({ loading: true });
      const response = await axios.get('http://localhost:3000/todos');
      set({ todos: response.data, loading: false, error: '' });
    } catch (error) {
      set({ loading: false, todos: [], error: error.message });
    }
  },
  deleteTodo: async (todoId) => {
    try {
      set({ loading: true });
      await axios.delete(`http://localhost:3000/todos/${todoId}`);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== todoId),
        loading: false,
        error: '',
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  },
  toggleTodo: async ({ id, completed }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`http://localhost:3000/todos/${id}`, { completed: !completed });
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === response.data.id ? { ...todo, completed: response.data.completed } : todo
        ),
        loading: false,
        error: '',
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  },
}));

export default useTodoStore;
