import React from 'react'
import Todos from './components/Todos';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTodos from './components/AddTodos';

const App = () => {
  return (
    <BrowserRouter>
<Routes>

<Route path='/' element={ <Todos/>}/>
<Route path='/add' element={<AddTodos/>}/>
</Routes>
    </BrowserRouter>
  )
}

export default App