import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/Signup';
import TodoList from './components/TodoList';
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/home" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
